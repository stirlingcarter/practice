import { MMKV } from "react-native-mmkv";
import { lessonRepository } from "../App";
import Constants from "../constant/Constants"
import Group from "../models/Group";
import Util from "../services/Util";
import Path from "../services/Path";

export default class GroupRepository {

    storage = null

    constructor() {
        this.storage = new MMKV({
            id: "Groups"
        })

        // this.storage.clearAll()



    }

    getAllGroupNames() {
        return this.storage.getAllKeys().filter(key => Path.currentDir(key));
    }

    getGroupByPath(groupPath) {
        try {
            let retrievedItem = this.storage.getString(groupPath)
            if (retrievedItem == undefined){
                alert("error: no group for " + groupPath)
                return null;
            }
            let group = Group.fromJSONStringified(retrievedItem)
            if (group == null){
                alert("error: no group for " + groupPath)
            }
            return group;
        } catch (error) {
            alert(error.message);
            return error.message
        }
        
    }
    
    getLessonNamesByGroupPath(path) {
        try {
            return this.getGroupByPath(path).getLessonNames()

        } catch (error){
            alert("error getting lessonnames: " + error.message)
        }
    }

    getGroupNamesByGroupPath(path) {
        let group = this.getGroupByPath(path)
        return group == null ? [] : group.getGroupNames()
    }

    delete(group) {
        try {
            this.storage.delete(group.getPath());
        } catch (error) {
            alert("error deleting group: " + error.message);
        }
        return null
    }

    deleteByPath(groupPath) {
        let group = this.getGroupByPath(groupPath)
        this.delete(group)
    }

    save(group) {
        try {
            this.storage.set(group.getPath(), JSON.stringify(group));
        } catch (error) {
            alert("error saving group: " + error.message)
        }
        return null
    }
}
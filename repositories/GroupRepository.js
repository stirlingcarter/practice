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
        this.storage.clearAll()

    }

    getAllGroupNames() {
        return this.storage.getAllKeys().filter(key => Path.currentDir(key));
    }

    getHeadGroup() {
        return this.getGroupByPath(Constants.HEAD_GROUP_PATH)
    }

    getGroupByPath(groupPath) {
        try {
            let retrievedItem = this.storage.getString(groupPath)
            if (retrievedItem == undefined){
                return null;
            }
            let group = Group.fromJSONStringified(retrievedItem)
            return group;
        } catch (error) {
            console.log(error.message);
            return error.message
        }
        
    }
    
    getLessonNamesByGroupPath(path) {
        return this.getGroupByPath(path).getLessonNames()
    }

    delete(group) {
        try {
            this.storage.delete(group.getPath());
            this.patchNeighbors(group)
        } catch (error) {
            alert("error deletuing group: " + error.message);
        }
        return null
    }

    patchNeighbors(group){
        for (const ln of group.getLessonNames()) {
            lessonRepository.deleteByPath(Path.plus(group.getPath(), ln))
        }
        for (const gn of group.getGroupNames()) {
            lessonRepository.deleteByPath(Path.plus(group.getPath(), gn))
        }
        let parentGroup = this.getGroupByPath(Path.up(group.getPath()))
        parentGroup.removeChildGroupByName(group.getName())
        this.save(parentGroup)
    }

    deleteByPath(groupPath) {
        let group = this.getGroupByPath(groupPath)
        alert(JSON.stringify(group))
        try {
            this.delete(group)
        } catch (error) {
            alert(error.message);
        }
        alert("deleted " + groupPath)

    }

    save(group) {
        alert(JSON.stringify(group))
        try {
            this.storage.set(group.getPath(), JSON.stringify(group));
        } catch (error) {
            alert("error saving group: " + error.message)
        }
        return null
    }
}
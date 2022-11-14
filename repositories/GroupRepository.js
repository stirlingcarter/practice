import { MMKV } from "react-native-mmkv";
import { lessonRepository } from "../App";
import Constants from "../constant/Constants"
import Group from "../models/Group";


export default class GroupRepository {

    storage = null
    constructor() {
        this.storage = new MMKV({
            id: "Groups"
        })

    }
    getAllGroupNames() {
        return storage.getAllKeys();
    }
    getHeadGroup() {
        return this.getGroupByName(Constants.HEAD_GROUP_NAME)
    }
    getGroupByName(groupName) {
        try {
            let retrievedItem = this.storage.getString(groupName)
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
    getLessonNamesByGroupName(name) {
        return this.getGroupByName(name).getLessonNames()
    }
    delete(group) {
        try {
            this.storage.delete(group.getName());
            for (const ln of group.getLessonNames()) {
                lessonRepository.delete(ln, group.getName())
            }
            

        } catch (error) {
            console.log(error.message);
        }
        return null
    }
    deleteByName(groupName) {
        let group = this.getGroupByName(groupName)
        let parentGroup = this.getGroupByName(group.getParentName())
        parentGroup.removeChildGroupByName(groupName)
        this.save(parentGroup)
        try {
            this.storage.delete(groupName);
            if (group.getLessonNames() != undefined){
                for (const ln of group.getLessonNames()) {
                    lessonRepository.delete(ln, group.getName())
                }
            }
        } catch (error) {
            alert(error.message);
        }
        alert("deleted" + groupName)

        return null
    }
    save(group) {
        try {
            this.storage.set(group.getName(), JSON.stringify(group));
        } catch (error) {
            alert("error saving group: " + error.message)
        }
        return null
    }
}
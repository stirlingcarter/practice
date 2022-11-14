import { lessonRepository } from "./LocalLessonRepository";
import Constants from "../constant/Constants"

const storage = {}

export default {
    getAllGroupNames() {
        return Object.keys(storage);
    },
    getHeadGroup() { 
        return this.getGroupByName(Constants.HEAD_GROUP_NAME)
    },
    getGroupByName(groupName) {
        try {
            let retrievedItem = storage[groupName]
            const item = JSON.parse(retrievedItem);
            return item;
        } catch (error) {
            console.log(error.message);
        }
        return null
    },
    getLessonNamesByGroupName(name) {
        return this.getGroupByName(name).getLessonNames()
    },
    deleteGroup(group) {
        try {
            delete  storage[group.getName()]
            for (const ln of group.getLessonNames()) {
                lessonRepository.delete(ln, group.getName())
            }
        } catch (error) {
            console.log(error.message);
        }
        return null
    },
    save(group) {
        try {
            storage[group.getName()] = JSON.stringify(group);
        } catch (error) {
            console.log(error.message);
        }
        return null
    }
}
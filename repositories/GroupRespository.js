import { MMKV } from "react-native-mmkv";
import lessonRepository from "./LessonRepository.js";
import Util from "../services/Util"

const storage = new MMKV({
    id: "Groups"
})

export default {
    getAllGroupNames() {
        return storage.getAllKeys();
    },
    getHeadGroup() { 
        return this.getGroupByName(Util.HEAD_GROUP_NAME)
    },
    getGroupByName(groupName) {
        try {
            let retrievedItem = this.storage.getString(groupName)
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
            this.storage.delete(group.getName());
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
            storage.set(group.getName(), JSON.stringify(group));
        } catch (error) {
            console.log(error.message);
        }
        return null
    }
}
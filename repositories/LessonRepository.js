import { MMKV } from "react-native-mmkv";
import groupRepository from "./GroupRepository.js";

const storage = new MMKV({
  id: "Lessons"
})

export default {
  getLessonByNameAndGroupName(lessonName, groupName) {
    try {
      let retrievedItem = this.storage.getString(groupName + lessonName)
      const item = JSON.parse(retrievedItem);
      return item;
    } catch (error) {
      console.log(error.message);
    }
    return null;
  },
  delete(lessonName, groupName) {
    try {
      this.storage.delete(groupName + lessonName);
      let group = groupRepository.getGroupByName(groupName)
      group.removeLesson(lessonName)
      groupRepository.save(group)
    } catch (error) {
      console.log(error.message);
    }
  },
  save(lesson) {
    let group = groupRepository.getGroupByName(lesson.getGroupName())
    group.addLessonName(lesson.getName())

    try {
      groupRepository.save(group)
      storage.set(lesson.getGroupName() + lesson.getName(), JSON.stringify(lesson));
    } catch (error) {
      console.log(error.message);
    }
    return null;
  }
}
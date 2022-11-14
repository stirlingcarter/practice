import { MMKV } from "react-native-mmkv";
import groupRepository from "../App";

export default class LessonRepository {

  storage = null
  constructor() {
    this.storage = new MMKV({
      id: "Lessons"
    })

  }

  getLessonByNameAndGroupName(lessonName, groupName) {
    try {
      let retrievedItem = storage.getString(groupName + lessonName)
      const item = JSON.parse(retrievedItem);
      return item;
    } catch (error) {
      console.log(error.message);
    }
    return null;
  }

  delete(lessonName, groupName) {
    try {
      storage.delete(groupName + lessonName);
      let group = groupRepository.getGroupByName(groupName)
      group.removeLesson(lessonName)
      groupRepository.save(group)
    } catch (error) {
      console.log(error.message);
    }
  }

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
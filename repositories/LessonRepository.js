import { MMKV } from "react-native-mmkv";
import { groupRepository } from "../App";
import Path from "../services/Path";
import Lesson from "../models/Lesson";

export default class LessonRepository {

  storage = null
  constructor() {
    this.storage = new MMKV({
      id: "Lessons"
    })

  }

  getLessonByPath(lessonPath) {
    try {
      let retrievedItem = this.storage.getString(lessonPath)
      const item = Lesson.fromJSONStringified(retrievedItem);
      return item;
    } catch (error) {
      console.log(error.message);
    }
    return null;
  }

  deleteByPath(lessonPath) {
    try {
      this.storage.delete(lessonPath);
    } catch (error) {
      console.log(error.message);
    }
  }

  save(lesson) {
    try {
      this.storage.set(lesson.getPath(), JSON.stringify(lesson));
    } catch (error) {
      alert("error saving lesson: " + error.message);
    }
    return null;
  }

  //groups are objects with a list of groups a and a list of lessons. so lessons are the leaves.
  getAllLessonsRecursiveFlatByParentGroupPath(groupPath) {
    let lessons = []
    let parentGroup = groupRepository.getGroupByPath(groupPath)
    let groupNames = parentGroup.getGroupNames()
    let lessonNames = parentGroup.getLessonNames()
    for (let i = 0; i < groupNames.length; i++) {
      let groupName = groupNames[i]
      let groupLessons = this.getAllLessonsRecursiveFlatByParentGroupPath(Path.plus(groupPath, groupName))
      lessons = lessons.concat(groupLessons)
    }
    for (let i = 0; i < lessonNames.length; i++) {
      let lessonName = lessonNames[i]
      let lesson = this.getLessonByPath(Path.plus(groupPath, lessonName))
      lessons.push(lesson)
    }
    return lessons



  }

}
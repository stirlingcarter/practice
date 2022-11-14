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
      let group = groupRepository.getGroupByPath(Path.up(lessonPath))
      group.removeLesson(Path.currentDir(lessonPath))
      groupRepository.save(group)
    } catch (error) {
      console.log(error.message);
    }
  }

  save(lesson) {
    let path = lesson.getPath()
    let group = groupRepository.getGroupByPath(Path.up(path))
    group.addLessonName(lesson.getName())
  
    try {
      groupRepository.save(group)
      this.storage.set(path, JSON.stringify(lesson));
    } catch (error) {
      alert(error.message);
    }
    return null;
  }

}
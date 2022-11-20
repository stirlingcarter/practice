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

}
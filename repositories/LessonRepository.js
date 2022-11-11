import { MMKV } from "react-native-mmkv";
import instrumentRepository from "./InstrumentRepository.js";

const storage = new MMKV({
  id: "Lessons"
})

export default {
  getLessonByNameAndInstrumentName(lessonName, instrumentName) {
    try {
      let retrievedItem = this.storage.getString(instrumentName + lessonName)
      const item = JSON.parse(retrievedItem);
      return item;
    } catch (error) {
      console.log(error.message);
    }
    return null;
  },
  delete(lessonName, instrumentName) {
    try {
      this.storage.delete(instrumentName + lessonName);
      let instrument = instrumentRepository.getInstrumentByName(instrumentName)
      instrument.removeLesson(lessonName)
      instrumentRepository.save(instrument)
    } catch (error) {
      console.log(error.message);
    }
  },
  save(lesson) {
    let instrument = instrumentRepository.getInstrumentByName(lesson.getInstrumentName())
    instrument.addLessonName(lesson.getName())

    try {
      instrumentRepository.save(instrument)
      storage.set(lesson.getInstrumentName() + lesson.getName(), JSON.stringify(lesson));
    } catch (error) {
      console.log(error.message);
    }
    return null;
  }
}
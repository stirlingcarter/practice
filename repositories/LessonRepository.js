import { MMKVLoader } from "react-native-mmkv-storage";
import InstrumentRepository from "./InstrumentRepository";

const instrumentRepository = InstrumentRepository.getInstance();

export default class LessonRepository {

  static instance = null;
  storage = null;

  static getInstance() {
    if (LessonRepository.instance == null) {
      LessonRepository.instance = new LessonRepository();

      storage = new MMKVLoader()
        .withInstanceID("Lessons")
        .initialize();
    }
    return this.instance;
  }

  async getLessonByNameAndInstrumentName(lessonName, instrumentName) {
    try {
      let retrievedItem = await this.storage.getStringAsync(instrumentName + lessonName)
      const item = JSON.parse(retrievedItem);
      return item;
    } catch (error) {
      console.log(error.message);
    }
    return null;
  }

  delete(lessonName, instrumentName) {
    try {
      this.storage.removeItem(instrumentName + lessonName);
      let instrument = instrumentRepository.getInstrumentByName(instrumentName)
      instrument.removeLesson(lessonName)
      instrumentRepository.save(instrument)
    } catch (error) {
      console.log(error.message);
    }
  }

  async save(lesson) {
    let instrument = instrumentRepository.getInstrumentByName(lesson.getInstrumentName())
    instrument.addLessonName(lesson.getName())

    try {
      await instrumentRepository.save(instrument)
      await storage.setStringAsync(lesson.getInstrumentName() + lesson.getName(), JSON.stringify(lesson));
    } catch (error) {
      console.log(error.message);
    }
    return null;
  }

}
import { MMKVLoader } from "react-native-mmkv-storage";
import InstrumentRepository from "./InstrumentRepository";

instrumentRepository = InstrumentRepository.getInstance();

export default class LessonRepository {

  //TODO when this is rebuilt we should put a layer beneath in case we make more repositories 
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


  async getLessonByNameAndInstrumentName(name, instrumentName) {
    // alert("gettinig for " + key)

    try {
      let retrievedItem = await this.storage.getStringAsync(instrumentName+name)
      //alert(JSON.parse(retrievedItem));
      const item = JSON.parse(retrievedItem);
      return item;
    } catch (error) {
      console.log(error.message);
    }
    return null;
  }

  delete(lessonName, instrumentName) {
    try {
      this.storage.removeItem(instrumentName+lessonName);
      let instrument = instrumentRepository.getInstrumentByName(instrumentName)
      instrument.removeLesson(lessonName)
      instrumentRepository.save(instrument)
    } catch (error) {
      console.log(error.message);
    }
  }

  async save(lesson) {
    let instrumentName = lesson.getInstrumentName()
    try {
      await storage.setStringAsync(instrumentName + lesson.getName(), JSON.stringify(lesson));
    } catch (error) {
      console.log(error.message);
    }
    return
  }

}
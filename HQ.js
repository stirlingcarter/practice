import * as React from "react";

import DB from "./DB";
import Note from "./note";

import { DefaultTheme } from "react-native-paper";
import LessonCache from "./LessonCache";

class HQ {
  constructor() {
    if (!HQ.instance) {
      this.mountLesson = this.mountLesson.bind(this);
      this.getNextNote = this.getNextNote.bind(this);
      this.commit = this.commit.bind(this);
      this.getInstrumentNames = this.getInstrumentNames.bind(this);
      this.getStatsByInstr = this.getStatsByInstr.bind(this);
      this.getOrderedUniqueLessonNamesByInstr = this.getOrderedUniqueLessonNamesByInstr.bind(
        this
      );
      this.getLessonDescr = this.getLessonDescr.bind(this);
      this.setSavedFlag = this.setSavedFlag.bind(this);
      this.saveLesson = this.saveLesson.bind(this);

      this.max_min = this.max_min.bind(this);
      this.average = this.average.bind(this);
      this.random = this.random.bind(this);

      this.DB = new DB();

      //per lesson
      this.cache = new LessonCache();
      var cacheIsSaved = false;
      //lesson configs
      //Pickers are -functions- that return -notes- using their access to -lessonHistory-.
      var strategies = ["max_min", "average", "random"];
      var strategyId = 2;
      var window = 10;
      var groupsOf = 3;

      //per challenge
      this.currentNote = this.getNextNote();

      HQ.instance = this;
    }

    return HQ.instance;
  }

  mountLesson(instrument, uniqueLessonName) {
    //does this ni and out.

    //FOR IN:
    this.cache.mountLesson(instrument, uniqueLessonName);
  }

  setSavedFlag(booleo) {
    this.isSaved = booleo;
  }

  getNextNote() {
    return this.getNextNoteByStrategy(this.strategyId);
  }

  commit(diff) {
    alert("time received by hq");
    this.cache.commit(diff);
  }

  saveLesson() {
    this.cache.push();
    this.setSavedFlag(true);
  }

  getInstrumentNames() {
    var names = ["guitar", "piano"];
    return names;
  }

  getOrderedUniqueLessonNamesByInstr(instrument) {
    var orderedUniqueLessonNames = ["less1", "less2", "less3"];
    return orderedUniqueLessonNames;
  }

  getStatsByInstr(instrument) {
    return 1200;
  }

  getLessonDescr() {
    return this.cache.getLessonDescr();
  }

  getNextNoteByStrategy(strategyId) {
    if (strategyId == 0) {
      return this.max_min();
    } else if (strategyId == 1) {
      return this.average();
    } else {
      return this.random();
    }
  }

  //STRATS --------------------------------------------------------------------------
  max_min() {
    return "A";
  }

  average() {
    return "B";
  }

  random() {
    let newNote = new Note("BB", 0, "whatever", "aM_pic.jpg");
    this.currentNote = newNote;

    return newNote;
  }
  //END STRATS --------------------------------------------------------------------------
}

const instance = new HQ();
Object.freeze(instance);

export default instance;

//THINKING ONLY. HOLDS ONLY A REF TO CACHE.

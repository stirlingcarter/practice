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

      this.getBpm = this.getBpm.bind(this);
      this.getCri = this.getCri.bind(this);
      this.getVisId = this.getVisId.bind(this);
      this.saveLesson = this.saveLesson.bind(this);

      this.max_min = this.max_min.bind(this);
      this.average = this.average.bind(this);
      this.random = this.random.bind(this);

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
    LessonCache.mountLesson(instrument, uniqueLessonName);
  }

  getNextNote() {
    return this.getNextNoteByStrategy(this.strategyId);
  }

  commit(diff) {
    alert("time received by hq for note " + this.currentNote);
    LessonCache.commit(diff, this.currentNote);
  }

  saveLesson() {
    LessonCache.push();
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
 
  getBpm() {
    return LessonCache.getBpm();
  }

  getCri() {
    return LessonCache.getCri();
  }

  getVisId() {
    return LessonCache.getVisId();
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

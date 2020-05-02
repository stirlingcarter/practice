import * as React from "react";

import DB from "./DB";

import { DefaultTheme } from "react-native-paper";
import LessonCache from "./LessonCache";

var LC = LessonCache.getInstance();

export default class HQ {
  static instance = null;

  currentNote = this.getNextNote();

  strategies = ["max_min", "average", "random"];
  strategyId = 2;
  static getInstance() {
    if (HQ.instance == null) {
      HQ.instance = new HQ();
    }

    return this.instance;
  }

  mountLesson(instrument, uniqueLessonName) {
    //does this ni and out.

    //FOR IN:
    LC.mountLesson(instrument, uniqueLessonName);
  }
  async mountLessonNames(instrument) {
    //does this ni and out.

    //FOR IN:
    LC.mountLessonNames(instrument);
  }

  getNextNote() {
    let next = this.getNextNoteByStrategy(this.strategyId);
    this.currentNote = next;

    return next;
  }

  commit(diff) {
    alert("time received by hq for note " + this.currentNote);
    LC.commit(diff, this.currentNote);
  }

  saveLesson() {
    LC.push();
  }

  getInstrumentNames() {
    var names = ["guitar", "piano"];
    return names;
  }

  getOrderedUniqueLessonNamesByInstr(instrument) {
    //FOR THE LESSON LIST
    //SHOW USER LESSONS FIRST IN ALPHA THEN THE REST BY ORDER OF DOING

    //LOAD ANY PAYLOADS THAT EXIST ON DISK (USER CREATED LESSONS, INITIATED LESSONS)
    //LOAD ANY TEMPLATES (BAKED IN LESSONS THAT HAVEN'T BEEN PLAYED YET)

    return LC.getOrderedUniqueLessonNamesByInstr(instrument);
  }

  getStatsByInstr(instrument) {
    return 1200;
  }

  getBpm() {
    return LC.getBpm();
  }

  getCri() {
    return LC.getCri();
  }

  getVisId() {
    return LC.getVisId();
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

  saveNewLesson(instrument, uniqueLessonName, cri) {
    LC.saveNewLesson(instrument, uniqueLessonName, cri);
  }

  getIntRep(note) {
    if (note == "A") {
      return 1;
    } else if (note == "Bb") {
      return 2;
    } else if (note == "B") {
      return 3;
    } else if (note == "C") {
      return 4;
    } else if (note == "Db") {
      return 5;
    } else if (note == "D") {
      return 6;
    } else if (note == "Eb") {
      return 7;
    } else if (note == "E") {
      return 8;
    } else if (note == "F") {
      return 9;
    } else if (note == "Gb") {
      return 10;
    } else if (note == "G") {
      return 11;
    } else {
      return 12;
    }
  }

  getNoteRep(number) {
    if (number == 1) {
      return "A";
    } else if (number == 2) {
      return "Bb";
    } else if (number == 3) {
      return "B";
    } else if (number == 4) {
      return "C";
    } else if (number == 5) {
      return "Db";
    } else if (number == 6) {
      return "D";
    } else if (number == 7) {
      return "Eb";
    } else if (number == 8) {
      return "E";
    } else if (number == 9) {
      return "F";
    } else if (number == 10) {
      return "Gb";
    } else if (number == 11) {
      return "G";
    } else {
      return "Ab";
    }
  }

  //put in 12
  //get 1,2,3....12
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
  }

  //STRATS --------------------------------------------------------------------------
  max_min() {
    return "A";
  }

  average() {
    return "B";
  }

  random() {
    let newNote = this.getNoteRep(this.getRandomInt(12));
    //alert("setting note to " + newNote.getNote())

    return newNote;
  }
  //END STRATS --------------------------------------------------------------------------
}

//THINKING ONLY. HOLDS ONLY A REF TO CACHE.

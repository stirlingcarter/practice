import LessonCache from "./LessonCache";

var LC = LessonCache.getInstance();

export default class HQ {
  static instance = null;

  currentNote = this.getNextNote();

  prevNote = 13;
  strategies = ["max_min", "average", "random"];
  strategyId = 1;

  static getInstance() {
    if (HQ.instance == null) {
      HQ.instance = new HQ();
    }

    return this.instance;
  }

  async getLessonNamesByInstrument(instrument) {
    var lessons = await LC.getLessonNamesByInstrument(instrument);

    return lessons;
  }


  async mountLesson(instrument, uniqueLessonName, cb) {
    //does this ni and out.

    //FOR IN:
    await LC.mountLesson(instrument, uniqueLessonName, cb);
  }


  async mountLessonNames(instrument) {
    //does this ni and out.

    //FOR IN:
    return LC.mountLessonNames(instrument);
  }

  unmountAnyLessonNames() {
    LC.unmountAnyLessonNames();
  }

  getNextNote() {

    let next = this.getNextNoteByStrategy(this.strategyId);
    this.currentNote = next;

    return next;
  }

  commit(diff) {
    LC.commit(diff, this.currentNote);
  }

  saveLesson() {
    LC.push();
  }

  async deleteLesson(instrument, uniqueLessonName, cb) {
    await LC.deleteLesson(instrument, uniqueLessonName, cb);
  }

  getInstrumentNames() {
    var names = ["guitar", "piano"];
    return names;
  }

  //LOAD ANY PAYLOADS THAT EXIST ON DISK (USER CREATED LESSONS, INITIATED LESSONS)
  //LOAD ANY TEMPLATES (BAKED IN LESSONS THAT HAVEN'T BEEN PLAYED YET)
  getOrderedUniqueLessonNamesByInstr(instrument) {
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

  async saveNewLesson(instrument, uniqueLessonName, cri, variants, variants2) {

    v = []
    v2 = []

    if (variants != null){
      v = variants.split(",")
      var i;
      for (i = 0; i < v.length; i++) { 
        v[i] = v[i].trim()
      }
    }
    if (variants2 != null){
      v2 = variants2.split(",")
      var i;
      for (i = 0; i < v2.length; i++) { 
        v2[i] = v2[i].trim()
      }
    }






    await LC.saveNewLesson(instrument, uniqueLessonName, cri, v, v2);
    

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

  /*BEGIN STRATS --------------------------------------------------------------------------
  Collection of functions that implement the note choosing strategies. 
  */
  max_min() {
    return "A";
  }

  average() {
    let next = LC.getSlowestNote(10);
    if (next != this.prevNote) {
      this.prevNote = next;
      return next;
    } else {
      return this.random();
    }
  }

  random() {
    let newNote = LC.getRandomNote();


    // while (newNote == this.prevNote) {
    //   newNote = LC.getRandomNote();
    // }

    this.prevNote = newNote;
    //alert("setting note to " + newNote.getNote())

    return newNote;
  }
}
  /*END STRATS --------------------------------------------------------------------------
  Collection of functions that implement the note choosing strategies. 
  */

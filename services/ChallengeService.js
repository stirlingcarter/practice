import StatService from "./StatService";
import LessonRepository from "../repositories/LessonRepository";
import InputParser from "./InputParser";

var statService = StatService.getInstance();
var lessonRepository = LessonRepository.getInstance(); 

export default class ChallengeService {
  static instance = null;

  currentNote = this.getNextNote();

  prevNote = 13;
  strategies = ["max_min", "average", "random"];
  strategyId = 1;

  static getInstance() {
    if (ChallengeService.instance == null) {
      ChallengeService.instance = new ChallengeService();
    }

    return this.instance;
  }

  async getLessonNamesByInstrument(instrument) {
    var lessons = await statService.getLessonNamesByInstrument(instrument);

    return lessons;
  }


  getNextNote() {

    let next = this.getNextNoteByStrategy(this.strategyId);
    this.currentNote = next;

    return next;
  }

  commit(diff) {
    statService.commit(diff, this.currentNote);
  }
    //HQI.getAverages returns -> [[[2,6,3,6,4,7,6,4,8,2,6,7],
    //              [5,2,6,7,3],
    //              [1,6]],[[a,b,c....g],
    //              [maj7,m7...d7],
    //              [left,right]]]
  getAveragesByVariant(){


    //make a set of the non meta keys - A$maj7$left
    //make n+1 sets, n = number of $
    //divide each member into proper sets
    //now you have (A,Bb,B....Ab), (maj7,min7....dim7), (left,right), and a master set. 
    //now, make the sets ordered. These sets will be the basis for param. order from here on out.
    //each set member needs a corresponding average time 
    //what is the av for A? 
    //have a getter that gets you all the keys with A from the master set. 
    //from each of those keys' value arrays, get a windowed average. [1,4,5,.............2,4,3,5,4,6,5,7,6,8] average the last 10.
    
    return statService.getAveragesByVariant();




  }

  saveLesson() {
    statService.push();
  }

  getInstrumentNames() {
    var names = ["guitarr", "piano"];
    return names;
  }

getHistoricalAveragesByCatMember(names){
    return statService.getHistoricalAveragesByCatMember(names);

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

  async saveNewLesson(instrumentName, title, criteria, v, v2, goal) {

    lesson = new Lesson(title, criteria, instrumentName, goal, v, v2)
    await lessonRepository.save(lesson)

    instrument = instrumentRepository.getInstrumentByName(instrumentName)
    instrument.addLesson(lesson.getName())
    await InstrumentRepository.save(instrument)
    
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
    let next = statService.getSlowestNote(10);
    if (next != this.prevNote) {
      this.prevNote = next;
      return next;
    } else {
      return this.random();
    }
  }

  random() {
    let newNote = statService.getRandomNote();


    // while (newNote == this.prevNote) {
    //   newNote = statService.getRandomNote();
    // }

    this.prevNote = newNote;
    //alert("setting note to " + newNote.getNote())

    return newNote;
  }
}
  /*END STRATS --------------------------------------------------------------------------
  Collection of functions that implement the note choosing strategies. 
  */

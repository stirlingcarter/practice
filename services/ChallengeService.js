import StatService from "./StatService";
import LessonRepository from "../repositories/LessonRepository";
import InputParser from "./InputParser";

var statService = StatService.getInstance();
var lessonRepository = LessonRepository.getInstance(); 

export default class ChallengeService {
  static instance = null;

  currentVHash = this.getNextVHash();

  prevVHash = 13;
  strategies = ["max_min", "average", "random"];
  strategyId = 1;

  static getInstance() {
    if (ChallengeService.instance == null) {
      ChallengeService.instance = new ChallengeService();
    }

    return this.instance;
  }

  getNextVHash() {

    let nextVHash = this.getNextVHashByStrategy(this.strategyId);
    this.currentVHash = nextVHash;

    return nextVHash;
  }

  getNextVHashByStrategy(strategyId) {
    if (strategyId == 0) {
      return this.max_min();
    } else if (strategyId == 1) {
      return this.average();
    } else {
      return this.random();
    }
  }

  //put in 12
  //get 1,2,3....12
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
  }

  /*BEGIN STRATS --------------------------------------------------------------------------
  Collection of functions that implement the vHash choosing strategies. 
  */
  max_min() {
    return "A";
  }

  average() {
    let next = statService.getSlowestVHash(10, lesson);
    if (next != this.prevVHash) {
      this.prevVHash = next;
      return next;
    } else {
      return this.random();
    }
  }

  random() {
    let newVHash = statService.getRandomVHash();


    // while (newNote == this.prevNote) {
    //   newNote = statService.getRandomNote();
    // }

    this.prevVHash = newVHash;
    //alert("setting note to " + newNote.getNote())

    return newVHash;
  }
}
  /*END STRATS --------------------------------------------------------------------------
  Collection of functions that implement the vHash choosing strategies. 
  */

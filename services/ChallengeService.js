import StatService from "./StatService";

const statService = StatService.getInstance();

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

  getNextVHash(lesson) {
    let nextVHash = this.getNextVHashByStrategy(this.strategyId, lesson);
    this.currentVHash = nextVHash;
    return nextVHash;
  }

  getNextVHashByStrategy(strategyId, lesson) {
    if (strategyId == 0) {
      return this.max_min(lesson);
    } else if (strategyId == 1) {
      return this.average(lesson);
    } else {
      return this.random(lesson);
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
  max_min(lesson) {
    return "A";
  }

  average(lesson) {
    let nextVHash = statService.getSlowestVHash(10, lesson);
    if (nextVHash != this.prevVHash) {
      this.prevVHash = nextVHash;
      return nextVHash;
    } else {
      return this.random();
    }
  }

  random(lesson) {
    let newVHash = statService.getRandomVHash(lesson);
    // while (newNote == this.prevNote) {
    //   newNote = statService.getRandomNote();
    // }
    this.prevVHash = newVHash;
    return newVHash;
  }
}
  /*END STRATS --------------------------------------------------------------------------
Collection of functions that implement the vHash choosing strategies. 
*/

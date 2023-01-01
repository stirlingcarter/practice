import { statService } from "../App";

export default class ChallengeService {

  currentVHash = "na"

  constructor(){}

  getNextVHash(lesson) {
    let nextVHash = ChallengeService.STRATS["SLOWEST"](lesson)
    while (nextVHash == this.currentVHash) {
      nextVHash = ChallengeService.STRATS["RANDOM"](lesson)
    }
    this.currentVHash = nextVHash;
    return nextVHash;
  }

  static STRATS = {
    "SLOWEST" : function(lesson) {
      let WINDOW = 10
      return statService.getSlowestVHash(WINDOW, lesson)
    },
    "RANDOM" : function(lesson) {
      return statService.getRandomVHash(lesson)
    }
  }

  reccommendBPM(lesson) {
    return 44
  }


}
  /*END STRATS --------------------------------------------------------------------------
Collection of functions that implement the vHash choosing strategies. 
*/

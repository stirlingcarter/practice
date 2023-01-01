import { statService } from "../App";
import Constants from "../constant/Constants";
import Util from "./Util";

export default class ChallengeService {

  currentVHash = "na"

  MAXIMUM_TRIES_2 = 5
  MAXIMUM_TRIES_3 = 1
  TRIES_LOOKBACK = 1


  constructor(){}

  getNextVHash(lesson) {
    if (lesson.getType() == Constants.LESSON_TYPE_TRIES) {
      let next = this.getFirstVHashWithoutEntryForBPM(lesson, lesson.getBPM())
      if (next != undefined) {
        return next
      }
    } 

    let nextVHash = ChallengeService.STRATS["SLOWEST"](lesson)
    while (nextVHash == this.currentVHash) {
      nextVHash = ChallengeService.STRATS["RANDOM"](lesson)
    }
    this.currentVHash = nextVHash;
    return nextVHash;
  }


  getFirstVHashWithoutEntryForBPM(lesson, bpm) {
    let vHashes = lesson.getVHashes()
    for (let i = 0; i < vHashes.length; i++) {
      let vHash = vHashes[i]
      let tries = lesson.getTimesByVHash(vHash)
      let bpms = lesson.getBPMsByVHash(vHash)

      if (Util.removeNonTargetBpm(tries, bpms, bpm).length == 0) {
        return vHash
    }
    return undefined
  }
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


  /**
 * Recommend the next BPM to try for a lesson
 * @param {lesson} lesson - the lesson to recommend the BPM for
 * @returns {number} the recommended BPM
 */
  reccommendBPM(lesson) {
    let res = statService.getLastNSliceFromEachVHashAndAggregate(1,lesson)//get a tru surface slice, incl each vhashes last tries and bpm
    let tries = res[0]
    let bpms = res[1]
    let cur = lesson.getCompletedBPM()//appr level to be trying

    if (res == undefined || //if there isnt even a whole slice
      Util.removeNonTargetBpm(tries,bpms, cur).length != lesson.getVHashes().length) { //if the slice is not all target bpm
      return cur //(this keeps it the same) harsh but gotta blow thru it all without leveling down to level up
    }
    alert("res: " + res)
    let count = { 1: 0, 2: 0, 3: 0, 4: 0 };//ok at this point we have a slice of all target bpm so lets see how many 1s, 2s, 3s, 4+s there are
    tries.forEach(function(number) {
      if (number > 3) {
        number = 4;
      }
      count[number]++;
    });
    return count[3] <= this.MAXIMUM_TRIES_3 && count[2] <= this.MAXIMUM_TRIES_2 && count[4] == 0 ? cur + 1 : //if there are less than MAXIMUM_TRIES_2... 2s and less than MAXIMUM_TRIES_3 3s and no 4s, level up
    count[1] + count[2] + count[3] > 0 ? cur: //if there are any 1s, 2s, or 3s, stay at this bpm
    cur - 1; //otherwise, level down
    
  }

}
  /*END STRATS --------------------------------------------------------------------------
Collection of functions that implement the vHash choosing strategies. 
*/

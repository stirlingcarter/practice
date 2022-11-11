import thisTimeValue from "es-abstract/2015/thisTimeValue";

RANDOM_FIRST_RUN = true
import LessonRepository from "../repositories/LessonRepository";
import Util from "."
var lessonRepository = LessonRepository.getInstance();


export default class StatService {

  static instance = null;

  static getInstance() {
    if (StatService.instance == null) {
      StatService.instance = new StatService();
    }

    return this.instance;
  }

  payload = {};
  lessonNames = [];

  
  getAverage(window, vHash, lesson){
    let avg = 0;
    let len = lesson.getLengthOfVHashTimes(vHash)
    for (let i = 0; i < window && i < len; i++) {
      let index = len - 1 - i;
      avg += lesson.getSpecificTime(vHash, index);
    }

    let d = window;
    if (len < window) {
      d = len;
    }

    let ans = avg/d

    return (isNaN(ans) ? 0 : ans);

  }


  getSlowestVHash(window, lesson) {
    let vHashes = lesson.getVHashes()

    if (RANDOM_FIRST_RUN){
      let unvisitedVHashes = lesson.getVHashes.filter(vHash => lesson.isEmpty(vHash))
      if (unvisitedVHashes.length > 0){
        return unvisitedVHashes[Math.floor(Math.random() * unvisitedVHashes.length)]
      }
    }
      
    //if there are any keys with 0, return a randoom one. 
    //else do the followinig.

    let maxAverage = 0
    let maxVHash = vHashes[0]
    for (let i = 0; i < vHashes.length; i++){
      let vHash = vHashes[i]
      let windowedAverage = this.getAverage(window,vHash)
      if (windowedAverage == 0){
        return vHash
      }else{
        if (windowedAverage > maxAverage){
          maxAverage = windowedAverage
          maxVHash = vHash
        }

      }
    }

    return maxVHash

  }

  getHistoricalAveragesByVariant(variantNames, lesson){

    let vHashes = lesson.getVHashes()

    let res = []
    for (let i = 0; i < variantNames.length; i++){

      let vHashesContainingVariant = Util.getAllVHashesContainingVariant(vHashes, variantNames[i]) // A, or Bb 

      let variantTimes = []
      for (let k = 0; k < vHashesContainingVariant.length; k++){
        let currentVHash = vHashesContainingVariant[k]
        if (lesson.isEmpty(currentVHash)){
          variantTimes.push([])
        }else{
          variantTimes.push(lesson.getTimesByVHash(currentVHash))
        }
      }
      res.push(this.interleaveArrays(variantTimes))
    }
    return res
  }


  //arrays: these will all initerleave inito one array tho 
  // [
  //   [8,7,5,3] 
  //   [5,2]
  //   []
  //   [23,14,10,7,6,4,3]
  //   ....
  // ]
  //output:
  //[8,5,23,7,2,14,5,10,3,7,6,4,3]

  interleaveArrays(arrays){

    let l = arrays.length
    let res = []
    
    let done = false

    let i = 0
    while (!done && i < 100){
      let done = true
      for (let i = 0; i < l; i++){
        if (arrays[i].length > 0){
          done = false
          res.push(arrays[i].shift())
        }
      }
      i += 1
    }


    return res

  }

    //HQI.getAverages returns -> [[[2,6,3,6,4,7,6,4,8,2,6,7],
  //              [5,2,6,7,3],
  //              [1,6]],[[a,b,c....g],
  //              [maj7,m7...d7],
  //              [left,right]]]
  getAveragesByVariant(lesson){


    //make a set of the non meta keys - A$maj7$left
    let vHashes = lesson.getVHashes()


    let namesOfVariants = Util.getNamesOfVariantsFromVHashes(vHashes)

    //now you have nameSets = [(A,Bb,B....Ab), (maj7,min7....dim7), (left,right)] 
    //now, make the sets ordered. These sets will be the basis for param. order from here on out.
    //each set member needs a corresponding average time 
    //what is the av for A? 

    let averagesOfVariants = []
    for (let i = 0; i < namesOfVariants.length; i++){
      let variantGroupAverages = []

      for (let k = 0; k < namesOfVariants[i].length; k++){
        let matchingVHashes = Util.getAllVHashesContainingVariant(vHashes, namesOfVariants[i][k]) // A maj7 left A min7 left A maj7 right A min7 right
        let divisor = matchingVHashes.length 
        let sum = 0
        for (let j = 0; j < matchingVHashes.length; j++){
          let addand = this.getAverage(10,matchingVHashes[j])
          if (addand == 0){
            divisor -= 1 // not counting this for the amount of averages being averaged
          }
          sum += addand
        }
        avg = sum / divisor
        variantGroupAverages.push(avg)
      }

      averagesOfVariants.push(variantGroupAverages)
    }

    //have a getter that gets you all the keys with A from the master set. 
    //from each of those keys' value arrays, get a windowed average. [1,4,5,.............2,4,3,5,4,6,5,7,6,8] average the last 10.
 
    let res = []
    res.push(averagesOfVariants)
    res.push(namesOfVariants)
    //alert(res)
    return res

  }

  getRandomNote(lesson) {
    let vHashes = lesson.getVHashes()[Math.floor(Math.random()*items.length)]
    return vHashes[Math.floor(Math.random()*vHashes.length)]
  }


  // INSTRUMENT/LESSON/PAYLOAD.txt
}

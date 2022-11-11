import thisTimeValue from "es-abstract/2015/thisTimeValue";

RANDOM_FIRST_RUN = true
import LessonRepository from "../repositories/LessonRepository";

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


  //TODO why tf are there getters in the cache layer
  getBpm() {
    //get these things from db dummy
    //set them and return
    return this.payload["bpm"];
  }

  getCri() {
    //get these things from db dummy
    //set them and return
    return this.payload["cri"];
  }

  getVisId() {
    //get these things from db dummy
    //set them and return
    return this.payload["visId"];
  }

  
  getAverage(window,key){
    let ave = 0;
    let len = this.payload[key].length;
    for (let i = 0; i < window && i < len; i++) {
      let index = len - 1 - i;
      ave += this.payload[key][index];
    }

    let d = window;
    if (len < window) {
      d = len;
    }

    let ans = ave/d

    return (isNaN(ans) ? 0 : ans);

  }

  remove(arr,item) {
    var index = arr.indexOf(item);
    if (index !== -1) {
      arr.splice(index, 1);
    }

    return arr;
}

  getJustChallengeKeys(keys){
    keys = this.remove(keys,"instrument")
    keys = this.remove(keys,"uniqueLessonName")
    keys = this.remove(keys,"cri")
    keys = this.remove(keys,"visId")
    keys = this.remove(keys,"bpm")
    keys = this.remove(keys,"goal")
    return keys
  }

  getEmptyKeys(window, keys){
    let emptyKeys = []
    for (let i = 0; i < keys.length; i++){
      let note = keys[i]
      let windowedAverage = this.getAverage(window,note)

      if (windowedAverage == 0){
        emptyKeys.push(note)

      }
    }
    return emptyKeys
  }

  getSlowestNote(window) {
    let keys = Object.keys(this.payload)

    keys = this.getJustChallengeKeys(keys)

    if (RANDOM_FIRST_RUN){
      let emptyKeys = this.getEmptyKeys(window,keys)
      if (emptyKeys.length > 0){
        return emptyKeys[Math.floor(Math.random() * emptyKeys.length)]
      }
    }
      
    //if there are any keys with 0, return a randoom one. 
    //else do the followinig.

    let maxAverage = 0
    let maxKey = keys[0]
    for (let i = 0; i < keys.length; i++){
      let note = keys[i]
      let windowedAverage = this.getAverage(window,note)
      if (windowedAverage == 0){
        return note
      }else{
        if (windowedAverage > maxAverage){
          maxAverage = windowedAverage
          maxKey = note
        }

      }
    }

    return maxKey

  }

  getLessonGoal() {
    return this.payload["goal"];
  }

  getHistoricalAveragesByCatMember(names){

    let keys = Object.keys(this.payload)
    keys = this.getJustChallengeKeys(keys)

    let res = []
    for (let i = 0; i < names.length; i++){

      let matchingKeys = this.getAllMatchingKeys(keys,names[i]) // A, or Bb 

      let allTimesForCatMember = []
      for (let k = 0; k < matchingKeys.length; k++){
        if (this.payload[matchingKeys[k]].length == 0){
          allTimesForCatMember.push([])
        }else{
          let arrayCopy = JSON.parse(JSON.stringify(this.payload[matchingKeys[k]])); 
        
          allTimesForCatMember.push(arrayCopy)
        }
      }
      res.push(this.interleaveArrays(allTimesForCatMember))
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
  getAveragesByCategory(){


    //make a set of the non meta keys - A$maj7$left
    let keys = Object.keys(this.payload)

    keys = this.getJustChallengeKeys(keys)

    //make n+1 sets, n = number of $
    let n = keys[0].split("$").length
    let nameSets = []
    for (let i = 0; i < n; i++){
      let tmp = new Set()
      nameSets.push(tmp)
    }

    for (let k = 0; k < keys.length; k++){
      
      //cats is ["A","maj 7", "left"]
      let cats = keys[k].split("$")
      for (let i = 0; i < n; i++){

        nameSets[i].add(cats[i])
      }
    }

    let nameSetListVersion = []
    for (let i = 0; i < n; i++){
      nameSetListVersion.push(Array.from(nameSets[i]))

    }

    //now you have nameSets = [(A,Bb,B....Ab), (maj7,min7....dim7), (left,right)] 
    //now, make the sets ordered. These sets will be the basis for param. order from here on out.
    //each set member needs a corresponding average time 
    //what is the av for A? 

    let timeSets = []
    for (let i = 0; i < n; i++){
      let tmp = []

      for (let k = 0; k < nameSetListVersion[i].length; k++){
        let matchingKeys = this.getAllMatchingKeys(keys, nameSetListVersion[i][k]) // A maj7 left A min7 left A maj7 right A min7 right
        let divisor = matchingKeys.length 
        let sum = 0
        for (let j = 0; j < matchingKeys.length; j++){
          let addand = this.getAverage(10,matchingKeys[j])
          if (addand == 0){
            divisor -= 1 // not counting this for the amount of averages being averaged
          }
          sum += addand
        }
        avg = sum / divisor
        tmp.push(avg)
      }

      timeSets.push(tmp)
    }

    //have a getter that gets you all the keys with A from the master set. 
    //from each of those keys' value arrays, get a windowed average. [1,4,5,.............2,4,3,5,4,6,5,7,6,8] average the last 10.
 
    let res = []
    res.push(timeSets)
    res.push(nameSetListVersion)
    //alert(res)
    return res

  }





  //given a list of keys
  //given a matching str A, maj7, etc
  //return all keys that match 
  //given that the s should match an entire substr, this is possible 
  //but this creates a new restriction, cant have the same cat member twice 
  getAllMatchingKeys(keys, s){



    let res = []

    for (let i = 0; i < keys.length; i++){
      let cats = keys[i].split("$")
      for (let k = 0; k < cats.length; k++){
        if (s === cats[k]){
          res.push(keys[i])
        }
      }

    }

    return res
    




  }

  getRandomNote(lesson) {
    let vHashes = lesson.getVHashes()[Math.floor(Math.random()*items.length)]
    return vHashes[Math.floor(Math.random()*vHashes.length)]
  }


  // INSTRUMENT/LESSON/PAYLOAD.txt
}

import thisTimeValue from "es-abstract/2015/thisTimeValue";

RANDOM_FIRST_RUN = true
import LessonRepository from "./LessonRepository";

var lessonRepository = LessonRepository.getInstance();


export default class LessonCache {

  static instance = null;

  static getInstance() {
    if (LessonCache.instance == null) {
      LessonCache.instance = new LessonCache();
    }

    return this.instance;
  }

  payload = {};
  lessonNames = [];

  async mountLesson(instrument, uniqueLessonName, cb) {
    if (
      !(
        instrument == this.payload["instrument"] &&
        uniqueLessonName == this.payload["uniqueLessonName"]
      )
    ) {
      // alert(
      //   "mountng instr/name from " +
      //     this.payload["instrument"] +
      //     "/" +
      //     this.payload["uniqueLessonName"] +
      //     " to " +
      //     instrument +
      //     "/" +
      //     uniqueLessonName
      // );

      await this.mountLessonFromDisk(instrument, uniqueLessonName, cb);
    }
  }
  unmountAnyLessonNames() {
    this.lessonNames = [];
  }
  mountLessonNames(instrument, callback) {
    this.mountLessonNamesFromDisk(instrument, callback);
  }

  push() {
    var payloadPath =
      "lessonPayloads/" +
      this.payload["instrument"] +
      "/" +
      this.payload["uniqueLessonName"] +
      "/payload";
    lessonRepository.save(payloadPath, this.payload);
  }

  commit(diff, note) {

    

    this.payload[note].push(diff);

  }

  async deleteLesson(instrument, uniqueLessonName, cb) {
    var payloadPath =
      "lessonPayloads/" + instrument + "/" + uniqueLessonName + "/payload";

    lessonRepository.deleteLessonById(payloadPath);

    var path = instrument + "/meta/lessons";

    this.lessonNames = await this.getLessonNamesByInstrument(instrument);

    this.lessonNames = this.lessonNames.filter((e) => e !== uniqueLessonName);

    await lessonRepository.save(path, this.lessonNames);
    cb();
  }

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

  getRandomNote() {
    let keys = Object.keys(this.payload)

    keys = this.getJustChallengeKeys(keys)



    //keys.length == 12
    //get 0,1,2,3....11
    return keys[Math.floor(Math.random() * Math.floor(keys.length))]
    
  }

  //getMins
  //getAverageByNote(note, window)

  /*

    AITE WE PUTTING EVERY GUITAR TEMPLATE DOWN HERE
    THEN WE PUT ALL THE PIANON TEMPLATES IN A BLOCK DOWN THERE 


    */

  guitarTemplates = {
    startTemplate: {
      //this payload represents a save file for a lessonn
      //it is also the existence indicator for this lesson

      //meta
      uniqueLessonName0: "Ashleighie", //shld be instrument unique
      cri: "Play each minor7....",
      visId: "sag/fsg/f/sgagrg.jpg",
      bpm: 0,
      instrument: "harp",
    },

    uniqueLessonName1: {
      //meta
      uniqueLessonName: "testLesson1", //shld be instrument unique
      cri:
        "Play the following note everywhere it occurs on the guitar,\n\t each instance played lowest to highest to lowest",
      visId: "./assets/snack-icon.png",
      bpm: 0,
      instrument: "guitar",
    },

    uniqueLessonName2: {
      //meta
      uniqueLessonName: "testLesson2", //shld be instrument unique
      cri: "Play the following chord everywhere it occurs on the guitar...",
      visId: "./assets/snack-icon.png",
      bpm: 0,
      instrument: "guitar",
    },
  };

  pianoTemplates = {
    startTemplate: {
      //this payload represents a save file for a lessonn
      //it is also the existence indicator for this lesson

      //meta
      uniqueLessonName0: "Ashleighie", //shld be instrument unique
      cri: "Play each minor7....",
      visId: "sag/fsg/f/sgagrg.jpg",
      bpm: 0,
      instrument: "piano",
    },

    uniqueLessonName1: {
      //meta
      uniqueLessonName: "testLesson1", //shld be instrument unique
      cri:
        "Play the following note everywhere it occurs on the piano,\n\t each instance played lowest to highest to lowest",
      visId: "./assets/snack-icon.png",
      bpm: 0,
      instrument: "piano",
    },

    uniqueLessonName2: {
      //meta
      uniqueLessonName: "testLesson2", //shld be instrument unique
      cri: "Play the following chord everywhere it occurs on the piano...",
      visId: "./assets/snack-icon.png",
      bpm: 0,
      instrument: "piano",
    },
  };

  instrumentTemplates = {
    1: this.guitarTemplates,
    2: this.pianoTemplates,
  };

  //this is what happens when a person clicks a lesson.
  //so assumption is this lesson already exists in mem.

  async mountLessonFromDisk(instrument, uniqueLessonName, cb) {
    
    var nonePayload = {
      //this payload represents a save file for a "lessonn
      //it is also the existence indicator for this lesson

      //metadata
      instrument: instrument,
      uniqueLessonName: uniqueLessonName, //shld be instrument unique
      cri: "Unable to load this lesson",
      visId: "",
      bpm: "",

      //one source of truth for every strategy
      A: [],
      Bb: [],
      B: [],
      C: [],
      Db: [],
      D: [],
      Eb: [],
      E: [],
      F: [],
      Gb: [],
      G: [],
      Ab: [],
    };

    var payloadPath =
      "lessonPayloads/" + instrument + "/" + uniqueLessonName + "/payload";

    lessonRepository.getLessonById(payloadPath)
      .then((result) => {
        if (result == undefined) {
          this.payload = {}
          Object.assign(this.payload, nonePayload);
        } else {
          this.payload = {}
          Object.assign(this.payload, result);
          cb();
        }
      })
      .catch((error) => {
        Object.assign(this.payload, nonePayload);
      });
    
      
  }

  async mountLessonNamesFromDisk(instrument) {
    var payloadPath = instrument + "/meta/lessons";
    var def = ["defaultLesson1"];

    lessonRepository.getLessonById(payloadPath)
      .then((result) => {
        if (result == undefined) {
          Object.assign(this.lessonNames, def);
        } else {
          Object.assign(this.lessonNames, result);
        }
      })
      .catch((error) => {
        Object.assign(this.lessonNames, def);
      });
  }

  getCombinedVariants(v, v2){
    if (v.length == 0 && v2.length == 0){
      return []
    }else if (v.length != 0 && v2.length == 0){
      return v
    }else if (v.length == 0 && v2.length != 0){
      return v2
    }else{
      variants = []
      for (i = 0; i < v.length; i++) { 
        for (k = 0; k < v2.length; k++) { 
          variants.push(v[i] + "$" + v2[k])
        }
      }
      return variants
    }
  }
  async saveNewLesson(instrument, uniqueLessonName, cri, variants, variants2, goal) {

    let combinedVariants = this.getCombinedVariants(variants,variants2)
    let notes = ["A","Bb","B","C","Db","D","Eb","E","F","Gb","G","Ab"]
    let keys = this.getCombinedVariants(notes,combinedVariants)

    var blankPayload = {
      //this payload represents a save file for a "lessonn
      //it is also the existence indicator for this lesson

      //metadata
      instrument: instrument,
      uniqueLessonName: uniqueLessonName, //shld be instrument unique
      cri: cri,
      visId: "",
      bpm: "",
      goal: goal
    };


    for (i in keys) {
      blankPayload[keys[i]] = []
    }

    var payloadPath =
      "lessonPayloads/" + instrument + "/" + uniqueLessonName + "/payload";

    //alert("saving name to HQ");
    lessonRepository.save(payloadPath, blankPayload);

    var path = instrument + "/meta/lessons";

    this.lessonNames = await this.getLessonNamesByInstrument(instrument);
    this.lessonNames.push(uniqueLessonName);

    //alert(this.lessonNames)
    lessonRepository.save(path, this.lessonNames).then((this.lessonNames = []));
  }

  async getLessonNamesByInstrument(instrument) {
    var path = instrument + "/meta/lessons";
    let lessons = await lessonRepository.getLessonById(path);
    if (lessons == null) {
      return [];
    }
    return lessons;
  }

  getOrderedUniqueLessonNamesByInstr(instrument) {
    return this.lessonNames;
  }

  // INSTRUMENT/LESSON/PAYLOAD.txt
}

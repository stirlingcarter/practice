import { AsyncStorage } from "react-native";


async function retrieveItem(key) {
  // alert("gettinig for " + key)

  try {
    const retrievedItem = await AsyncStorage.getItem(key);
    //alert(JSON.parse(retrievedItem));
    const item = JSON.parse(retrievedItem);
    return item;
  } catch (error) {
    console.log(error.message);
  }
  return;
}

async function destroyItem(key) {
  // alert("gettinig for " + key)

  try {
    await AsyncStorage.removeItem(key);
    const retrievedItem = await AsyncStorage.getItem(key);
    return true;
  } catch (error) {
    return false;
  }
}

async function storeItem(key, item) {

  
  try {
    //we want to wait for the Promise returned by AsyncStorage.setItem()
    //to be resolved to the actual value before returning the value
    var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
    return jsonOfItem;
  } catch (error) {
    console.log(error.message);
  }
}

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
    storeItem(payloadPath, this.payload);
  }

  commit(diff, note) {

    

    this.payload[note].push(diff);

  }

  async deleteLesson(instrument, uniqueLessonName, cb) {
    var payloadPath =
      "lessonPayloads/" + instrument + "/" + uniqueLessonName + "/payload";

    destroyItem(payloadPath);

    var path = instrument + "/meta/lessons";

    this.lessonNames = await this.getLessonNamesByInstrument(instrument);

    this.lessonNames = this.lessonNames.filter((e) => e !== uniqueLessonName);

    await storeItem(path, this.lessonNames);
    cb();
  }

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

    return (ave / d);

  }

  remove(arr,item) {
    var index = arr.indexOf(item);
    if (index !== -1) {
      arr.splice(index, 1);
    }

    return arr;
}

  getSlowestNote(window) {
    let keys = Object.keys(this.payload)

    keys = this.remove(keys,"instrument")
    keys = this.remove(keys,"uniqueLessonName")
    keys = this.remove(keys,"cri")
    keys = this.remove(keys,"visId")
    keys = this.remove(keys,"bpm")

    let maxAverage = 0
    let maxKey = keys[0]
    for (let i = 0; i < keys.length; i++){
      note = keys[i]
      windowedAverage = this.getAverage(window,note)
      if (isNaN(windowedAverage)){
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

  getRandomNote() {
    let keys = Object.keys(this.payload)

    keys = this.remove(keys,"instrument")
    keys = this.remove(keys,"uniqueLessonName")
    keys = this.remove(keys,"cri")
    keys = this.remove(keys,"visId")
    keys = this.remove(keys,"bpm")

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

    retrieveItem(payloadPath)
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

    retrieveItem(payloadPath)
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
  async saveNewLesson(instrument, uniqueLessonName, cri, variants, variants2) {

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
    };


    for (i in keys) {
      blankPayload[keys[i]] = []
    }

    var payloadPath =
      "lessonPayloads/" + instrument + "/" + uniqueLessonName + "/payload";

    //alert("saving name to HQ");
    storeItem(payloadPath, blankPayload);

    var path = instrument + "/meta/lessons";

    this.lessonNames = await this.getLessonNamesByInstrument(instrument);
    this.lessonNames.push(uniqueLessonName);

    //alert(this.lessonNames)
    storeItem(path, this.lessonNames).then((this.lessonNames = []));
  }

  async getLessonNamesByInstrument(instrument) {
    var path = instrument + "/meta/lessons";
    let lessons = await retrieveItem(path);
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

import * as React from "react";
import { TouchableHighlightBase } from "react-native";

async function retrieveItem(key) {
  //alert("gettinig for " + key)

  try {
    const retrievedItem = await AsyncStorage.getItem(key);
    const item = JSON.parse(retrievedItem);
    return item;
  } catch (error) {
    console.log(error.message);
  }
  return;
}

async function storeItem(key, item) {
  alert("savinig for " + key);
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

  mountLesson(instrument, uniqueLessonName) {
    if (
      !(
        instrument == this.payload["instrument"] &&
        uniqueLessonName == this.payload["uniqueLessonName"]
      )
    ) {
      alert(
        "mountng instr/name from " +
          this.payload["instrument"] +
          "/" +
          this.payload["uniqueLessonName"] +
          " to " +
          instrument +
          "/" +
          uniqueLessonName
      );

      this.mountLessonFromDisk(instrument, uniqueLessonName);
    }
  }

  mountLessonNames(instrument, callback) {
    this.mountLessonNamesFromDisk(instrument, callback);
  }

  push(diff) {
    alert("cache received by DB");
  }

  commit(diff, note) {
    //alert("time saved by cache");
    //run the update methods
  }

  //critical data update
  updateBasicTimes(diff, note) {}

  //special model data updates
  updateMAX_MIN_STRAT(diff, note) {}

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

  async mountLessonFromDisk(instrument, uniqueLessonName) {
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
      times_A: [],
      times_Bb: [],
      times_B: [],
      times_C: [],
      times_Db: [],
      times_D: [],
      times_Eb: [],
      times_E: [],
      times_F: [],
      times_Gb: [],
      times_G: [],
      times_Ab: [],
    };

    var payloadPath =
      "lessonPayloads/" + instrument + "/" + uniqueLessonName + "/payload";

    retrieveItem(payloadPath)
      .then((result) => {
        if (result == undefined) {
          Object.assign(this.payload, nonePayload);
        } else {
          Object.assign(this.payload, result);
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

  saveNewLesson(instrument, uniqueLessonName, cri) {
    var blankPayload = {
      //this payload represents a save file for a "lessonn
      //it is also the existence indicator for this lesson

      //metadata
      instrument: instrument,
      uniqueLessonName: uniqueLessonName, //shld be instrument unique
      cri: cri,
      visId: "",
      bpm: "",

      //one source of truth for every strategy
      times_A: [],
      times_Bb: [],
      times_B: [],
      times_C: [],
      times_Db: [],
      times_D: [],
      times_Eb: [],
      times_E: [],
      times_F: [],
      times_Gb: [],
      times_G: [],
      times_Ab: [],
    };

    var payloadPath =
      "lessonPayloads/" + instrument + "/" + uniqueLessonName + "/payload";

    //alert("saving name to HQ");
    storeItem(payloadPath, blankPayload);

    var path = instrument + "/meta/lessons";
    this.lessonNames.push(uniqueLessonName);
    storeItem(path, this.lessonNames);
  }

  getOrderedUniqueLessonNamesByInstr(instrument) {
    return this.lessonNames;
  }

  // INSTRUMENT/LESSON/PAYLOAD.txt
}

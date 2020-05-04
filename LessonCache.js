import * as React from "react";
import { TouchableHighlightBase } from "react-native";
import { AsyncStorage } from "react-native";

// _storeData = async () => {
//   try {
//     await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
//   } catch (error) {
//     // Error saving data
//   }
// };

// _retrieveData = async () => {
//   try {
//     const value = await AsyncStorage.getItem('TASKS');
//     if (value !== null) {
//       // We have data!!
//       alert(value);
//     }
//   } catch (error) {
//     alert("nada")      }
// };

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
  //alert("savinig for " + key);
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

      this.mountLessonFromDisk(instrument, uniqueLessonName);
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
    let timeArrayKey = "times_" + note;

    //this.payload[timeArrayKey].push(diff)

    // if (Array.isArray(this.payload[timeArrayKey])){
    //   this.payload[timeArrayKey] = [diff]
    //   alert(this.payload[timeArrayKey]);
    // }

    this.payload[timeArrayKey].push(diff);

    //alert(this.payload[timeArrayKey]);
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

  getIntRepWithSlowestAve(window) {
    let keys = [
      "times_A",
      "times_Bb",
      "times_B",
      "times_C",
      "times_Db",
      "times_D",
      "times_Eb",
      "times_E",
      "times_F",
      "times_Gb",
      "times_G",
      "times_Ab",
    ];
    let averages = [];
    keys.forEach((key) => {
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

      averages.push(ave / d);
    });
    //alert(averages)

    let ind = 0;
    let max = averages[0];
    for (let i = 1; i < 12; i++) {
      if (averages[i] > max) {
        ind = i;
        max = averages[i];
      } else if (isNaN(averages[i])) {
        // alert(i)
        return i + 1;
      }
    }

    return ind + 1;
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

  async saveNewLesson(instrument, uniqueLessonName, cri) {
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

    this.lessonNames = await this.getLessonNamesByInstrument(instrument);
    this.lessonNames.push(uniqueLessonName);

    //alert(this.lessonNames)
    storeItem(path, this.lessonNames).then((this.lessonNames = []));
    alert("saved");
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

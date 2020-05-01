class LessonCache {
  constructor() {
    if (!LessonCache.instance) {
      this.commit = this.commit.bind(this);
      this.mountLesson = this.mountLesson.bind(this);

      this.getBpm = this.getBpm.bind(this);
      this.getCri = this.getCri.bind(this);
      this.getVisId = this.getVisId.bind(this);

      this.payload = {};

      Object.assign(
        this.payload,
        this.getPayloadByInstrAndLesson("none", "none")
      );

      LessonCache.instance = this;
    }
    return LessonCache.instance;
  }

  //HERES WHERE THE PAYLOAD IS ACTUALLY RETRIEVED
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

      Object.assign(
        this.payload,
        this.getPayloadByInstrAndLesson(instrument, uniqueLessonName)
      );
    }
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

  //JUST FROM LOCAL MEMORY, ALL THIS JAZZ WILL LIVE NI MOUNT OR MEMBERS
  getPayloadByInstrAndLesson(instrument, uniqueLessonName) {
    let dev = true;
    if (dev) {
      return {
        //this payload represents a save file for a lessonn
        //it is also the existence indicator for this lesson

        //meta
        uniqueLessonName: uniqueLessonName, //shld be instrument unique
        cri: "Play each minor7....",
        visId: "sag/fsg/f/sgagrg.jpg",
        bpm: 0,
        instrument: instrument,

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

        //sometimes a model needs its own cache for efficiency
        running_min_A: [],
        running_min_Bb: [],
        running_min_B: [],
        running_min_C: [],
        running_min_Db: [],
        running_min_D: [],
        running_min_Eb: [],
        running_min_E: [],
        running_min_F: [],
        running_min_Gb: [],
        running_min_G: [],
        running_min_Ab: [],
      };
    }
    //TODO not sure how typed JS is, may need intermediate vars

    //LOAD STRING FROM MEM
    //var ansString = os.load(getKeyByInstrAndLesson(instrument,lesson))

    //THEN CONVERT FIRST DIM
    var ansArray = history.split(",");

    //THEN CONVERT SECOND DIM
    for (let i = 0; i < 12; i++) {
      ansArray[i] = ansArray[i].split(",");
    }

    return toArray;
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

  //getMins
  //getAverageByNote(note, window)
}

//CONTAINING ONLY. DUMPS WHEN TOLD TO. YES BOSS
//DOESNT KNOW ABOUT PATHS.
//ONLY KNOWS LESSON META AND OP

const instance = new LessonCache();
Object.freeze(instance);

export default instance;

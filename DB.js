class DB {
  constructor() {
    if (!DB.instance) {
      this.getPayloadByInstrAndLesson = this.getPayloadByInstrAndLesson.bind(
        this
      );

      DB.instance = this;
    }
    return DB.instance;
  }

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

  getFullNoteHistoryByLesson() {
    return this.bpm;
  }

  getCri() {
    return this.cri;
  }

  getVisId() {
    return this.visId;
  }
}

const instance = new DB();
Object.freeze(instance);

export default instance;

//should be called HARD DISK

//HARD DISK.getPayloadByInstr
//HARD DISK.SAVE

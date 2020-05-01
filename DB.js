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
        times_A: [],
        times_A: [],
        times_A: [],
        times_A: [],
        times_A: [],
        times_A: [],
        times_A: [],
        times_A: [],
        times_A: [],
        times_A: [],
        times_A: [],

        //sometimes a model needs its own cache for efficiency
        running_min_A: [],
        running_min_A: [],
        running_min_A: [],
        running_min_A: [],
        running_min_A: [],
        running_min_A: [],
        running_min_A: [],
        running_min_A: [],
        running_min_A: [],
        running_min_A: [],
        running_min_A: [],
        running_min_A: [],
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

//saves LessonCaches. that's it.

const instance = new DB();
Object.freeze(instance);

export default instance;

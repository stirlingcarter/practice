import DB from "./DB";

class LessonCache {
  constructor() {
    if (!LessonCache.instance) {
      this.commit = this.commit.bind(this);
      this.mountLesson = this.mountLesson.bind(this);

      this.getBpm = this.getBpm.bind(this);
      this.getCri = this.getCri.bind(this);
      this.getVisId = this.getVisId.bind(this);

      this.payload = {
        //this payload represents a save file for a lessonn
        //it is also the existence indicator for this lesson

        //meta
        uniqueLessonName: "", //shld be instrument unique
        cri: "Play each minor7....",
        visId: "sag/fsg/f/sgagrg.jpg",
        bpm: 0,
        instrument: "none",

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

      LessonCache.instance = this;
    }
    return LessonCache.instance;
  }

  mountLesson(instrument, uniqueLessonName) {
    if (
      !(
        instrument == this.payload.instrument &&
        uniqueLessonName == this.payload.uniqueLessonName
      )
    ) {
      alert(
        "mountng instr/name from " +
          this.payload.instrument +
          "/" +
          this.payload.uniqueLessonName +
          " to " +
          instrument +
          "/" +
          uniqueLessonName
      );

      Object.assign(
        this.payload,
        DB.getPayloadByInstrAndLesson(instrument, uniqueLessonName)
      );
    }
  }

  push(diff) {
    alert("cache received by DB");
  }

  commit(diff) {
    alert("time received by cache");
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

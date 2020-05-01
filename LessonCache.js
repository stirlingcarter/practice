import DB from "./DB";

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
        DB.getPayloadByInstrAndLesson("none", "none")
      );

      LessonCache.instance = this;
    }
    return LessonCache.instance;
  }

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
        DB.getPayloadByInstrAndLesson(instrument, uniqueLessonName)
      );
    }
  }

  push(diff) {
    alert("cache received by DB");
  }

  commit(diff, note) {
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

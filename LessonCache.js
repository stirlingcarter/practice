export default class LessonCache {
  constructor() {
    this.commit = this.commit.bind(this);
    this.getLessonDescr = this.getLessonDescr.bind(this);

    this.command = "Play";

    this.times = [];

    this.uniqueLessonName = "0";
    this.instrument = "0";
  }

  mountLesson(instrument, uniqueLessonName) {
    alert("mounting lesson from disk");
    this.instrument = instrument;
    this.uniqueLessonName = uniqueLessonName;
  }

  push(diff) {
    alert("cache received by DB");
  }

  commit(diff) {
    alert("time received by cache");
  }

  getLessonDescr() {
    return "mounted value";
  }
}

//CONTAINING ONLY. DUMPS WHEN TOLD TO. YES BOSS
//DOESNT KNOW ABOUT PATHS.
//ONLY KNOWS LESSON META AND OP

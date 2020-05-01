export default class LessonCache {
  constructor() {
    this.commit = this.commit.bind(this);
    this.getLessonDescr = this.getLessonDescr.bind(this);
    this.setSavedFlag = this.setSavedFlag.bind(this);
    var cacheIsSaved = false;
    this.isMounted = false;
    this.command = "Play";

    this.times = [];

    this.uniqueLessonName = "0";
    this.instrument = "0";
  }

  mountLesson(instrument, uniqueLessonName) {

    if (!this.isMounted || 
      !(instrument == this.instrument && 
      uniqueLessonName == this.uniqueLessonName))
       {
      this.instrument = instrument;
      alert("mountng instr/name from " +
      this.instrument + "/" +
       this.uniqueLessonName +  " to " + 
       instrument + "/" +
       uniqueLessonName)

      this.uniqueLessonName = uniqueLessonName;
      this.isMounted = true;
    }
  }

  push(diff) {
    this.setSavedFlag(true);

    alert("cache received by DB");
  }

  setSavedFlag(booleo) {
    this.isSaved = booleo;
  }

  commit(diff) {
    alert("time received by cache");
    this.setSavedFlag(false);
  }

  getLessonDescr() {
    return "mounted value";
  }
}

//CONTAINING ONLY. DUMPS WHEN TOLD TO. YES BOSS
//DOESNT KNOW ABOUT PATHS.
//ONLY KNOWS LESSON META AND OP

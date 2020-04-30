export default class DB {

    constructor(note, bpm, cri, visId) {
      this.note = note;
      this.bpm = bpm;
      this.cri = cri;
      this.visId = visId;
    }
  
    getFullHistoryByInstrAndLesson(instrument,lesson) {
        
        //TODO not sure how typed JS is, may need intermediate vars

        //LOAD STRING FROM MEM
        //var ansString = os.load(getKeyByInstrAndLesson(instrument,lesson))

        //THEN CONVERT FIRST DIM
        var ansArray = history.split(",");

        //THEN CONVERT SECOND DIM
        for (let i = 0; i < 12; i++){
            ansArray[i] = ansArray[i].split(",")
        }
            
        return toArray
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
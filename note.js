export default class Note {
    constructor(note, bpm, cri, visId) {
      this.note = note;
      this.bpm = bpm;
      this.cri = cri;
      this.visId = visId;
    }
  
    getNote() {
      return this.note;
    }
  
    getBpm() {
      return this.bpm;
    }
  
    getCri() {
      return this.cri;
    }
  
    getVisId() {
      return this.visId;
    }
  }
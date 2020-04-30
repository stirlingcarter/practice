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

    getIntRep(){
        if (this.note == "A"){
            return 1
        }

        else if (this.note == "Bb")
            {return 2}
        else if (this.note == "B")
            {return 3}
        else if (this.note == "C"):
            return 4
        else if this.note == "Db":
            return 5
        else if this.note == "D":
            return 6
        else if this.note == "Eb":
            return 7
        else if this.note == "E":
            return 8
        else if this.note == "F":
            return 9
        else if this.note == "Gb":
            return 10
        else if this.note == "G":
            return 11
        else:
            return 12

    }
  }
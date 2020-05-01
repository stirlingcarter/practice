export default class DB {
  constructor(note, bpm, cri, visId) {
    this.note = note;
    this.bpm = bpm;
    this.cri = cri;
    this.visId = visId;
  }

  getHistoryByInstrAndLesson(instrument, lesson) {
    let dev = true;
    if (dev) {
      return [
        [1424],
        [1543],
        [6234],
        [2346],
        [2354],
        [2542],
        [6234],
        [2345],
        [2345],
        [2345],
        [2345],
        [2345],
      ];
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

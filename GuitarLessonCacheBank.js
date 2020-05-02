let none_payload = {
  //this payload represents a save file for a lessonn
  //it is also the existence indicator for this lesson

  //meta
  uniqueLessonName: "n", //shld be instrument unique
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

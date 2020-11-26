import LessonCache from "./LessonCache";

var LC = LessonCache.getInstance();

export default class GraphDAO {
  static instance = null;

  static getInstance() {
    if (HQ.instance == null) {
      HQ.instance = new HQ();
    }





    return this.instance;
  }

    
/* INPUT 
   tags is a list of lists
   [
   [maj7, scales],
   [min7, scales]
   ]


   RETURNS 
   a list of lists 
   [
       [L1,L2,L3],
       [L5,L6,L8,L9] 
   ]
   Where Ln are all lesson paylaods where lesson payload has each tag
*/
  getPayloads(tags) {

  }

/* INPUT 
   a list of lists 
   [
       [L1,L2,L3],
       [L5,L6,L8,L9] 
   ]
   Where Ln are all lesson paylaods where lesson payload has each tag

   RETURNS 
   times 
   [
       [T1,T2,T3],
       [T5,T6,T8,T9] 
   ]
   Where Tn are non-standardized times 
*/
  getTimes(payloads){

  }

  /* INPUT 
   times 
   [
       [T1,T2,T3],
       [T5,T6,T8,T9] 
   ]
   Where Tn are non-standardized time dicts

   RETURNS 
   times 
   [
       [T1,T2,T3],
       [T5,T6,T8,T9] 
   ]
   Where Tn are mutally-standardized time dicts
*/
  getStandardizedTimes(){

  }


/* INPUT 
   times 
   [
       [T1,T2,T3],
       [T5,T6,T8,T9] 
   ]
   Where Tn are mutally-standardized time dicts

   RETURNS 
   times 
   [
       [T1,T2,T3],
       [T5,T6,T8,T9] 
   ]
   Where Tn are mutally-standardized times dicts
*/
  getAverageTimes(){

  }


}

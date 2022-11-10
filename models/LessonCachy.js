export default class LessonCachey {
    static instance = null;
  
    static getInstance() {
      if (LessonCachey.instance == null) {
        LessonCachey.instance = new LessonCachey();
      }
  
      return this.instance;
    }
  
    async getLessonById(id){}
  }
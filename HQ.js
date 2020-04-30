


const DB = new DB(); 
export default class HQ {

    constructor() {
        this.initializeLesson = this.initializeLesson.bind(this);
        this.commit = this.commit.bind(this);

        //per lesson
        this.currentLesson = "example_lesson";
        this.lessonHistory = []; 

        //lesson configs
        var noteChoosers = ["min_max","average","random"];
        var currentNoteChooser = 2;
        var noteChooserFuncs = [this.min_max,this.average,this.random];
        var window = 10 
        var groupsOf = 3;

        //per challenge
        this.note = "A";
        this.noteNum = 1;

        

    }
  
    getNextNote() {

       var picker = noteChooserFuncs[self.currentNoteChooser]; 
        return picker.next()
    }
  
    commit(diff) {

        if (this.isValid(diff)){
            this.lessonHistory[this.noteNum].push(diff)
        }
        alert("diff did not meet criteria")
    }

    isValid(diff) {
       return true; 
    }
  
    initializeLesson(instrument,lesson) {
        this.lessonHistory = DB.getFullHistoryByLesson(); 
        
    }
  }

  class Lesson {


  }
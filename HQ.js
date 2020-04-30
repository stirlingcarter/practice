


const DB = new DB(); 
export default class HQ {

    constructor() {
        this.initializeLesson = this.initializeLesson.bind(this);
        this.commit = this.commit.bind(this);

        //per lesson
        this.currentLesson = "example_lesson";
        this.lessonHistory = []; 

        //lesson configs
        var notePickers = ["min_max","average","random"];
        var currentNoteChooser = 2;
        var noteChooserFuncs = [this.min_max,this.average,this.random];
        var window = 10 
        var groupsOf = 3;

        //per challenge
        this.note = "A";
        this.noteNum = 1;
        
    }

    initializeLesson(instrument,lesson) {
        this.lessonHistory = DB.getFullHistoryByInstrAndLesson(instrument, lesson); 
        
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

    //can be called after any commit. 
    saveLesson(){
        
    }

    getStatsByInstr(instrument) {

        return 1200; 
    }

    isValid(diff) {
        return true; 
     }

  }

  class Lesson {


  }
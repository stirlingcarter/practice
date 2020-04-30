import * as React from "react";

import DB from "./DB";
import { DefaultTheme } from "react-native-paper";



export default class HQ {

    constructor() {
        
        this.initializeLesson = this.initializeLesson.bind(this);
        this.commit = this.getNextNote.bind(this);
        this.commit = this.commit.bind(this);
        this.commit = this.saveLesson.bind(this);
        this.commit = this.getStatsByInstr.bind(this);
        this.commit = this.isValid.bind(this);
        
        this.commit = this.max_min.bind(this);
        this.commit = this.average.bind(this);
        this.commit = this.random.bind(this);



        this.DB = new DB();
    
        //per lesson
        this.currentInstrument = "tuba";
        this.currentLesson = "example_lesson";
        this.lessonHistory = []; 

        //lesson configs
        //Pickers are -functions- that return -notes- using their access to -lessonHistory-. 
        var notePickers = ["min_max","average","random"];
        var currentNotePicker = 2;
        var notePickerFuncs = [this.max_min,this.average,this.random];
        var window = 10 
        var groupsOf = 3;

        //per challenge
        this.note = "A";
        this.noteNum = 1;
        
    }


    initializeLesson(instrument,lesson) {

        this.lessonHistory = this.DB.getHistoryByInstrAndLesson(instrument, lesson); 
        this.currentInstrument = instrument;
        this.currentLesson = lesson;

    }
  
    getNextNote() {

        var picker = notePickerFuncs[this.currentNotePicker]; 
        return picker()
    }
  
    commit(diff) {

        if (this.isValid(diff)){
            this.lessonHistory[this.noteNum].push(diff)
        }else{
            alert("diff did not meet criteria")
        }
    }

    saveLesson(){

        this.DB.replaceHistoryForInstrAndLesson(
            this.currentInstrument, 
            this.currentLesson,
            this.lessonHistory)
        
    }

    getStatsByInstr(instrument) {

        return 1200; 
    }

    isValid(diff) {
        return true; 
    }

    //PICKERS --------------------------------------------------------------------------
    max_min() {
        return "A"
    }

    average() {
        return "B"
    }

    random() {
        return "B"
    }
    //END PICKERS --------------------------------------------------------------------------



    
  }


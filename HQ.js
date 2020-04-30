import * as React from "react";

import DB from "./DB";
import Note from "./note";

import { DefaultTheme } from "react-native-paper";



export default class HQ {

    constructor() {
        
        this.initializeLesson = this.initializeLesson.bind(this);
        this.getNextNote = this.getNextNote.bind(this);
        this.commit = this.commit.bind(this);
        this.saveLesson = this.saveLesson.bind(this);
        this.getInstrumentNames = this.getInstrumentNames.bind(this);
        this.cogetStatsByInstrmmit = this.getStatsByInstr.bind(this);
        this.isValid = this.isValid.bind(this);

        
        this.max_min = this.max_min.bind(this);
        this.average = this.average.bind(this);
        this.random = this.random.bind(this);



        this.DB = new DB();
    
        //per lesson
        this.currentInstrument = "tuba";
        this.currentLesson = "example_lesson";
        this.lessonHistory = []; 

        //lesson configs
        //Pickers are -functions- that return -notes- using their access to -lessonHistory-. 
        var strategies = ["max_min","average","random"];
        var strategyId = 2;
        var window = 10 
        var groupsOf = 3;

        //per challenge
        this.currentNote = this.getNextNote();        
    }


    initializeLesson(instrument,lesson) {

        this.lessonHistory = this.DB.getHistoryByInstrAndLesson(instrument, lesson); 
        this.currentInstrument = instrument;
        this.currentLesson = lesson;

    }
  
    getNextNote() {

        return this.getNextNoteByStrategy(this.strategyId); 
        
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

    getInstrumentNames(){
        var names = ["guitar", "piano"];
        return names;
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

        let newNote = new Note("BB", 0, "whatever", "aM_pic.jpg")
        this.currentNote = newNote; 
        
        return newNote

    }
    //END PICKERS --------------------------------------------------------------------------

    getNextNoteByStrategy(strategyId){
        if (strategyId == 0){
            return this.max_min()
        }else if (strategyId == 1){
            return this.average()
        }else {
            return this.random()
        }
    }

    
  }


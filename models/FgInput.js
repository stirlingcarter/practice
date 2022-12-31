import Constants from "../constant/Constants";

export default class FgInput {

    notes = [];
    intervals = [];
    scales = [];
    scalePerms = [];
    chords = [];
    chordInversions = [];
    scalesBPM = Constants.DEFAULT_BPM;
    chordsBPM = Constants.DEFAULT_BPM;
    arpsBPM = Constants.DEFAULT_BPM;
    isChordal = false;
    instrument = '';

    constructor(notes,intervals,scales,scalePerms,chords,chordInversions,scalesBPM,chordsBPM,arpsBPM,isChordal,instrument){
        this.notes = notes;
        this.intervals = intervals;
        this.scales = scales;
        this.scalePerms = scalePerms;
        this.chords = chords;
        this.chordInversions = chordInversions;
        this.scalesBPM = scalesBPM;
        this.chordsBPM = chordsBPM;
        this.arpsBPM = arpsBPM;
        this.isChordal = isChordal;
        this.instrument = instrument;
    }

    getNotes(){
        return this.notes;
    }

    getIntervals(){
        return this.intervals;
    }   

    getScales(){
        return this.scales;
    }

    getScalePermutations(){
        return this.scalePerms;
    }

    getChords(){
        return this.chords;
    }

    getChordInversions(){
        return this.chordInversions;
    }

    getScalesBPM(){
        return this.scalesBPM;
    }

    getChordsBPM(){
        return this.chordsBPM;
    }

    getArpsBPM(){
        return this.arpsBPM;
    }

    getIsChordal(){
        return this.isChordal;
    }

    getInstrument(){
        return this.instrument;
    }

}
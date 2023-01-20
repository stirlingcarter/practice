import Constants from "../constant/Constants";

export default class FgInput {

    notes = [];
    scales = [];
    scalePerms = [];
    chords = [];
    scalesBPM = Constants.DEFAULT_BPM;
    chordsBPM = Constants.DEFAULT_BPM;
    arpsBPM = Constants.DEFAULT_BPM;
    isChordal = false;
    instrument = '';

    constructor(notes,scales,scalePerms,chords,scalesBPM,chordsBPM,arpsBPM,isChordal,instrument){
        this.notes = notes;
        this.scales = scales;
        this.scalePerms = scalePerms;
        this.chords = chords;
        this.scalesBPM = scalesBPM;
        this.chordsBPM = chordsBPM;
        this.arpsBPM = arpsBPM;
        this.isChordal = isChordal;
        this.instrument = instrument;
    }

    getNotes(){
        return this.notes;
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
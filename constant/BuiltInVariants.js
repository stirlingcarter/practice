import BuiltInVariant from "../models/BuiltInVariant";
import { MMKV } from "react-native-mmkv";

export default class BuiltInVariants {

    static PATH = "CUSTOM_VARIANTS"
    static INTERVALS = "Intervals"
    static CHORDS = "Chords"
    static SCALES = "Scales"
    static INVERSIONS = "Inversions"
    static TRAVERSALS = "Traversals"
    static STRINGS = "Strings"
    static CUSTOM = "Custom"

    static storage = new MMKV({
        id: "BuiltInVariants"
    })

    static chordVariants = [

        new BuiltInVariant("min triad", this.CHORDS),
        new BuiltInVariant("maj triad", this.CHORDS),
        new BuiltInVariant("dom triad", this.CHORDS),
        new BuiltInVariant("min6", this.CHORDS),
        new BuiltInVariant("maj6", this.CHORDS),
        new BuiltInVariant("min7", this.CHORDS),
        new BuiltInVariant("maj7", this.CHORDS),
        new BuiltInVariant("7", this.CHORDS),
        new BuiltInVariant("dim", this.CHORDS),
        new BuiltInVariant("half dim", this.CHORDS),
        new BuiltInVariant("7#5#9", this.CHORDS),
        new BuiltInVariant("7#9", this.CHORDS),
        new BuiltInVariant("7#5", this.CHORDS),//thelonious chord lol
        new BuiltInVariant("7#11", this.CHORDS)
    ]

    static intervalVariants = [

        new BuiltInVariant("2nd", this.INTERVALS),
        new BuiltInVariant("minor 3rd", this.INTERVALS),
        new BuiltInVariant("major 3rd", this.INTERVALS),
        new BuiltInVariant("4th", this.INTERVALS),
        new BuiltInVariant("5th", this.INTERVALS),
        new BuiltInVariant("minor 6th", this.INTERVALS),
        new BuiltInVariant("major 6th", this.INTERVALS),
        new BuiltInVariant("minor 7th", this.INTERVALS),
        new BuiltInVariant("major 7th", this.INTERVALS),
        new BuiltInVariant("9th", this.INTERVALS),
        new BuiltInVariant("minor 10th", this.INTERVALS),
        new BuiltInVariant("major 10th", this.INTERVALS),
        new BuiltInVariant("11th", this.INTERVALS),
        new BuiltInVariant("12th", this.INTERVALS),
        new BuiltInVariant("minor 13th", this.INTERVALS),
        new BuiltInVariant("major 13th", this.INTERVALS),
        new BuiltInVariant("octave", this.INTERVALS)
    ]

    static scaleVariants = [

        new BuiltInVariant("major", this.SCALES),
        new BuiltInVariant("minor", this.SCALES),
        new BuiltInVariant("ionian", this.SCALES),
        new BuiltInVariant("dorian", this.SCALES),
        new BuiltInVariant("phrygian", this.SCALES),
        new BuiltInVariant("lydian", this.SCALES),
        new BuiltInVariant("mixolydian", this.SCALES),
        new BuiltInVariant("aeolian", this.SCALES),
        new BuiltInVariant("locrian", this.SCALES),
        new BuiltInVariant("melodic minor", this.SCALES),
        new BuiltInVariant("diminished", this.SCALES),
        new BuiltInVariant("half diminished", this.SCALES),
        new BuiltInVariant("chromatic", this.SCALES),
        new BuiltInVariant("pentatonic", this.SCALES),
        new BuiltInVariant("major bebop", this.SCALES),
        new BuiltInVariant("minor bebop", this.SCALES)
    ]

    static inversionVariants = [
        new BuiltInVariant("root", this.INVERSIONS),
        new BuiltInVariant("1st", this.INVERSIONS),
        new BuiltInVariant("2nd", this.INVERSIONS),
        new BuiltInVariant("3rd", this.INVERSIONS),
        new BuiltInVariant("4th", this.INVERSIONS),
        new BuiltInVariant("5th", this.INVERSIONS),
        new BuiltInVariant("6th", this.INVERSIONS)
    ]

    static traversalVariants = [
        new BuiltInVariant("ascending", this.TRAVERSALS),
        new BuiltInVariant("descending", this.TRAVERSALS),
        new BuiltInVariant("asc/desc", this.TRAVERSALS),
        new BuiltInVariant("diatonic 2nds", this.TRAVERSALS),
        new BuiltInVariant("diatonic 3rds", this.TRAVERSALS),
        new BuiltInVariant("diatonic 4ths", this.TRAVERSALS),
        new BuiltInVariant("diatonic 5ths", this.TRAVERSALS),
        new BuiltInVariant("diatonic 6ths", this.TRAVERSALS),
        new BuiltInVariant("diatonic 7ths", this.TRAVERSALS),
        new BuiltInVariant("octaves", this.TRAVERSALS),
    ]

    static stringVariants = [
        new BuiltInVariant("1st/highest", this.STRINGS),
        new BuiltInVariant("2nd", this.STRINGS),
        new BuiltInVariant("3rd", this.STRINGS),
        new BuiltInVariant("4th", this.STRINGS),
        new BuiltInVariant("5th", this.STRINGS),
        new BuiltInVariant("6th", this.STRINGS),
        new BuiltInVariant("7th", this.STRINGS),
        new BuiltInVariant("8th", this.STRINGS)
    ]

    static saveNewCustomVariantByName(name){
        let current = this.getCustomVariants()
        
        if (current == undefined || current.length == 0){
            current = [
                name
            ]
        }else{
            
            current.push(name)
        }
    
        try {
            this.storage.set(BuiltInVariants.PATH, JSON.stringify(current));
        } catch (error) {
            alert("error saving builtin variant: " + error.message)
        }
        return null
    }

    static deleteCustomVariantByName(name){
        let current = this.getCustomVariants()
        if (current == undefined){
            alert("wtf u deleting")
        }
        let index = current.indexOf(name)
        if (index == -1){
            return null
        }
        current.splice(index, 1)
        try {
            this.storage.set(BuiltInVariants.PATH, JSON.stringify(current));
        } catch (error) {
            alert("error deleting builtin variant: " + error.message);
        }
        return null
    }

    static getCustomVariants(){
        try {
            let retrievedItem = this.storage.getString(BuiltInVariants.PATH)

            if (retrievedItem == undefined){
                alert("error: no BIVs")
                return [];
            }

            let BIVS = JSON.parse(retrievedItem)
            if (BIVS == null){
                alert("error: no BIVS")
            }
            return BIVS;
        } catch (error) {
            alert("error getting variants: " + error.message);
            return error.message
        }

    }


    static getAllGroups(){
        let cv = this.getCustomVariants()
        return {
            CUSTOM : cv == undefined ? [new BuiltInVariant("test", this.CUSTOM)] : cv.map(name => new BuiltInVariant(name, this.CUSTOM)),
            CHORDS : this.chordVariants,
            INTERVALS : this.intervalVariants,
            SCALES : this.scaleVariants,
            INVERSIONS : this.inversionVariants,
            TRAVERSALS : this.traversalVariants,
            STRINGS : this.stringVariants,
        }
    }

}


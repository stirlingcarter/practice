import BuiltInVariant from "../models/BuiltInVariant";
import { MMKV } from "react-native-mmkv";
import { elementsThatOverlapOffsets } from "react-native/Libraries/Lists/VirtualizeUtils";
import { customVariantSetRepository } from "../App";

export default class BuiltInVariants {

    static INTERVALS = "Intervals"
    static CHORDS = "Chords"
    static PERMUTATIONS = "Permutations"
    static SCALES = "Scales"
    static INVERSIONS = "Inversions"
    static TRAVERSALS = "Traversals"
    static STRINGS = "Strings"
    static CUSTOM = "Custom"

    static NOTES = "Notes"
    static ARPEGGIOS = "Arpeggios"

    static VALID_CATEGORIES = [this.INTERVALS, this.CHORDS, this.PERMUTATION_VARIANTS, this.SCALES, this.INVERSIONS, this.TRAVERSALS, this.STRINGS]

    static CHORD_VARIANTS = [

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

    static PERMUTATION_VARIANTS = [
        new BuiltInVariant("1234567", this.PERMUTATIONS)
    ]

    static INTERVAL_VARIANTS = [

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

    static SCALE_VARIANTS = [

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

    static INVERSION_VARIANTS = [
        new BuiltInVariant("root", this.INVERSIONS),
        new BuiltInVariant("1st", this.INVERSIONS),
        new BuiltInVariant("2nd", this.INVERSIONS),
        new BuiltInVariant("3rd", this.INVERSIONS),
        new BuiltInVariant("4th", this.INVERSIONS),
        new BuiltInVariant("5th", this.INVERSIONS),
        new BuiltInVariant("root sub 9", this.INVERSIONS),
        new BuiltInVariant("1st sub 9", this.INVERSIONS),
        new BuiltInVariant("2nd sub 9", this.INVERSIONS),
        new BuiltInVariant("3rd sub 9", this.INVERSIONS),
        new BuiltInVariant("4th sub 9", this.INVERSIONS),
        new BuiltInVariant("5th sub 9", this.INVERSIONS)
    ]

    static TRAVERSAL_VARIANTS = [
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

    static STRING_VARIANTS = [
        new BuiltInVariant("1st/highest", this.STRINGS),
        new BuiltInVariant("2nd", this.STRINGS),
        new BuiltInVariant("3rd", this.STRINGS),
        new BuiltInVariant("4th", this.STRINGS),
        new BuiltInVariant("5th", this.STRINGS),
        new BuiltInVariant("6th", this.STRINGS),
        new BuiltInVariant("7th", this.STRINGS),
        new BuiltInVariant("8th", this.STRINGS)
    ]

    static getBIV(category){
        switch(category){
            case this.CHORDS:
                return this.CHORD_VARIANTS;
            case this.INTERVALS:
                return this.INTERVAL_VARIANTS;
            case this.PERMUTATIONS:
                return this.PERMUTATION_VARIANTS;
            case this.SCALES:
                return this.SCALE_VARIANTS;
            case this.INVERSIONS:
                return this.INVERSION_VARIANTS;
            case this.TRAVERSALS:
                return this.TRAVERSAL_VARIANTS;  
            case this.STRINGS:  
                return this.STRING_VARIANTS;
            default:
                return null;
        }
    }


    static getAllGroups(){
        let cv = this.getCustomVariants()
        return {
            CUSTOM : cv == undefined ? [new BuiltInVariant("test", this.CUSTOM)] : cv.map(name => new BuiltInVariant(name, this.CUSTOM)),
            CHORDS : this.CHORD_VARIANTS,
            INTERVALS : this.INTERVAL_VARIANTS,
            PERMUTATIONS: this.PERMUTATION_VARIANTS,
            SCALES : this.SCALE_VARIANTS,
            INVERSIONS : this.INVERSION_VARIANTS,
            TRAVERSALS : this.TRAVERSAL_VARIANTS,
            STRINGS : this.STRING_VARIANTS,
        }
    }

}


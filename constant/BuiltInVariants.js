import BuiltInVariant from "../models/BuiltInVariant";

export default class BuiltInVariants {

    static INTERVALS = "Intervals"
    static CHORDS = "Chords"
    static SCALES = "Scales"
    static INVERSIONS = "Inversions"
    static TRAVERSALS = "Traversals"
    static STRINGS = "Strings"
    
    static chordVariants = [

        new BuiltInVariant("min triad", CHORDS),
        new BuiltInVariant("maj triad", CHORDS),
        new BuiltInVariant("dom triad", CHORDS),
        new BuiltInVariant("min6", CHORDS),
        new BuiltInVariant("maj6", CHORDS),
        new BuiltInVariant("min7", CHORDS),
        new BuiltInVariant("maj7", CHORDS),
        new BuiltInVariant("7", CHORDS),
        new BuiltInVariant("dim", CHORDS),
        new BuiltInVariant("half dim", CHORDS),
        new BuiltInVariant("7#5#9", CHORDS),
        new BuiltInVariant("7#9", CHORDS),
        new BuiltInVariant("7#5", CHORDS),//thelonious chord lol
        new BuiltInVariant("7#11", CHORDS)
    ]

    static intervalVariants = [

        new BuiltInVariant("2nd", INTERVALS),
        new BuiltInVariant("minor 3rd", INTERVALS),
        new BuiltInVariant("major 3rd", INTERVALS),
        new BuiltInVariant("4th", INTERVALS),
        new BuiltInVariant("5th", INTERVALS),
        new BuiltInVariant("minor 6th", INTERVALS),
        new BuiltInVariant("major 6th", INTERVALS),
        new BuiltInVariant("minor 7th", INTERVALS),
        new BuiltInVariant("major 7th", INTERVALS),
        new BuiltInVariant("9th", INTERVALS),
        new BuiltInVariant("minor 10th", INTERVALS),
        new BuiltInVariant("major 10th", INTERVALS),
        new BuiltInVariant("11th", INTERVALS),
        new BuiltInVariant("12th", INTERVALS),
        new BuiltInVariant("minor 13th", INTERVALS),
        new BuiltInVariant("major 13th", INTERVALS),
        new BuiltInVariant("octave", INTERVALS)
    ]

    static scaleVariants = [

        new BuiltInVariant("major", SCALES),
        new BuiltInVariant("minor", SCALES),
        new BuiltInVariant("ionian", SCALES),
        new BuiltInVariant("dorian", SCALES),
        new BuiltInVariant("phrygian", SCALES),
        new BuiltInVariant("lydian", SCALES),
        new BuiltInVariant("mixolydian", SCALES),
        new BuiltInVariant("aeolian", SCALES),
        new BuiltInVariant("locrian", SCALES),
        new BuiltInVariant("melodic minor", SCALES),
        new BuiltInVariant("diminished", SCALES),
        new BuiltInVariant("half diminished", SCALES),
        new BuiltInVariant("chromatic", SCALES),
        new BuiltInVariant("pentatonic", SCALES),
        new BuiltInVariant("major bebop", SCALES),
        new BuiltInVariant("minor bebop", SCALES)
    ]

    static inversionVariants = [
        new BuiltInVariant("root", INVERSIONS),
        new BuiltInVariant("1st", INVERSIONS),
        new BuiltInVariant("2nd", INVERSIONS),
        new BuiltInVariant("3rd", INVERSIONS),
        new BuiltInVariant("4th", INVERSIONS),
        new BuiltInVariant("5th", INVERSIONS),
        new BuiltInVariant("6th", INVERSIONS)
    ]

    static traversalVariants = [
        new BuiltInVariant("ascending", TRAVERSALS),
        new BuiltInVariant("descending", TRAVERSALS),
        new BuiltInVariant("asc/desc", TRAVERSALS),
        new BuiltInVariant("diatonic 2nds", TRAVERSALS),
        new BuiltInVariant("diatonic 3rds", TRAVERSALS),
        new BuiltInVariant("diatonic 4ths", TRAVERSALS),
        new BuiltInVariant("diatonic 5ths", TRAVERSALS),
        new BuiltInVariant("diatonic 6ths", TRAVERSALS),
        new BuiltInVariant("diatonic 7ths", TRAVERSALS),
        new BuiltInVariant("octaves", TRAVERSALS),
    ]

    static stringVariants = [
        new BuiltInVariant("1st/highest", STRINGS),
        new BuiltInVariant("2nd", STRINGS),
        new BuiltInVariant("3rd", STRINGS),
        new BuiltInVariant("4th", STRINGS),
        new BuiltInVariant("5th", STRINGS),
        new BuiltInVariant("6th", STRINGS),
        new BuiltInVariant("7th", STRINGS),
        new BuiltInVariant("8th", STRINGS)
    ]

}


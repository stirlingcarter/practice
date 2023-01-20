import BuiltInVariants from "./BuiltInVariants";

export default class Constants {

    static HEAD_GROUP_NAME = "Instruments"
    static HEAD_GROUP_PATH = "Instruments"

    static COLORS = ["pink", "blue", "purple", "orange", "red", "green", "violet", "navy", "magenta", "tomato", "gold", "darkgreen"]

    static CHORDAL_INSTRUMENTS = ['piano', 'guitar']
    static DEFAULT_BPM = 120;
    static ALL_NOTES = ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"]
    static DEFAULT_BPM_GOAL = 120
    static LESSON_TYPE_TIMED = "timed"
    static LESSON_TYPE_TRIES = "tries"
    static VALID_CHALLENGE_MODES = [this.LESSON_TYPE_TIMED, this.LESSON_TYPE_TRIES]
    static VALID_INSTRUMENTS = ["Piano", "Guitar", "Sax"]
    static STRINGSET_GUITAR = ["1st/highest", "2nd", "3rd", "4th", "5th", "6th"]
    static ALL_INTERVALS = ["minor 2nd", "major 2nd", "minor 3rd", "major 3rd", "perfect 4th", "tritone", "perfect 5th", "minor 6th", "major 6th", "minor 7th", "major 7th", "octave"]
    static DIATONIC_INTERVALS = ["2nd", "3rd", "4th", "5th", "6th", "7th", "octave"]
    static CHORDS_3 = ["major", "minor"]

    static ASC_DESC = ["ascending", "descending"]

    static INTERVALS = "Intervals"
    static CHORDS = "Chords"
    static PERMUTATIONS = "Permutations"
    static SCALES = "Scales"
    static INVERSIONS = "Inversions"
    static TRAVERSALS = "Traversals"
    static STRINGS = "Strings"

    static NOTES = "Notes"
    static ARPEGGIOS = "Arpeggios"
    static VALID_CATEGORIES = [this.INTERVALS, this.CHORDS, this.PERMUTATIONS, this.SCALES, this.INVERSIONS, this.TRAVERSALS, this.STRINGS]

    static GUITAR_INVERSIONS_3 = BuiltInVariants.GUITAR_INVERSION_VARIANT_NAMES.slice(0, 3)
    static GUITAR_INVERSIONS_4 = BuiltInVariants.GUITAR_INVERSION_VARIANT_NAMES.slice(3)
    static DEFAULT_STARTING_BPM = 60

    static TIMES_WINDOW_SIZE = 10

    static PRESET_FOUNDATIONS = {
        selectedScales: [BuiltInVariants.MAJOR, BuiltInVariants.CHROMATIC], // major
        selectedScalePermutations: [BuiltInVariants.IONIAN],
        selectedChords: [BuiltInVariants.MIN_TRIAD, BuiltInVariants.MAJ_TRIAD],
        selectedChordInversions: false,
        scalesBpm: "60",
        chordsBpm: "45", //chords get ha;f treatment
        arpsBpm: "60", 
    }

    static PRESET_FAMILIARITY = {
        selectedScales: [BuiltInVariants.MAJOR, BuiltInVariants.MINOR, BuiltInVariants.DIMINISHED, BuiltInVariants.CHROMATIC], // major
        selectedScalePermutations: [BuiltInVariants.IONIAN, BuiltInVariants.BASIC_PERM],
        selectedChords: [BuiltInVariants.MIN_TRIAD, BuiltInVariants.MAJ_TRIAD, BuiltInVariants.DIM_TRIAD, BuiltInVariants.AUG_TRIAD, BuiltInVariants.MIN7, BuiltInVariants.MAJ7, BuiltInVariants.DOM7, BuiltInVariants.DIM],
        selectedChordInversions: true,
        scalesBpm: "90",
        chordsBpm: "80",
        arpsBpm: "90", 
    }

    static PRESET_NUANCE = {
        selectedScales: [BuiltInVariants.MAJOR, BuiltInVariants.MINOR, BuiltInVariants.DIMINISHED, BuiltInVariants.CHROMATIC, BuiltInVariants.HARMONIC_MINOR, BuiltInVariants.PENTATONIC], // major
        selectedScalePermutations: [
            BuiltInVariants.IONIAN,
            BuiltInVariants.DORIAN,
            BuiltInVariants.PHRYGIAN,
            BuiltInVariants.LYDIAN,
            BuiltInVariants.MIXOLYDIAN,
            BuiltInVariants.AEOLIAN,
            BuiltInVariants.LOCRIAN,
            BuiltInVariants.BASIC_PERM],
        selectedChords: [        
            BuiltInVariants.MIN_TRIAD,
            BuiltInVariants.MAJ_TRIAD,
            BuiltInVariants.DOM_TRIAD,
            BuiltInVariants.MIN7,
            BuiltInVariants.MAJ7,
            BuiltInVariants.DOM7,
            BuiltInVariants.DIM,
            BuiltInVariants.HALF_DIM,
            BuiltInVariants.AUG,
            BuiltInVariants.DOM7_SHARP_5_SHARP_9,
            BuiltInVariants.DOM7_SHARP_9,
            BuiltInVariants.DOM7_SHARP_5,
            BuiltInVariants.DOM7_SHARP_11],
        selectedChordInversions: true,
        scalesBpm: "200",
        chordsBpm: "120",
        arpsBpm: "200", 
    }

}   
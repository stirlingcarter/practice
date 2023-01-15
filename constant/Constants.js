export default class Constants {

    static HEAD_GROUP_NAME = "Instruments"
    static HEAD_GROUP_PATH = "Instruments"

    static COLORS = ["pink", "blue", "purple", "orange", "red", "green", "violet", "navy", "magenta", "tomato", "gold", "darkgreen"]

    static CHORDAL_INSTRUMENTS = ['piano', 'guitar']
    static DEFAULT_BPM = 120;
    static ALL_NOTES = ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"]
    
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

    static DEFAULT_STARTING_BPM = 60

    static TIMES_WINDOW_SIZE = 10
}   
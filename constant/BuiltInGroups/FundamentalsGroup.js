import Group from "../../models/Group"
import Lesson from "../../models/Lesson"
import Util from "../../services/Util"

export default class FundamentalsGroup {

    static GROUP_NAME = "Fundamentals"

    static NOTES = "Notes"
    static NOTES_CRITERIA = "Play the note everywhere it occurs on the given string"
    static NOTES_LESSON_NAMES = [FundamentalsGroup.FIRST_STRING, FundamentalsGroup.SECOND_STRING, FundamentalsGroup.THIRD_STRING, FundamentalsGroup.FOURTH_STRING, FundamentalsGroup.FIFTH_STRING, FundamentalsGroup.SIXTH_STRING]
    static NOTES_GOAL = 1
    static FIRST_STRING = "1st string (high)"
    static SECOND_STRING = "2nd string"
    static THIRD_STRING = "3rd string"
    static FOURTH_STRING = "4th string"
    static FIFTH_STRING = "5th string"
    static SIXTH_STRING = "6th string"

    static INTERVALS = "Intervals"
    static INTERVALS_CRITERIA = "Play the note everywhere it occurs on the fretboard, plus the interval using the next 1-2 strings (or previous if nec.)"
    static INTERVALS_LESSON_NAMES = [FundamentalsGroup.DIATONIC_2ND, FundamentalsGroup.DIATONIC_3RD, FundamentalsGroup.DIATONIC_4TH, FundamentalsGroup.DIATONIC_5TH, FundamentalsGroup.DIATONIC_6TH, FundamentalsGroup.DIATONIC_7TH, FundamentalsGroup.OCTAVE]
    static INTERVALS_GOAL = 2
    static DIATONIC_2ND = "diatonic 2nd"
    static DIATONIC_3RD = "diatonic 3rd"
    static DIATONIC_4TH = "diatonic 4th"
    static DIATONIC_5TH = "diatonic 5th"
    static DIATONIC_6TH = "diatonic 6th"
    static DIATONIC_7TH = "diatonic 7th"
    static OCTAVE = "octave"



    static CHORDS = "Chords"
    static SCALES = "Scales"
    static TRIADS = "Triads"

    PARENT_LEVEL = 0

    getHeadGroup(parentLevel) {
        this.PARENT_LEVEL = parentLevel
        return FundamentalsGroup.fundamentals
    }

    static fundamentals = new Group(FundamentalsGroup.GROUP_NAME,"The thorough foundation of bedrock needed for mastery",[],["notes","intervals","triads","scales"],FundamentalsGroup.PARENT_LEVEL+1)

    static notes = new Group(FundamentalsGroup.NOTES, "master every note on the fret board", FundamentalsGroup.NOTES_LESSON_NAMES, [], FundamentalsGroup.NOTES_GROUP_LEVEL)
    static notesLessons = Util.copyOf(FundamentalsGroup.NOTES_LESSON_NAMES).map(name => new Lesson(name, FundamentalsGroup.NOTES_CRITERIA, FundamentalsGroup.GROUP_NAME, FundamentalsGroup.NOTES_GOAL ))

    static intervals = new Group("intervals","",["diatonic 2nd","diatonic 3rd","diatonic 4th","diatonic 5th","diatonic 6th","diatonic 7th","octave"],[],FundamentalsGroup.INTERVALS_GROUP_LEVEL)
    static intervalsLessons = Util.copyOf(FundamentalsGroup.INTERVALS_LESSON_NAMES).map(name => new Lesson(name, FundamentalsGroup.INTERVALS_CRITERIA, FundamentalsGroup.GROUP_NAME, FundamentalsGroup.INTERVALS_GOAL ))

    static triads = new Group("triads", "", ["minor triads", "maj triads"], [], FundamentalsGroup.TRIADS_GROUP_LEVEL)

    static scales = new Group("scales","",["major","pentatonic"],[],FundamentalsGroup.SCALES_GROUP_LEVEL)






}
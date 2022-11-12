import Group from "../models/Group"
import Lesson from "../models/Lesson"

export default class BuiltInGroups {


    static INTERVALS = "Intervals"
    static CHORDS = "Chords"
    static SCALES = "Scales"
    static INVERSIONS = "Inversions"
    static TRAVERSALS = "Traversals"
    // (lessons, templates)


    static notes = new Group(
        "notes",
        "note id",
        [   
            "1st/highest str",
            "2nd str",
            "3rd str",
            "4th str",
            "5th str", //-> these are lesson names lol. define above
            "6th str"
        ],
        [],
        2
    )

    static triads = new Group(
        "triads",
        "",
        [   
            "minor triads",
            "maj triads"
        ],
        [],
        2
    )

    static scales = new Group(
        "scales",
        "",
        [
            "major",
            "pentatonic"
        ],
        [],
        2
    )

    static intervals = new Group(
        "intervals",
        "",
        [
            "diatonic 2nd",
            "diatonic 3rd",
            "diatonic 4th",
            "diatonic 5th",
            "diatonic 6th",
            "diatonic 7th",
            "octave"
        ],
        [],
        2
    )

    static fundamentals = new Group(
        "Fundamentals",
        "The thorough foundation of bedrock needed for mastery",
        [],
        [
            "notes", 
            "intervals", 
            "triads", 
            "scales"
        ],
        1
    )

}
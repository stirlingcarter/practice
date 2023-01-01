import { groupRepository, lessonRepository } from "../App";
import BuiltInVariant from "./BuiltInVariant";
import BuiltInVariants from "../constant/BuiltInVariants";
import Constants from "../constant/Constants";
import Path from "../services/Path";
import Group from "./Group";
import Lesson from "./Lesson";




export default class FluencyGen {

    fgInput = null;

    name = null;
    hasRun = false;
    INSTRUMENT_ROOT = null;
    FLUENCY_ROOT = null;
    NOTES_LEVEL = null;
    CHORDS_LEVEL = null;
    ARPS_LEVEL = null;
    INTERVALS_LEVEL = null;
    SCALES_LEVEL = null;

    constructor(fgInput) {
        this.fgInput = fgInput;
        this.INSTRUMENT_ROOT = 'Instruments/' + fgInput.getInstrument();

        let currentGroupNames = groupRepository.getGroupNamesByGroupPath(this.INSTRUMENT_ROOT)
        let cand = "Fluency"
        let i = 1;
        while (currentGroupNames.includes(cand)) {
            cand = "Fluency" + i;
            i++;
        }
        this.name = cand;

        this.FLUENCY_ROOT = Path.plus(this.INSTRUMENT_ROOT, this.name);

        this.NOTES_LEVEL = Path.plus(this.FLUENCY_ROOT, Constants.NOTES)
        this.CHORDS_LEVEL = Path.plus(this.FLUENCY_ROOT, Constants.CHORDS)
        this.ARPS_LEVEL = Path.plus(this.FLUENCY_ROOT, Constants.ARPEGGIOS)
        this.INTERVALS_LEVEL = Path.plus(this.FLUENCY_ROOT, Constants.INTERVALS)
        this.SCALES_LEVEL = Path.plus(this.FLUENCY_ROOT, Constants.SCALES)
    }

    generateGroups() {
        let groups = []

        try {
            let notesGroup = this.generateNotesGroup()
            if (notesGroup != null) {
                groups.push(notesGroup)
            }
        } catch (e) {
            alert("error generating NotesGroup: " + e.message)
        }

        try {
            let chordsGroup = this.generateChordsGroup()
            if (chordsGroup != null) {
                groups.push(chordsGroup)
            }
        } catch (e) {
            alert("error generating ChordsGroup: " + e.message)
        }

        try {
            let arpsGroup = this.generateArpsGroup()
            if (arpsGroup != null) {
                groups.push(arpsGroup)
            }
        } catch (e) {
            alert("error generating ArpsGroup " + e.message)
        }

        try {
            let intervalsGroup = this.generateIntervalsGroup()
            if (intervalsGroup != null) {
                groups.push(intervalsGroup)
            }
        } catch (e) {
            alert("error generating IntervalsGroup " + e.message)
        }

        try {
            let scalesGroup = this.generateScalesGroup()
            if (scalesGroup != null) {
                groups.push(scalesGroup)
            }
        } catch (e) {
            alert("error generating ScalesGroup " + e.message)
        }
        groups.forEach(g => alert(g.toString()))

        try {
            let group = new Group(this.name, 'Fluency course', [], groups.map(g => g.getName()), this.FLUENCY_ROOT)
            groupRepository.save(group)
            let parentGroup = groupRepository.getGroupByPath(this.INSTRUMENT_ROOT)
            parentGroup.addGroupName(group.getName())
            groupRepository.save(parentGroup)
        } catch (e) {
            alert("error saving group " + e.message)
        }
        

        this.hasRun = true;
    }

    generateNotesGroup() {
        let notes = this.fgInput.getNotes();
        let description = 'Notes fluency'
        let lessons = this.generateLessonsForNotes(this.fgInput.getInstrument(), notes)
        let group = new Group(Constants.NOTES, description, lessons.map(l => l.getName()), [], this.NOTES_LEVEL)
        groupRepository.save(group)
        lessons.forEach(l => lessonRepository.save(l))
        return group;
    }

    generateLessonsForNotes(instrument, notes) {
        let lessonName = 'Notes competency'
        let criteria = 'Play the note everywhere it occurs on the instrument'
        let goal = 1
        let v = []
        let v2 = []
        let dataset = {}
        let path = Path.plus(this.NOTES_LEVEL, lessonName)
        switch (instrument.toLowerCase()) {
            case "piano":
                goal = 1
                break;
            case "guitar":
                goal = 6
                break;
            case "sax":
                goal = 2
                break;
        }
        return [new Lesson(lessonName, criteria, goal, v, v2, dataset, path, Constants.LESSON_TYPE_TIMED, -1)]

    }

    generateIntervalsGroup() {
        let intervals = this.fgInput.getIntervals();
        if (intervals == undefined || intervals.length == 0) {
            return null;
        }

        let description = 'Interval fluency'
        let lessons = this.generateLessonsForIntervals(this.fgInput.getInstrument(), intervals)
        let group = new Group(Constants.INTERVALS, description, lessons.map(l => l.getName()), [], this.INTERVALS_LEVEL)
        groupRepository.save(group)
        lessons.forEach(l => lessonRepository.save(l))
        return group;    
    }

    generateLessonsForIntervals(instrument, intervals) {
        let lessons = []
        let i = 1;
        let lessonName = ''
        switch (instrument.toLowerCase()) {
            case "piano":
                lessonName = 'Intervals ' + (i++)
                lessons.push(new Lesson(lessonName, 'Play the given interval starting on the given note', 1, intervals, [], {}, Path.plus(this.INTERVALS_LEVEL, lessonName), Constants.LESSON_TYPE_TIMED, -1))
                if (this.fgInput.getScales() != undefined){
                    this.fgInput.getScales().forEach(scaleType => {
                        lessonName = 'Intervals ' + (i++)
                        lessons.push(new Lesson(lessonName, 'Play the given note\'s ' + scaleType + ' scale, adding to each note the given diatonic interval', 1, intervals, [], {}, Path.plus(this.INTERVALS_LEVEL, lessonName), Constants.LESSON_TYPE_TRIES, Constants.DEFAULT_BPM))
                    })
                }
                break;
            case "guitar":
                lessonName = 'Intervals ' + (i++)
                lessons.push(new Lesson(lessonName, 'Play the given interval from the given note on the given string. Use the same string if possible, else the next.', 1, intervals, Constants.STRINGSET_GUITAR, {}, Path.plus(this.INTERVALS_LEVEL, lessonName), Constants.LESSON_TYPE_TIMED, -1))
                lessonName = 'Intervals ' + (i++)
                lessons.push(new Lesson(lessonName, 'Play the given interval from the given note on the given string. Use the next string if possible, else the 2nd next.', 1, intervals, Constants.STRINGSET_GUITAR, {}, Path.plus(this.INTERVALS_LEVEL, lessonName), Constants.LESSON_TYPE_TIMED, -1))
                lessonName = 'Intervals ' + (i++)
                lessons.push(new Lesson(lessonName, 'Play the given interval from the given note on the given string. Use the 2nd next string if possible, else the 3rd next.', 1, intervals, Constants.STRINGSET_GUITAR, {}, Path.plus(this.INTERVALS_LEVEL, lessonName), Constants.LESSON_TYPE_TIMED, -1))

                this.fgInput.getScales().forEach(scaleType => {
                    lessonName = 'Intervals ' + (i++)
                    lessons.push(new Lesson(lessonName, 'Using the 6th string, play the given note\'s ' + scaleType + ' scale, adding to each note the given diatonic interval', 1, intervals, [], {}, Path.plus(this.INTERVALS_LEVEL, lessonName), Constants.LESSON_TYPE_TRIES, Constants.DEFAULT_BPM))
                    lessonName = 'Intervals ' + (i++)
                    lessons.push(new Lesson(lessonName, 'Using the 4th string, play the given note\'s ' + scaleType + ' scale, adding to each note the given diatonic interval', 1, intervals, [], {}, Path.plus(this.INTERVALS_LEVEL, lessonName), Constants.LESSON_TYPE_TRIES, Constants.DEFAULT_BPM))
                    lessonName = 'Intervals ' + (i++)
                    lessons.push(new Lesson(lessonName, 'Using the 3rd string, play the given note\'s ' + scaleType + ' scale, adding to each note the given diatonic interval', 1, intervals, [], {}, Path.plus(this.INTERVALS_LEVEL, lessonName), Constants.LESSON_TYPE_TRIES, Constants.DEFAULT_BPM))
                    lessonName = 'Intervals ' + (i++)
                    lessons.push(new Lesson(lessonName, 'Using the 2nd string, play the given note\'s ' + scaleType + ' scale, adding to each note the given diatonic interval', 1, intervals, [], {}, Path.plus(this.INTERVALS_LEVEL, lessonName), Constants.LESSON_TYPE_TRIES, Constants.DEFAULT_BPM))
                })
                break;
            case "sax":
                lessonName = 'Intervals ' + (i++)
                lessons.push(new Lesson(lessonName, 'Play the given interval starting on the given note', 1, intervals, [], {}, Path.plus(this.INTERVALS_LEVEL, lessonName), Constants.LESSON_TYPE_TIMED, -1))
                this.fgInput.getScales().forEach(scaleType => {
                    lessonName = 'Intervals ' + (i++)
                    lessons.push(new Lesson(lessonName, 'Play the given note\'s ' + scaleType + ' scale, adding after each note the given diatonic interval', 1, intervals, [], {}, Path.plus(this.INTERVALS_LEVEL, lessonName), Constants.LESSON_TYPE_TRIES, Constants.DEFAULT_BPM))
                    i++;
                })
                break;
        }
        return lessons
    }

    generateChordsGroup() {
        let chords = this.fgInput.getChords();
        if (chords == undefined || chords.length == 0){
            return null;
        }
        let description = 'Chords fluency'
        let lessons = this.generateLessonsForChords(this.fgInput.getInstrument(), chords)
        let group = new Group(Constants.CHORDS, description, lessons.map(l => l.getName()), [], this.CHORDS_LEVEL)
        groupRepository.save(group)
        lessons.forEach(l => lessonRepository.save(l))
        return group;        
    }

    generateLessonsForChords(instrument, chords) {
        let lessons = []
        let i = 1;
        let lessonName = ''
        let inversions = this.fgInput.getChordInversions()
        switch (instrument.toLowerCase()) {
            case "piano":
                chords.forEach(chord => {
                    lessonName = 'Chords ' + (i++)
                    if (Constants.CHORDS_3.includes(chord)) {
                        lessons.push(new Lesson(lessonName, 'Play the ' + chord + ' chord in the following inversions/order: root, 1st, 2nd, 1st, root', 1, [chord], [], {}, Path.plus(this.CHORDS_LEVEL, lessonName), Constants.LESSON_TYPE_TRIES, Constants.DEFAULT_BPM))
                    } else {
                        lessons.push(new Lesson(lessonName, 'Play the ' + chord + ' chord in the following inversions/order: root, 1st, 2nd, 3rd, 2nd, 1st, root', 1, [chord], [], {}, Path.plus(this.CHORDS_LEVEL, lessonName), Constants.LESSON_TYPE_TRIES, Constants.DEFAULT_BPM))
                    }
                })
                lessonName = 'Chords ' + (i++)
                lessons.push(new Lesson(lessonName, 'Play the given inversion of the chord', 1, chords, inversions, {}, Path.plus(this.CHORDS_LEVEL, lessonName), Constants.LESSON_TYPE_TIMED, -1))
                break;
            case "guitar":
                lessonName = 'Chords ' + (i++)
                lessons.push(new Lesson(lessonName, 'Play the given chord on strings 6-4 in the following inversions/order: root, 1st, 2nd, 1st, root', 1, Constants.CHORDS_3, [], {}, Path.plus(this.CHORDS_LEVEL, lessonName), Constants.LESSON_TYPE_TRIES, 120))
                lessonName = 'Chords ' + (i++)
                lessons.push(new Lesson(lessonName, 'Play the given chord on strings 5-3 in the following inversions/order: root, 1st, 2nd, 1st, root', 1, Constants.CHORDS_3, [], {}, Path.plus(this.CHORDS_LEVEL, lessonName), Constants.LESSON_TYPE_TRIES, 120))
                lessonName = 'Chords ' + (i++)
                lessons.push(new Lesson(lessonName, 'Play the given chord on strings 4-2 in the following inversions/order: root, 1st, 2nd, 1st, root', 1, Constants.CHORDS_3, [], {}, Path.plus(this.CHORDS_LEVEL, lessonName), Constants.LESSON_TYPE_TRIES, 120))
                lessonName = 'Chords ' + (i++)
                lessons.push(new Lesson(lessonName, 'Play the given chord on strings 3-1 in the following inversions/order: root, 1st, 2nd, 1st, root', 1, Constants.CHORDS_3, [], {}, Path.plus(this.CHORDS_LEVEL, lessonName), Constants.LESSON_TYPE_TRIES, 120))
                lessonName = 'Chords ' + (i++)
                lessons.push(new Lesson(lessonName, 'Play the given chord on strings 6-3 in the following inversions/order: root, 1st, 2nd, 1st, root', 1, chords.filter(c => !Constants.CHORDS_3.includes(c)), [], {}, Path.plus(this.CHORDS_LEVEL, lessonName), Constants.LESSON_TYPE_TRIES, 120))
                lessonName = 'Chords ' + (i++)
                lessons.push(new Lesson(lessonName, 'Play the given chord on strings 6-2 in the following inversions/order: root, 1st, 2nd, 1st, root', 1, chords.filter(c => !Constants.CHORDS_3.includes(c)), [], {}, Path.plus(this.CHORDS_LEVEL, lessonName), Constants.LESSON_TYPE_TRIES, 120))
                lessonName = 'Chords ' + (i++)
                lessons.push(new Lesson(lessonName, 'Play the given chord on strings 4-1 in the following inversions/order: root, 1st, 2nd, 1st, root', 1, chords.filter(c => !Constants.CHORDS_3.includes(c)), [], {}, Path.plus(this.CHORDS_LEVEL, lessonName), Constants.LESSON_TYPE_TRIES, 120))
                lessonName = 'Chords ' + (i++)
                lessons.push(new Lesson(lessonName, 'Play the chord and inversion on strings 6-4, 5-3, 4-2, 3-1, and then back down. The chords should be the same quality and inversion but spaced a perfect fourth apart.', 1, Constants.CHORDS_3, inversions, {}, Path.plus(this.CHORDS_LEVEL, lessonName), Constants.LESSON_TYPE_TRIES, 120))
                lessonName = 'Chords ' + (i++)
                lessons.push(new Lesson(lessonName, 'Play the chord and inversion on strings 6-3, 5-2, 4-1, and then back down. The chords should be the same quality and inversion but spaced a perfect fourth apart.', 1, chords.filter(c => !Constants.CHORDS_3.includes(c)), inversions, {}, Path.plus(this.CHORDS_LEVEL, lessonName), Constants.LESSON_TYPE_TRIES, 120))
                break;
        }
        return lessons
    }

    generateScalesGroup() {
        let scales = this.fgInput.getScales()
        if (scales == undefined || scales.length == 0) {
            return null;
        }
        let description = 'Scales fluency'
        let lessons = this.generateLessonsForScales(this.fgInput.getInstrument(), scales)
        alert(this.SCALES_LEVEL)
        let group = new Group(Constants.SCALES, description, lessons.map(l => l.getName()), [], this.SCALES_LEVEL);
        groupRepository.save(group)
        lessons.forEach(l => lessonRepository.save(l))
        return group; 
    }

    generateLessonsForScales(instrument, scales) {
        let lessons = []
        let i = 1;
        let permutations = this.fgInput.getScalePermutations()
        let lessonName = ''
        switch (instrument.toLowerCase()) {
            case "piano":
            case "sax":
                scales.forEach(scale => {
                    permutations.forEach(permutation => {
                        lessonName = 'Scales ' + (i++)
                        lessons.push(new Lesson(lessonName, 'Play a ' + scale + ' scale in the given key with permutation: ' + permutation, 1, [], [], {}, Path.plus(this.SCALES_LEVEL, lessonName), Constants.LESSON_TYPE_TRIES, 120))
                    })
                })
                break;
            case "guitar":
                scales.forEach(scale => {
                    permutations.forEach(permutation => {
                        lessonName = 'Scales ' + (i++)
                        lessons.push(new Lesson(lessonName, 'Play a ' + scale + ' scale in the given key with permutation: ' + permutation + '. Start on the lowest/highest note in the scale and play 4 notes per string, asc/desc to the highest/lowest possible note in the scale.', 1, Constants.ASC_DESC, [], {}, Path.plus(this.SCALES_LEVEL, lessonName), Constants.LESSON_TYPE_TRIES, 120))
                        lessonName = 'Scales ' + (i++)
                        lessons.push(new Lesson(lessonName, 'Play a ' + scale + ' scale in the given key with permutation: ' + permutation + '. Start on the lowest/highest note in the scale and play 3 notes per string, asc/desc to the highest/lowest possible note in the scale.', 1, Constants.ASC_DESC, [], {}, Path.plus(this.SCALES_LEVEL, lessonName), Constants.LESSON_TYPE_TRIES, 120))
                        lessonName = 'Scales ' + (i++)
                        lessons.push(new Lesson(lessonName, 'Play a ' + scale + ' scale in the given key with permutation: ' + permutation + '. Start on the lowest/highest note in the scale and play 2 notes per string, asc/desc to the highest/lowest possible note in the scale.', 1, Constants.ASC_DESC, [], {}, Path.plus(this.SCALES_LEVEL, lessonName), Constants.LESSON_TYPE_TRIES, 120))
                    })

                })
                break;
        }
        return lessons
    }

    generateArpsGroup() {
        let chords = this.fgInput.getChords();
        if (chords == undefined || chords.length == 0) {
            return null;
        }
        let description = 'Arps fluency'
        let lessons = this.generateLessonsForArps(this.fgInput.getInstrument(), chords)
        let group = new Group(Constants.ARPEGGIOS, description, lessons.map(l => l.getName()), [], this.ARPS_LEVEL);
        groupRepository.save(group)
        lessons.forEach(l => lessonRepository.save(l))
        return group; 
    }

    generateLessonsForArps(instrument, chords) {
        let lessons = []
        let i = 0;
        let lessonName = ''
        switch (instrument.toLowerCase()) {
            case "piano":
            case "sax":
                chords.forEach(chord => {
                    lessonName = 'Arps ' + (i++)
                    if (Constants.CHORDS_3.includes(chord)) {
                        lessons.push(new Lesson(lessonName, 'Play a ' + chord + ' arp starting on the given arp degree', 1, ["1st(root)", "2nd", "3rd"], [], {}, Path.plus(this.ARPS_LEVEL, lessonName), Constants.LESSON_TYPE_TRIES, Constants.DEFAULT_BPM))
                    } else {
                        lessons.push(new Lesson(lessonName, 'Play a ' + chord + ' arp starting on the given arp degree', 1, ["1st(root)", "2nd", "3rd", "4th"], [], {}, Path.plus(this.ARPS_LEVEL, lessonName), Constants.LESSON_TYPE_TRIES, Constants.DEFAULT_BPM))
                    }
                })
                break;
            case "guitar":
                chords.forEach(chord => {
                    lessonName = 'Arps ' + (i++)
                    if (Constants.CHORDS_3.includes(chord)) {
                        lessons.push(new Lesson(lessonName, 'Play a ' + chord + ' arp starting on the given arp degree. Begin on the 1st/6th string and play 1 note per string.', 1, ["1st(root)", "2nd", "3rd"], Constants.ASC_DESC, {}, Path.plus(this.ARPS_LEVEL, lessonName), Constants.LESSON_TYPE_TRIES, Constants.DEFAULT_BPM))
                        lessonName = 'Arps ' + (i++)
                        lessons.push(new Lesson(lessonName, 'Play a ' + chord + ' arp starting on the given arp degree. Begin on the 1st/6th string and play 2 notes per string.', 1, ["1st(root)", "2nd", "3rd"], Constants.ASC_DESC, {}, Path.plus(this.ARPS_LEVEL, lessonName), Constants.LESSON_TYPE_TRIES, Constants.DEFAULT_BPM))
                        lessonName = 'Arps ' + (i++)
                        lessons.push(new Lesson(lessonName, 'Play a ' + chord + ' arp starting on the given arp degree. Begin on the 1st/6th string and play 3 notes per string.', 1, ["1st(root)", "2nd", "3rd"], Constants.ASC_DESC, {}, Path.plus(this.ARPS_LEVEL, lessonName), Constants.LESSON_TYPE_TRIES, Constants.DEFAULT_BPM))
                    } else {
                        lessons.push(new Lesson(lessonName, 'Play a ' + chord + ' arp starting on the given arp degree. Begin on the 1st/6th string and play 1 note per string.', 1, ["1st(root)", "2nd", "3rd", "4th"], Constants.ASC_DESC, {}, Path.plus(this.ARPS_LEVEL, lessonName), Constants.LESSON_TYPE_TRIES, Constants.DEFAULT_BPM))
                        lessonName = 'Arps ' + (i++)
                        lessons.push(new Lesson(lessonName, 'Play a ' + chord + ' arp starting on the given arp degree. Begin on the 1st/6th string and play 2 notes per string.', 1, ["1st(root)", "2nd", "3rd", "4th"], Constants.ASC_DESC, {}, Path.plus(this.ARPS_LEVEL, lessonName), Constants.LESSON_TYPE_TRIES, Constants.DEFAULT_BPM))
                        lessonName = 'Arps ' + (i++)
                        lessons.push(new Lesson(lessonName, 'Play a ' + chord + ' arp starting on the given arp degree. Begin on the 1st/6th string and play 3 notes per string.', 1, ["1st(root)", "2nd", "3rd", "4th"], Constants.ASC_DESC, {}, Path.plus(this.ARPS_LEVEL, lessonName), Constants.LESSON_TYPE_TRIES, Constants.DEFAULT_BPM))
                    }
                })
                break;
        }
        return lessons
    }
}


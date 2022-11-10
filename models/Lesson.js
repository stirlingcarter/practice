export default class Lesson {

    id = ''
    title=''
    criteria = ''
    instrument = ''
    goal = 2
    // historical times for each *variant* (e.x. A$DOM$LH) 
    dataset = {
        A: [], // A: [{"A$dom$LH" : [5,5,6,5,4,3,4,5,3,2,4,3,2,1,3,2,1,1,1]},...],
        Bb: [],
        B: [],
        C: [],
        Db: [],
        D: [],
        Eb: [],
        E: [],
        F: [],
        Gb: [],
        G: [],
        Ab: []
    }

    constructor(title, criteria, instrument, uniqueLessonName, goal, dataset){
        title=title
        criteria=criteria
        instrument=instrument
        uniqueLessonName=uniqueLessonName
        goal=goal
        dataset=dataset
    }

}
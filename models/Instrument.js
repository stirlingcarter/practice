export default class Instrument {

    name = ''
    lessonNames = []

    constructor(name){
        this.name = name
    }

    getName(){
        return this.name
    }

    getLessonNames(){
        return this.lessonNames
    }

    addLessonName(lessonName){
        this.lessonNames.push(lessonName)
    }

}
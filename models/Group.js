import Util from '../services/Util';

export default class Group {

    name = ''
    lessonNames = []
    groupNames = []
    level = 0

    constructor(name, lessonNames, groupNames, level){
        this.name = name
        this.lessonNames = lessonNames
        if (name = Util.HEAD_GROUP_NAME){
            lessonNames = []
        }
        this.groupNames = groupNames
        this.level = level
    }

    getLessonNames(){
        return Util.copyOf(thislessonNames)
    }

    getGroupNames(){
        return Util.copyOf(this.groupNames)
    }

    addLessonName(lessonName) {
        this.lessonNames.push(lessonName)
    }

    addGroupName(groupName) {
        this.groupNames.push(groupName)
    }
}
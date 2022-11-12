import Util from '../services/Util';
import Constants from '../constant/Constants';

export default class Group {

    name = ''
    description = ''
    lessonNames = []
    groupNames = []
    level = 0

    constructor(name, description, lessonNames, groupNames, level){
        this.name = name
        this.description = description
        this.lessonNames = lessonNames
        if (name = Constants.HEAD_GROUP_NAME){
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
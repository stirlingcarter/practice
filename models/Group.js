import Util from '../services/Util';
import Constants from '../constant/Constants';

export default class Group {

    name = ''
    parentName = ''
    description = ''
    lessonNames = []
    groupNames = []
    level = 0

    constructor(name, parentName, description, lessonNames, groupNames, level){
        this.name = name
        this.parentName = parentName
        this.description = description
        this.lessonNames = lessonNames
        if (name = Constants.HEAD_GROUP_NAME){
            lessonNames = []
        }
        this.groupNames = groupNames
        this.level = level
    }

    getName(){
        return this.name
    }

    getLevel(){
        return this.level
    }

    getLessonNames(){
        return Util.copyOf(this.lessonNames)
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

    removeChildGroupByName(groupName){
        this.groupNames = this.groupNames.filter(name => name !== groupName)
    }

    getParentName(){
        return this.parentName
    }

    static fromJSONStringified(groupString){

        let groupDict = JSON.parse(groupString)

        let name = groupDict['name']
        let description = groupDict['description']
        let lessonNames = groupDict['namelessonNames']
        let groupNames = groupDict['groupNames']
        let level = groupDict['name']

        return new Group(
            name == undefined ? '' : name,
            description == undefined ? '' : description,
            lessonNames == undefined ? [] : lessonNames,
            groupNames == undefined ? [] : groupNames,
            level == undefined ? -1 : level
        )
    }
}
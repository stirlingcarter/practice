import Util from '../services/Util';
import Constants from '../constant/Constants';

export default class Group {

    name = ''
    description = ''
    lessonNames = []
    groupNames = []
    path = ''

    constructor(name, description, lessonNames, groupNames, path){
        this.name = name
        this.description = description
        this.lessonNames = lessonNames
        if (name = Constants.HEAD_GROUP_NAME){
            lessonNames = []
        }
        this.groupNames = groupNames
        this.path = path
    }

    getName(){
        return this.name
    }

    getLessonNames(){
        return Util.copyOf(this.lessonNames)
    }

    getPath(){
        return this.path
    }

    getGroupNames(){
        return Util.copyOf(this.groupNames)
    }

    addLessonName(lessonName) {
        if (this.lessonNames == undefined){
            this.lessonNames = [lessonName]
        }else{
            this.lessonNames.push(lessonName)
        }
    }

    addGroupName(groupName) {
        if (this.groupNames == undefined){
            this.groupNames = [groupName]
        }else{
            this.groupNames.push(groupName)
        }    }

    removeChildGroupByName(groupName){
        this.groupNames = this.groupNames.filter(name => name !== groupName)
    }

    static fromJSONStringified(groupString){

        let groupDict = JSON.parse(groupString)

        let name = groupDict['name']
        let description = groupDict['description']
        let lessonNames = groupDict['namelessonNames']
        let groupNames = groupDict['groupNames']
        let path = groupDict['path']

        return new Group(
            name == undefined ? '' : name,
            description == undefined ? '' : description,
            lessonNames == undefined ? [] : lessonNames,
            groupNames == undefined ? [] : groupNames,
            path == undefined ? '' : path
        )
    }
}
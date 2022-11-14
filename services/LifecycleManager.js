
import { groupRepository } from "../App";
import Group from "../models/Group";
import Constants from "../constant/Constants"

export default class LifecycleManager {

    constructor(){
        this.initGroupTreeIfNonExistent() 
    }

    initGroupTreeIfNonExistent () {
        if (groupRepository.getHeadGroup() == undefined){
            groupRepository.save(new Group(Constants.HEAD_GROUP_NAME), 'root', permanent top level group', [], [], 0)
        }
    }

}

import Group from "../models/Group";
import Constants from "../constant/Constants"
import TreeUtils from "./TreeUtils";
import { HEAD_PATH } from "./TreeUtils";
import { HEAD_NAME } from "./TreeUtils";
import Path from "./Path";
import { groupRepository } from "../App";

export default class LifecycleManager {

    constructor(){
        this.initGroupTreeIfNonExistent() 
    }

    initGroupTreeIfNonExistent () {
        
        if (TreeUtils.getHeadGroup() == undefined){
            groupRepository.save(new Group(HEAD_NAME, 'permanent top level group', [], [], HEAD_PATH))
        }


        Constants.VALID_INSTRUMENTS.forEach(instrument => {
            if (groupRepository.getGroupByPath(Path.plus(HEAD_PATH, instrument)) == undefined){
                TreeUtils.saveGroup(new Group(instrument, '', [], [], Path.plus(HEAD_PATH, instrument)))
            }
        })


    }

}
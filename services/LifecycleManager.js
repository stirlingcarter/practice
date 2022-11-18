
import { groupRepository } from "../App";
import Group from "../models/Group";
import Constants from "../constant/Constants"
import TreeUtils from "./TreeUtils";
import { GroupPreviewComponent } from "../components/GroupPreviewComponent";
import { HEAD_PATH } from "./TreeUtils";
import { HEAD_NAME } from "./TreeUtils";

export default class LifecycleManager {

    constructor(){
        this.initGroupTreeIfNonExistent() 
    }

    initGroupTreeIfNonExistent () {
        
        if (TreeUtils.getHeadGroup() == undefined){
            groupRepository.save(new Group(HEAD_NAME, 'permanent top level group', [], [], HEAD_PATH))
            alert(JSON.stringify(groupRepository.getGroupByPath(HEAD_PATH)))
        }
    }

}
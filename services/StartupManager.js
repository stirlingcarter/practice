
import groupRepository from "./LessonRepository.js";
import Constants from "../constant/Constants"

export default {
    initGroupTreeIfNonExistent () {
        if (groupRepository.getHeadGroup() == null){
            groupRepository.save(new Group(Constants.HEAD_GROUP_NAME), 'permenant top level group', [], [], 0)
        }
    },

}
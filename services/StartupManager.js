
import groupRepository from "./LessonRepository.js";
import Util from "../services/Util"

export default {
    initGroupTreeIfNonExistent () {
        if (groupRepository.getHeadGroup() == null){
            groupRepository.save(new Group(Util.HEAD_GROUP_NAME), 'permenant top level group', [], [], 0)
        }
    }
}
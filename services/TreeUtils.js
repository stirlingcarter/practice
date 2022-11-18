import { groupRepository } from "../App"
import { lessonRepository } from "../App"
import Group from "../models/Group"
import Path from "./Path"

export const HEAD_PATH = "Instruments"
export const HEAD_NAME = HEAD_PATH
export default {



    getHeadGroup() {
        return groupRepository.getGroupByPath(HEAD_PATH)
    },


    deleteGroup(group) {
        if (group == null) {
            alert("why deleting null group")
        } else {
            for (const ln of group.getLessonNames()) {
                lessonRepository.deleteByPath(Path.plus(group.getPath(), ln))
            }
            for (const gn of group.getGroupNames()) {
                groupRepository.deleteByPath(Path.plus(group.getPath(), gn))
            }
            groupRepository.delete(group)

            let parentGroup = groupRepository.getGroupByPath(Path.up(group.getPath()))
            parentGroup.removeChildGroupByName(group.getName())
            groupRepository.save(parentGroup)
        }

    },
    deleteGroupByPath(path) {
        this.deleteGroup(groupRepository.getGroupByPath(path))
    },

    saveGroup(group) {
        groupRepository.save(group)

        if (group.getPath() != HEAD_PATH){
            let parentGroup = groupRepository.getGroupByPath(Path.up(group.getPath()))
            parentGroup.addGroupName(group.getName())
            groupRepository.save(parentGroup)
        }
    
    },

    saveLesson(lesson) {
        let parentGroup = groupRepository.getGroupByPath(Path.up(lesson.getPath()))
        parentGroup.addLessonName(lesson.getName())
        groupRepository.save(parentGroup)
        lessonRepository.save(lesson)
    },

    deleteLessonByPath(path) {
        lessonRepository.deleteByPath(path);
        let group = groupRepository.getGroupByPath(Path.up(path))
        group.removeChildLessonByName(Path.currentDir(path))
        groupRepository.save(group)
    }


}
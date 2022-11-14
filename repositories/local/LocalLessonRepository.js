import groupRepository from "./LocalGroupRepository";

const storage = {}
export default {
  getLessonByNameAndGroupName(lessonName, groupName) {
    try {
      let retrievedItem = storage[groupName + lessonName]
      const item = JSON.parse(retrievedItem);
      return item;
    } catch (error) {
      console.log(error.message);
    }
    return null;
  },
  delete(lessonName, groupName) {
    try {
      delete storage[groupName + lessonName]
      let group = groupRepository.getGroupByName(groupName)
      group.removeLesson(lessonName)
      groupRepository.save(group)
    } catch (error) {
      console.log(error.message);
    }
  },
  save(lesson) {
    try {
      
      storage[lesson.getGroupName() + lesson.getName()] = JSON.stringify(lesson);
    } catch (error) {
      console.log(error.message);
    }
    return null;
  }
}
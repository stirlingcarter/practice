
import { AsyncStorage } from "react-native";

export default class LessonRepository {

    //TODO when this is rebuilt we should put a layer beneath in case we make more repositories 
    static instance = null;
  
    static getInstance() {
      if (LessonRepository.instance == null) {
        LessonRepository.instance = new LessonRepository();
      }
  
      return this.instance;
    }


    async getLessonById(key) {
        // alert("gettinig for " + key)
      
        try {
          const retrievedItem = await AsyncStorage.getItem(key);
          //alert(JSON.parse(retrievedItem));
          const item = JSON.parse(retrievedItem);
          return item;
        } catch (error) {
          console.log(error.message);
        }
        return;
      }
      
      async deleteLessonById(key) {
        // alert("gettinig for " + key)
      
        try {
          await AsyncStorage.removeItem(key);
          const retrievedItem = await AsyncStorage.getItem(key);
          return true;
        } catch (error) {
          return false;
        }
      }
      
      async save(key, item) {
        try {
          //we want to wait for the Promise returned by AsyncStorage.setItem()
          //to be resolved to the actual value before returning the value
          var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
          return jsonOfItem;
        } catch (error) {
          console.log(error.message);
        }
      }

}
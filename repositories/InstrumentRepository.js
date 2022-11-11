import { MMKV } from "react-native-mmkv";
import lessonRepository from "./LessonRepository.js";

const storage = new MMKV({
    id: "Instruments"
})

export default {
    getAllInstrumentNames() {
        return storage.getAllKeys();
    },
    getInstrumentByName(instrumentName) {
        try {
            let retrievedItem = this.storage.getString(instrumentName)
            const item = JSON.parse(retrievedItem);
            return item;
        } catch (error) {
            console.log(error.message);
        }
        return null
    },
    getLessonNamesByInstrumentName(name) {
        return this.getInstrumentByName(name).getLessonNames()
    },
    deleteInstrument(instrument) {
        try {
            this.storage.delete(instrument.getName());
            for (const ln of instrument.getLessonNames()) {
                lessonRepository.delete(ln, instrument.getName())
            }
        } catch (error) {
            console.log(error.message);
        }
        return null
    },
    save(instrument) {
        try {
            storage.set(instrument.getName(), JSON.stringify(instrument));
        } catch (error) {
            console.log(error.message);
        }
        return null
    }
}
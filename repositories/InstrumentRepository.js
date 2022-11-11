import { MMKVLoader } from "react-native-mmkv-storage";
import LessonRepository from "./LessonRepository";


const lessonRepository = LessonRepository.getInstance();

export default class InstrumentRepository {

    static instance = null;

    storage = null;

    static getInstance() {
        if (InstrumentRepository.instance == null) {
            InstrumentRepository.instance = new InstrumentRepository();

            storage = new MMKVLoader()
                .withInstanceID("Instruments")
                .initialize();
        }

        return this.instance;
    }

    async getAllInstrumentNames() {
        let names = await storage.indexer.getKeys();
        return names
    }

    async getInstrumentByName(instrumentName) {
        try {
            let retrievedItem = await this.storage.getStringAsync(instrumentName)
            const item = JSON.parse(retrievedItem);
            return item;
        } catch (error) {
            console.log(error.message);
        }
        return;
    }

    async getLessonNamesByInstrumentName(name) {
        return this.getInstrumentByName(name).getLessonNames()
    }

    async deleteInstrument(instrument) {
        try {
            this.storage.removeItem(instrument.getName());
            for (const ln of instrument.getLessonNames()) {
                lessonRepository.delete(ln, instrument.getName())
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    async save(instrument) {
        try {
            await storage.setStringAsync(instrument.getName(), instrument);
        } catch (error) {
            console.log(error.message);
        }
        return
    }

}
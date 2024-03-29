import CustomVariantSet from "../models/CustomVariantSet";
import { MMKV } from "react-native-mmkv";

export default class CustomVariantSetRepository {
    storage = null
    static PATH = "CUSTOM_VARIANT_SETS"

    constructor() {
        this.storage = new MMKV({
            id: "CustomVariantSets"
        })
    }

    getCustomVariantSetByCategory(category) {
        try {
            let retrievedItem = this.storage.getString(this.PATH + "/" + category)
            if (retrievedItem == undefined){
                return undefined
            }
            let customVariantSet = CustomVariantSet.fromJSONStringified(retrievedItem)
            if (customVariantSet == null){
                return undefined
            }
            return customVariantSet;
        } catch (error) {
            alert(error.message);
        }
        
    }

    appendVariant(category, variantName) {
        let current = this.getCustomVariantSetByCategory(category)
        if (current == null){

            current = new CustomVariantSet(category, [])
        }
        current.addName(variantName+"(" + category + ")")

        this.saveCustomVariantSet(current)
    }

    saveCustomVariantSet(customVariantSet) {
        try { 
            this.storage.set(this.PATH + "/" + customVariantSet.getCategory(), JSON.stringify(customVariantSet));
            let current = this.getCustomVariantSetByCategory(customVariantSet.getCategory())

        } catch (error) {
            alert("error saving custom variant: " + error.message);
        }
    }

    removeVariant(category, variantName) {
        if (category == null || category == undefined){
            return null
        }
        let current = this.getCustomVariantSetByCategory(category)
        if (current == null){
            return null
        }
        

        current.removeName(variantName)

        this.saveCustomVariantSet(current)
        let fin = this.getCustomVariantSetByCategory(category)
        return null
    }

}
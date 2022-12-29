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
                alert("error: no custom variant set for " + category)
                return null;
            }
            let customVariantSet = CustomVariantSet.fromJSONStringified(retrievedItem)
            if (customVariantSet == null){
                alert("error: no custom variant set for " + category)
            }
            return customVariantSet;
        } catch (error) {
            alert(error.message);
            return error.message    
        }
        
    }

    appendVariant(category, variantName) {
        let current = this.getCustomVariantSetByCategory(category)
        if (current == null){

            current = new CustomVariantSet(category, [])
        }
        current.addName(variantName)

        this.saveCustomVariantSet(current)
    }

    saveCustomVariantSet(customVariantSet) {
        try { 
            this.storage.set(this.PATH + "/" + customVariantSet.getCategory(), JSON.stringify(customVariantSet));
        } catch (error) {
            alert("error saving custom variant: " + error.message);
        }
    }

    removeVariant(category, variantName) {
        let current = this.getCustomVariantSetByCategory(category)
        if (current == null){
            return null
        }
        current.removeName(variantName)
        this.saveCustomVariantSet(current)
        return null
    }

}
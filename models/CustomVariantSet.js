export default class CustomVariantSet {

    category = ''
    names = []

    constructor(category, names) {
        this.category = category
        this.names = names
    }

    getNames() {
        return this.names
    }

    getCategory() {
        return this.category
    }

    removeName(name){
        this.names = this.names.filter((item) => item !== name)
    }

    addName(name){
        if (!this.names.includes(name)){
            this.names.push(name)
        }
    }

    static fromJSONStringified(customVariantString){

        let customVariantDict = JSON.parse(customVariantString)

        let category = customVariantDict['category']
        let names = customVariantDict['names']

        return new CustomVariantSet(
            category == undefined ? '' : category,
            names == undefined ? '' : names
        )
    }

    

}
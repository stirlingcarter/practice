export default class BuiltInVariant {

    category = ''
    name = '' //Maj7

    constructor(name, category) {
        this.name = name
        this.category = category
    }

    getName(){
        return this.name
    }

    getCategory(){
        return this.category
    }

}

// export function sum(accumulator, a) {
//     return accumulator + a;
// }

export default class Util {

    static sum(arr){
        sum = 0
        for (n of arr){
            sum += n
        }
        return sum
    }

    //{
    //   "a" : [3,2,1],.. 
    //}
    static getVHashesFromDataset(dataset){
        return Object.keys(dataset)
    }

    static copyOf(o) {
        return JSON.parse(JSON.stringify(o))
    }

    static getNamesOfVariantsFromVHashes(vHashes) {
        if (!vHashes[0].includes("$")){
            return [vHashes]
        }
        //make n+1 sets, n = number of $
        let n = vHashes[0].split("$").length
        let variantSets = []
        for (let i = 0; i < n; i++) {
            let tmp = new Set()
            variantSets.push(tmp)
        }

        for (let k = 0; k < vHashes.length; k++) {

            //cats is ["A","maj 7", "left"]
            let variants = vHashes[k].split("$")
            for (let i = 0; i < n; i++) {
                variantSets[i].add(variants[i])
            }
        }

        let namesOfVariants = []
        for (let i = 0; i < n; i++) {
            namesOfVariants.push(Array.from(variantSets[i]))

        }
        return namesOfVariants
    }

    static vHashToName(vHash) {
        let args = vHash.split("$")
        let name = ""
        for (let i = 0; i < args.length; i++) {
            name += args[i]
            if (i != args.length - 1) {
                name += " "
            }
        }
        return name
    }


    static arrayAvg(arr){
        return arr.length < 1 ? 0 : arr.reduce((a, b) => a + b) / arr.length;
    }

    static getIntRep(note) {
        if (note == "A") {
            return 1;
        } else if (note == "Bb") {
            return 2;
        } else if (note == "B") {
            return 3;
        } else if (note == "C") {
            return 4;
        } else if (note == "Db") {
            return 5;
        } else if (note == "D") {
            return 6;
        } else if (note == "Eb") {
            return 7;
        } else if (note == "E") {
            return 8;
        } else if (note == "F") {
            return 9;
        } else if (note == "Gb") {
            return 10;
        } else if (note == "G") {
            return 11;
        } else {
            return 12;
        }
    }

    static getNoteRep(number) {
        if (number == 1) {
            return "A";
        } else if (number == 2) {
            return "Bb";
        } else if (number == 3) {
            return "B";
        } else if (number == 4) {
            return "C";
        } else if (number == 5) {
            return "Db";
        } else if (number == 6) {
            return "D";
        } else if (number == 7) {
            return "Eb";
        } else if (number == 8) {
            return "E";
        } else if (number == 9) {
            return "F";
        } else if (number == 10) {
            return "Gb";
        } else if (number == 11) {
            return "G";
        } else {
            return "Ab";
        }
    }

    static isEmptyOrWS(s){
        return !(s != undefined && s.replace(/\s/g, '').length)
    }

    static getRandomFromArray(items){
        return items == undefined || items.length == 0 ? "" : items[Math.floor(Math.random()*items.length)];
    }

}

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
        try {
            return JSON.parse(JSON.stringify(o));
          } catch (error) {
            // handle the error here
            alert("Error in Util.copyOf: " + error)
            alert("Object: " + o)
          }
          
    }

    static toTitleCase(s) {
        return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    
    }

    static getNoParens(s) {
        let index = s.indexOf("(");
        if (index === -1) {
          return s;
        }
        return s.slice(0, index);
      }

      static toParens(v,c){
        return v + "(" + c + ")"
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

    static getListOfVariantsFromVHash(vHash) {
        return vHash.split("$")
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

    static getUniqueNumbersDesc(numbers) {
        // Create an empty object to store the unique numbers
        const uniqueNumbers = {};
        // Loop through the numbers array and add each number to the object
        numbers.forEach(number => {
          uniqueNumbers[number] = true;
        });
        // Convert the object to an array and sort it in descending order
        return Object.keys(uniqueNumbers).sort((a, b) => b - a);
      }

    static getLargestBPMWith3TriesOrLess(tries, bpms) {
        let uniqueBpms = Util.getUniqueNumbersDesc(bpms);
        for (let i = 0; i < uniqueBpms.length; i++) {
            let bpm = uniqueBpms[i];
            let triesWithBpm = Util.removeNonTargetBpm(tries, bpms, bpm);
            //if any of the tries < 4, return this bpm
            for (let i = 0; i < triesWithBpm.length; i++) {
                if (triesWithBpm[i] < 4) {
                    return bpm;
                }
            }
        }
        return null;
    }

    static pairTriesAndBPMsDatasets(triesDs, bpmsDs) {
        let ds = {}

        Object.keys(triesDs).forEach(vhash => {
            ds[vhash] = triesDs[vhash].map((oneTriesCount, i) => [oneTriesCount, bpmsDs[vhash][i]])
          })
        return ds
    }

    static getVHashPretty(vHash) {
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
      

    static removeNonTargetBpm(tries, bpms, target) {
        return tries.filter((_, i) => bpms[i] == target)
      }

      static getMostCommonNumber(numbers) {
        let count = {};
        let maxNumber = null;
        let maxCount = 0;
        numbers.forEach(function(number) {
          if (number in count) {
            count[number]++;
          } else {
            count[number] = 1;
          }
          if (count[number] > maxCount) {
            maxNumber = number;
            maxCount = count[number];
          }
        });
        return maxNumber;
      }

    static getWindowOfTimes(times, window) {


        return (times == undefined || times.length == 0) ? [] : times.slice(window * (-1))

    }

    static getNoParensForEachInListsIfNoDupe(names, names2) {

        //temporariily disable this
        return [names,names2]

        let uniqueNames = {}
        let result = [];
        let result2 = [];

        if (names != undefined){
          names.forEach(name => {
          let index = name.indexOf("(");
          if (index === -1) {
            result.push(name);
            uniqueNames[name] = true;
          }else {
            let strippedName = name.slice(0, index).trim();
          if (uniqueNames[strippedName] == undefined) {
            result.push(strippedName);
            uniqueNames[strippedName] = true;
          } else {
            result.push(name);
          }
          }

        })
        }
        

        if (names2 != undefined){
            names2.forEach(name => {
            let index = name.indexOf("(");
            if (index === -1) {
              result2.push(name);
              uniqueNames[name] = true;
            }else {
              let strippedName = name.slice(0, index).trim();
            if (uniqueNames[strippedName] == undefined) {
              result2.push(strippedName);
              uniqueNames[strippedName] = true;
            } else {
              result2.push(name);
            }
            }
  
          })
          }

        
        return [result, result2];
      }

}
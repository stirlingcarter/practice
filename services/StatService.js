RANDOM_FIRST_RUN = true
import { LessonSourceComponent } from "../components/LessonSourceComponent";
import Constants from "../constant/Constants";
import Util from "./Util";
export default class StatService {

  /*
  returns the average time of the last w=window historical times
  */
  getWindowedAvg(window, vHash, lesson) {
    return lesson.isEmpty(vHash) ? 0 : Util.arrayAvg(lesson.getWindowOfTimes(vHash, window))
  }

  /*
  first looks for an empty vHash time to return;
  if none exist, returns vHash with poorest *recent* performance.
  */
  getSlowestVHash(window, lesson) {
    let vHashes = lesson.getVHashes()
      
    if (RANDOM_FIRST_RUN) {
      let unvisitedVHashes = lesson.getVHashes().filter(vHash => lesson.isEmpty(vHash))
      if (unvisitedVHashes.length > 0) {
        return unvisitedVHashes[Math.floor(Math.random() * unvisitedVHashes.length)]
      }
    }

    let maxAverage = 0
    let maxVHash = vHashes[0]
    for (let i = 0; i < vHashes.length; i++) {
      let vHash = vHashes[i]
      let windowedAverage = this.getWindowedAvg(window, vHash, lesson)
      if (windowedAverage > maxAverage) {
        maxAverage = windowedAverage
        maxVHash = vHash
      }
    }
    return maxVHash
  }

  /*
  returns a list of ****approx*** inorder times (every historical time) for each variant
  e.g. {"a" : [6,3,3,6,34,3...],...}
  */
  getHistoricalAveragesByVariant(variantNames, lesson) {
    let res = {}
    
    for (vName of variantNames) {
      res[vName] = []
    }

    var maxLength = 0;


    for (vHash of lesson.getVHashes()) {
      maxLength = maxLength >= lesson.getTimesByVHash(vHash).length ? maxLength : lesson.getTimesByVHash(vHash).length
    }
    let i = 0
    while (i < maxLength) {
      for (vHash of lesson.getVHashes()) {
        if (i < lesson.getTimesByVHash(vHash).length) {
          relevantVariants = vHash.split("$")
          for (v of relevantVariants) {
            if (res[v] == undefined){
              res[v] = [lesson.getTimesByVHash(vHash)[i]]
            }else{
              res[v].push(lesson.getTimesByVHash(vHash)[i])
            }
            
          }
        }
      }
      i += 1;
    }
    return res
  }


  /*
    returns -> [[[2,6,3,6,4,7,6,4,8,2,6,7],
                 [5,2,6,7,3],
                 [1,6]],
                 [[a,b,c....g],
                 [maj7,m7...d7],
                 [left,right]]]

    second array maps to first via this.getAverageForVariant(elem)
  */
  getRecentAveragesByVariant(lesson) {
    let namesOfVariants = [
      lesson.getNotes()
    ]
    let v = lesson.getV()
    let v2 = lesson.getV2()

    if (v != null) {
      namesOfVariants.push(v)
    }
    if (v2 != null) {
      namesOfVariants.push(v2)//now you have namesOfVariants = [(A,Bb,B....Ab), (maj7,min7....dim7), (left,right)] 
    }
    let averagesOfVariants = namesOfVariants.map(variantGroup => variantGroup.map(variant => this.getAverageForVariant(variant, lesson)))
    let res = []
    res.push(averagesOfVariants)
    res.push(namesOfVariants)
    return res
  }

  /*
  First gets the average for each vHash containing this particular variant;
  returns the collective avg of the subAvgs. 
  */
  getAverageForVariant(variant, lesson) {
    let sum = 0
    let l = 0;
    for (vHash of lesson.getVHashes().filter(vHash => vHash.includes(variant))) {
      sum += lesson.getDataset()[vHash] == undefined ? 0 : this.getWindowedAvg(10, vHash, lesson)
      l += 1
    }
    return l == 0 ? l : sum / l
  }

  getRandomVHash(lesson) {
    let vHashes = lesson.getVHashes()
    return vHashes[Math.floor(Math.random() * vHashes.length)]
  }

  getLastNSliceFromEachVHashAndAggregate(n, lesson) {
    let allVHashes = lesson.getVHashes()
    let aggBPM = []
    let aggTries = []
    for (vHash of allVHashes) {
      let addandT = lesson.getTimesByVHash(vHash).slice(-n)
      let addandB = lesson.getBPMsByVHash(vHash).slice(-n)
      if (addandT.length < 1) {
        return undefined //if any vHash is empty, return empty array to indicate not enough data
      }
      aggTries = aggTries.concat(addandT)
      aggBPM = aggBPM.concat(addandB)
    }
    return [aggTries, aggBPM]
  }

  getListOfSingleDatasets(listOfSingleDatasets) {
    let aggDataset = {}
    for (singleDataset of listOfSingleDatasets) {
      for (vHash in singleDataset) {
        if (aggDataset[vHash] == undefined) {
          aggDataset[vHash] = singleDataset[vHash]
        } else {
          aggDataset[vHash] = aggDataset[vHash].concat(singleDataset[vHash])
        }
      }
    }
    return aggDataset
  }


  getAllInterleavedTimesByVariant(lessonDicts) {
    const variantDict = {};
    if (lessonDicts == undefined || lessonDicts.length == 0) {
      return variantDict;
    
      }
      alert(lessonDicts)
    // Iterate through each lessonDict
    lessonDicts.forEach((lessonDict) => {
      // Iterate through each vHash in the lessonDict
      for (const vHash in lessonDict) {
        // Split the vHash into an array of variants
        const variants = vHash.split('$');
  
        // Iterate through each variant in the vHash
        variants.forEach(variant => {
          // If the variant doesn't yet have an entry in the variantDict, create one
          if (!variantDict[variant]) {
            variantDict[variant] = [];
          }
  
          // Add the list of times to the variant's entry in the variantDict
          variantDict[variant].push(lessonDict[vHash]);
        });
      }
    });

    Object.keys(variantDict).forEach(times => {

      //interleave the times
      // example: [[1,2,3],[4,5,6],[6,7,2]] -> [1,4,6,2,5,7,3,6,2
      let interleavedTimes = []
      let maxLengthOfATimesList = 0
      for (let i = 0; i < variantDict[times].length; i++) {
        maxLengthOfATimesList = maxLengthOfATimesList >= variantDict[times][i].length ? maxLengthOfATimesList : variantDict[times][i].length
      }
      let i = 0
      while (i < maxLengthOfATimesList) {
        for (let j = 0; j < variantDict[times].length; j++) {
          if (i < variantDict[times][j].length) {
            interleavedTimes.push(variantDict[times][j][i])
          }
        }
        i += 1
      }
      variantDict[times] = interleavedTimes
    })


  
    return variantDict;
  }

}

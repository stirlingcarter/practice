import { v4 as uuidv4 } from 'uuid';
import Util from '../services/Util';
import Constants from '../constant/Constants';

export default class Lesson {

    name = ''
    criteria = ''
    goal = 2
    v = [] //variants, e,g, [maj7, min7]
    v2 = []
    vHashes = []
    path = ''

    // historical times for each *variant* (e.x. A$DOM$LH) 
    dataset = {
        // A$dom$LH" : [5,5,6,5,4,3,4,5,3,2,4,3,2,1,3,2,1,1,1],
        // B$dom$LH" : [5,5,6,5,4,3,4,5,3,2,4,3,2,1,3,2,1,1,1],...
    }

    constructor(name, criteria, goal, v, v2, dataset, path) {
        this.name = name
        this.criteria = criteria
        this.goal = goal
        this.v = v == null ? [] : v
        this.v2 = v2 == null ? [] : v2

        if (dataset == undefined || Object.keys(dataset).length == 0){
          this.vHashes = this.getVHashesFromVariants()
          this.dataset = this.getDatasetFromVHashes()
        } else{
            this.dataset = dataset
            this.vHashes = Object.keys(dataset)
        }
        this.path = path
    }

    setVHashes(vHashes) {
        this.vHashes = vHashes
    }

    getDatasetFromVHashes() {
        let ans = {}
        for (const vHash of this.vHashes) { // vHash : A$maj7$LH
            ans[vHash] = []
        }
        return ans
    }

    getVHashesFromVariants(){
        let combinedVariants = this.getCombinedVariants(this.v, this.v2)
        return this.getCombinedVariants(Constants.NOTES, combinedVariants)    
    }

    getCombinedVariants(v, v2) {
        if (v.length == 0 && v2.length == 0) {
            return []
        } else if (v.length != 0 && v2.length == 0) {
            return v
        } else if (v.length == 0 && v2.length != 0) {
            return v2
        } else {
            variants = []
            for (i = 0; i < v.length; i++) {
                for (k = 0; k < v2.length; k++) {
                    variants.push(v[i] + "$" + v2[k])
                }
            }
            return variants
        }
    }

    getGroupName() {
        return this.groupName
    }

    getTimesByVHash(vHash) {
        return Util.copyOf(this.dataset[vHash])
    }

    isEmpty(vHash) {
        return this.dataset[vHash] == undefined || this.dataset[vHash].length == 0
    }

    getVHashes() {
        // if (Object.keys(this.vHashes).length < 1){
        //     this.pop
        // }
        return Util.copyOf(this.vHashes)
    }

    getPath() {
        return this.path
    }

    getGoal() {
        return this.goal
    }

    getCriteria() {
        return this.criteria
    }

    registerTime(diff, vHash) {
        this.dataset[vHash].push(diff)
    }

    totalTimes(vHash) {
        return this.dataset[vHash].length
    }

    getSpecificTime(vHash, index) {
        return this.dataset[vHash][index]
    }

    getDataset() {
        return Util.copyOf(this.dataset)
    }

    getName() {
        return this.name;
    }

    getWindowOfTimes(vHash, window) {

        return this.getDataset() == undefined || this.getDataset()[vHash] == undefined ? [] : this.getDataset()[vHash].slice(window * (-1))
    }

    static fromJSONStringified(lessonString) {
        let lessonDict = JSON.parse(lessonString)

        let name = lessonDict['name']
        let criteria = lessonDict['criteria']
        let goal = lessonDict['goal']
        let v = lessonDict['v']
        let v2 = lessonDict['v2']
        let path = lessonDict['path']
        let dataset = lessonDict['dataset']
        let vHashes = lessonDict['vHashes']
        let l = new Lesson(
            name == undefined ? '' : name,
            criteria == undefined ? '' : criteria,
            goal == undefined ? this.goal : goal,
            v == undefined ? [] : v,
            v2 == undefined ? [] : v2,
            dataset == undefined ? {} : dataset,
            path == undefined ? '' : path
        )
        if (vHashes != undefined) {
            l.setVHashes(vHashes)
        }
        return l
    }
}
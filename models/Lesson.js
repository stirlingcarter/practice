import { v4 as uuidv4 } from 'uuid';
import Util from '../services/Util';

export default class Lesson {

    name = ''
    criteria = ''
    groupName = ''
    goal = 2
    v = [] //variants, e,g, [maj7, min7]
    v2 = []
    vHashes = []

    // historical times for each *variant* (e.x. A$DOM$LH) 
    dataset = {
        // {A$dom$LH" : [5,5,6,5,4,3,4,5,3,2,4,3,2,1,3,2,1,1,1]},
        // {B$dom$LH" : [5,5,6,5,4,3,4,5,3,2,4,3,2,1,3,2,1,1,1]}...
    }

    constructor(name, criteria, groupName, goal, v, v2){ 
        this.name=name
        this.criteria=criteria
        this.groupName=groupName
        this.goal=goal
        this.v = v == null ? [] : v
        this.v2 = v2 == null ? [] : v2
        this.populateDatasetWithVariants()
        this.vHashes = Object.keys(this.dataset)
        
    }

    populateDatasetWithVariants(){
        let combinedVariants = this.getCombinedVariants()
        let vHashes = this.getCombinedVariants(Util.NOTES,combinedVariants)
        for (const vHash of vHashes) { // vHash : A$maj7$LH
            dataset[vHash] = []
        }
    }

    getCombinedVariants(){
        if (this.v.length == 0 && this.v2.length == 0){
            return []
        }else if (this.v.length != 0 && this.v2.length == 0){
            return this.v
        }else if (this.v.length == 0 && this.v2.length != 0){
            return this.v2
        }else{
            variants = []
            for (i = 0; i < this.v.length; i++) { 
            for (k = 0; k < this.v2.length; k++) { 
                variants.push(this.v[i] + "$" + this.v2[k])
            }
            }
            return variants
        }
    }

    getGroupName(){
        return this.groupName
    }

    getTimesByVHash(vHash){
        return Util.copyOf(this.dataset[vHash])
    }

    isEmpty(vHash){
        return this.dataset[vHash].length > 0
    }

    getVHashes(){
        return Util.copyOf(this.vHashes)
    }

    getGoal(){
        return this.goal
    }

    getCriteria(){
        return this.criteria
    }

    registerTime(diff, vHash){
        this.dataset[vHash].push[diff]
    }

    totalTimes(vHash){
        return this.dataset[vHash].length
    }

    getSpecificTime(vHash, index){
        return this.dataset[vHash][index]
    }

    getDataset(){
        return Util.copyOf(this.dataset)
    }

    getName(){
        return this.name;
    }

    getWindowOfTimes(vHash, window) {
        let ans = []
        let i = this.totalTimes(vHash)-1
        let w = window
        while (i > -1 && w > 0){
            ans.unShift(this.getSpecificTime())//add to beginning lol
            i--
            w--
        }
        return ans
    }
}
import Util from '../services/Util';
import Constants from '../constant/Constants';
import { type } from 'os';
import { timeStamp } from 'console';

export default class ShapedStats {

    TYPE = Constants.LESSON_TYPE_TIMED
    VGROUPS = 3

    dataset = {
        radialCharts: {
            v1: {
                variantNames: [],
                adjustedWindowedAverages: [],
            },
            v2: {
                variantNames: [],
                adjustedWindowedAverages: [],
            },
            v3: {
                variantNames: [],
                adjustedWindowedAverages: [],
            }
        },
        totalIncreaseAvg: {
            baselineAvg: 0,
            currentAvg: 0,
        },
        variantHiMidLowLineChart: {
            low: [],//erach of these is a list of coordinates.
            mid: [],
            high: []
            //average, best, worst avg speed 
            //overlayed on top of each other in diff colors 
        },

        vHashHiMidLowLineChart: {
            low: [],//erach of these is a list of coordinates.
            mid: [],
            high: []
            //average, best, worst avg speed 
            //overlayed on top of each other in diff colors 
        
        }
    }


    datasetBpm = {
        radialCharts: {
            v1: {
                variantNames: [],
                adjustedWindowedAverages: [],
            },
            v2: {
                variantNames: [],
                adjustedWindowedAverages: [],
            },
            v3: {
                variantNames: [],
                adjustedWindowedAverages: [],
            }
        },
        totalIncreaseAvg: {
            startingBpm: 0,
            currentBpm: 0,
        },
        variantHiMidLowLineChart: {
            low: [],//erach of these is a list of coordinates.
            mid: [],
            high: []
            //avg tries 
            //overlayed on top of bpm
        
        },

        vHashHiMidLowLineChart: {
            low: [],//erach of these is a list of coordinates.
            mid: [],
            high: []
            //average, best, worst avg tries
            //overlayed on top of bpm
        
        }
    }
        

    constructor() {
    }

    generateDataset(lesson){
        this.TYPE = lesson.getType()
        this.VGROUPS = lesson.getNumbertOfVariantGroups()
        
        if (this.TYPE == Constants.LESSON_TYPE_TIMED) {
            this.filloutDataset(lesson)
            this.datasetBpm = {}
        }else{
            this.filloutDatasetBpm(lesson)
            this.dataset = {}
        }
    }

    getDataset() {
        if (this.TYPE == Constants.LESSON_TYPE_TIMED) {
            return this.record
        }
        else {
            return this.recordBpm
    }}

    setDataset(dataset, type){
        if (type == Constants.LESSON_TYPE_TIMED) {
            this.dataset = dataset
        }
        else {
            this.datasetBpm = dataset
        }
    }

    setType(type){
        this.TYPE = type
    }

    setVGroups(vGroups){
        this.VGROUPS = vGroups
    }


    static fromJSONStringified(shapedStatsString) {
        let shapedStatsDict = JSON.parse(shapedStatsString)

        let type = shapedStatsDict['TYPE']
        let vGroups = shapedStatsDict['VGROUPS']

        let dataset = shapedStatsDict['dataset']
        let datasetBpm = shapedStatsDict['datasetBpm']

        let ss = new ShapedStats()
        ss.setDataset(dataset != undefined ? dataset : datasetBpm, type)
        ss.setType(type)
        ss.setVGroups(vGroups)

        return ss
    }

}
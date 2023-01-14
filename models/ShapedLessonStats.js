import Util from '../services/Util';
import Constants from '../constant/Constants';
import Lesson from './Lesson';

const LIMIT = 30 * 1000
const GRAPH_LEADER_LOOKBACK = 1
export default class ShapedLessonStats {

    TYPE = Constants.LESSON_TYPE_TIMED
    VGROUPS = 3

    dataset = {
        radialCharts: {
            v0: {
                variantNames: undefined,
                adjustedWindowedAverages: undefined,
            },
            v1: {
                variantNames: undefined,
                adjustedWindowedAverages: undefined,
            },
            v2: {
                variantNames: undefined,
                adjustedWindowedAverages: undefined,
            }
        },
        totalIncreaseAvg: {
            baselineAvg: 0,
            currentAvg: 0,
        },
        variantHiMidLowLineChart: {
        },

        vHashHiMidLowLineChart: {

        },
        allLineChart: {

        },
    }

    datasetBpm = {
        totalIncreaseAvg: {
            startingBpm: 0,
            currentBpm: 0,
        },
        vHashToBpmToAvgTriesLineChartBpm: {
            // A$dom$LH" : [[60,61,62..],[5,7,9...]]
            // VHASH          BPM          AVG TRIES
            //TODO nah fam just do LMH DONE

        },
        scatter: undefined

    }

    constructor() {
    }

    getRadialV0() {
        return this.dataset.radialCharts.v0.adjustedWindowedAverages.length > 0 ? this.dataset.radialCharts.v0.adjustedWindowedAverages : undefined
    }

    generateDataset(lesson) {
        this.TYPE = lesson.getType()
        this.VGROUPS = lesson.getNumberOfVariantGroups()

        try {
            if (this.TYPE == Constants.LESSON_TYPE_TIMED) {
                this.filloutDataset(lesson)
                this.datasetBpm = {}
            } else {
                this.filloutDatasetBpm(lesson)
                this.dataset = {}
            }
        } catch (error) {
            alert("error generating shaped stats: " + error)
        }

    }

    getDataset() {
        if (this.TYPE == Constants.LESSON_TYPE_TIMED) {
            return this.dataset != undefined ? this.dataset : undefined
        }
        else {
            return this.datasetBpm != undefined ? this.datasetBpm : undefined
        }
    }

    setDataset(dataset, type) {
        if (type == Constants.LESSON_TYPE_TIMED) {
            this.dataset = dataset
        }
        else {
            this.datasetBpm = dataset
        }
    }

    setType(type) {
        this.TYPE = type
    }

    setVGroups(vGroups) {
        this.VGROUPS = vGroups
    }

    getVHashToBpmToAvgTriesLineChart(lesson) {
        let tries = lesson.getDataset()
        let bpms = lesson.getBpms()
        let ans = {}

        let vHashesWithTimes = lesson.getVHashes().filter((vHash) => lesson.getTimesByVHash(vHash) != undefined && lesson.getTimesByVHash(vHash).length != 0)
        if (vHashesWithTimes == undefined || vHashesWithTimes.length == 0) { return ans }

        let worstVHash, bestVHash;
        let worstVHashSum = Number.MIN_SAFE_INTEGER;
        let bestVHashSum = Number.MAX_SAFE_INTEGER;
        vHashesWithTimes.forEach(vHash => {
            let last10 = tries[vHash].slice(-10);
            let length = last10.length;
            let sum = last10.reduce((sum, val) => sum + val, 0);
            let average = sum / length
            if (average > worstVHashSum) {//less tries is better
                worstVHashSum = average;
                worstVHash = vHash;
            }
            if (average < bestVHashSum) {
                bestVHashSum = average;
                bestVHash = vHash;
            }
        });



        ans[worstVHash] = this.getBpmToAvgTries(tries[worstVHash], bpms[worstVHash])
        ans[bestVHash] = this.getBpmToAvgTries(tries[bestVHash], bpms[bestVHash])
        ans["AVG"] = this.getBpmToAvgTries(vHashesWithTimes.map((vHash) => { return tries[vHash] }).reduce((acc, curr) => acc.concat(curr), []), vHashesWithTimes.map((vHash) => { return bpms[vHash] }).reduce((acc, curr) => acc.concat(curr), []))
        return ans

    }


    getBpmToAvgTries(tries, bpms) {
        const bpmGroups = tries.reduce((acc, t, i) => {
            const b = bpms[i]
            if (!acc[b]) acc[b] = []
            acc[b].push(t)
            return acc
        }, {})


        const uniqueBpms = []


        const averageTimes = []
        for (const bpm in bpmGroups) {
            const bpmTimes = bpmGroups[bpm]
            uniqueBpms.push(bpm)
            averageTimes.push(bpmTimes.reduce((a, b) => a + b, 0) / bpmTimes.length)
        }
        //get the min and max from above list uniqueBpms



        return [uniqueBpms, averageTimes]
    }


    static fromJSONStringified(ShapedLessonStatsString) {
        let ShapedLessonStatsDict = JSON.parse(ShapedLessonStatsString)

        let type = ShapedLessonStatsDict['TYPE']
        let vGroups = ShapedLessonStatsDict['VGROUPS']

        let dataset = ShapedLessonStatsDict['dataset']
        let datasetBpm = ShapedLessonStatsDict['datasetBpm']

        let ss = new ShapedLessonStats()
        ss.setDataset(dataset != undefined ? dataset : datasetBpm, type)
        ss.setType(type)
        ss.setVGroups(vGroups)

        return ss
    }


    filloutDataset(lesson) {
        let vHashesWithTimes = lesson.getVHashes().filter((vHash) => lesson.getTimesByVHash(vHash) != undefined && lesson.getTimesByVHash(vHash).length != 0)

        let baselineAvg = 0
        vHashesWithTimes.forEach((vHash) => {
            baselineAvg += lesson.getTimesByVHash(vHash)[0]
        })
        baselineAvg = baselineAvg / vHashesWithTimes.length

        let currentAvg = 0
        vHashesWithTimes.forEach((vHash) => {
            currentAvg += lesson.getTimesByVHash(vHash)[lesson.getTimesByVHash(vHash).length - 1]//i use length-1 instead of -1 because javascript is broken. The language feature of -1 is supposed to return the last element of an array, but it doesn't work. This is a known bug in javascript. It exists because the language authors are idiots.
        })
        currentAvg = currentAvg / vHashesWithTimes.length

        this.dataset = {
            radialCharts: this.getRadialCharts(lesson),
            totalIncreaseAvg: {
                baselineAvg: baselineAvg,
                currentAvg: currentAvg,
            },
            vHashHiMidLowLineChart: this.getVHashToTimesVHashLineChart(lesson),
            variantHiMidLowLineChart: this.getVariantToTimesVariantLineChart(lesson),
            allLineChart: this.getAllLineChart(lesson),
        }
    }

    getHistoricalAverages(sublists) {
        let averages = [];


        // Find the length of the longest sublist
        let minLength = Math.min(...sublists.map(sublist => sublist.length));
        // Initialize the averages array with zeroes
        for (let i = 0; i < minLength; i++) {
            averages[i] = 0;
        }

        // Sum up the values for each index in the sublists
        sublists.forEach(sublist => {
            for (let i = 0; i < minLength; i++) {
                averages[i] += sublist[i];
            }
        })

        // alert(JSON.stringify(averages))

        return averages.map((avg) => { return avg / sublists.length });
    }

    getVHashToTimesVHashLineChart(lesson) {
        let times = lesson.getDataset()
        let vHashesWithTimes = lesson.getVHashes().filter((vHash) => lesson.getTimesByVHash(vHash) != undefined && lesson.getTimesByVHash(vHash).length != 0)
        if (vHashesWithTimes == undefined || vHashesWithTimes.length == 0) { return {} }

        let worstVHash, bestVHash;
        let worstVHashSum = Number.MIN_SAFE_INTEGER;
        let bestVHashSum = Number.MAX_SAFE_INTEGER;
        vHashesWithTimes.forEach(vHash => {

            let last10 = times[vHash].slice(-1 * GRAPH_LEADER_LOOKBACK);
            let length = last10.length;
            let sum = last10.reduce((sum, val) => sum + val, 0);
            let average = sum / length
            if (average > worstVHashSum) {//less timie is better
                worstVHashSum = average;
                worstVHash = vHash;
            }
            if (average < bestVHashSum) {
                bestVHashSum = average;
                bestVHash = vHash;
            }
        });

        let avgs = this.getHistoricalAverages(Object.values(lesson.getDataset()))
        let ans = {}
        ans[Util.getVHashPretty(worstVHash) + " [current slowest]"] = this.getHistoricalTimesSpacedToTotalN(lesson.getTimesByVHash(worstVHash), avgs.length).map(y => y / 1000)
        ans[Util.getVHashPretty(bestVHash) + " [current leader]"] = this.getHistoricalTimesSpacedToTotalN(lesson.getTimesByVHash(bestVHash), avgs.length).map(y => y / 1000)
        ans["[Average (cross section)]"] = avgs.map(y => y / 1000)
        return Util.addIndexList(ans)//yes, yes. 
    }

    getAllLineChart(lesson) {
        let ans = {}
        ans["All times"] = lesson.getAllTimes().map(y => y / 1000)
        return Util.addIndexList(ans)//yes, yes. 
    }

    getVariantToTimesVariantLineChart(lesson) {
        let times = lesson.getVariantDataset()

        let variantsWithTimes = lesson.getAllVariants().filter((v) => lesson.getVariantTimesByVariant(v) != undefined && lesson.getVariantTimesByVariant(v).length != 0)
        if (variantsWithTimes == undefined || variantsWithTimes.length == 0) { return {} }

        let worstVariant, bestVariant;
        let worstVariantSum = Number.MIN_SAFE_INTEGER;
        let bestVariantSum = Number.MAX_SAFE_INTEGER;
        variantsWithTimes.forEach((variant) => {
            let last10 = times[variant].slice(-1 * GRAPH_LEADER_LOOKBACK);
            let length = last10.length;
            let sum = last10.reduce((sum, val) => sum + val, 0);
            let average = sum / length
            if (average > worstVariantSum) {//less timie is better
                worstVariantSum = average;
                worstVariant = variant;
            }
            if (average < bestVariantSum) {
                bestVariantSum = average;
                bestVariant = variant;
            }
        });

        alert(worstVariant)

        let avgs = this.getHistoricalAverages(Object.values(lesson.getVariantDataset()))
        let ans = {}
        ans[worstVariant + " [current slowest]"] = this.getHistoricalTimesSpacedToTotalN(lesson.getVariantTimesByVariant(worstVariant), avgs.length).map(y => y / 1000)
        ans[bestVariant + " [current leader]"] = this.getHistoricalTimesSpacedToTotalN(lesson.getVariantTimesByVariant(bestVariant), avgs.length).map(y => y / 1000)
        ans["[Average (cross section)]"] = avgs.map(y => y / 1000)
        return Util.addIndexList(ans)//yes,

    }

    getHistoricalTimesSpacedToTotalN(times, totalN) {
        let n = times.length
        if (totalN > n) {
            return times
        }
        let ans = []
        for (let i = 0; i < totalN; i++) {
            let index = Math.floor(i * n / totalN)
            ans.push(times[index])
        }
        return ans
    }


    filloutDatasetBpm(lesson) {
        let vHashToBpmToAvgTriesLineChartBpm = this.getVHashToBpmToAvgTriesLineChart(lesson)
        if (vHashToBpmToAvgTriesLineChartBpm == undefined || Object.keys(vHashToBpmToAvgTriesLineChartBpm).length == 0) { return undefined }
        // alert(JSON.stringify(vHashToBpmToAvgTriesLineChartBpm))
        let uniqueBpms = vHashToBpmToAvgTriesLineChartBpm["AVG"][0]

        this.datasetBpm = {
            totalIncreaseAvg: {
                startingBpm: uniqueBpms[0],
                currentBpm: uniqueBpms[uniqueBpms.length - 1]
            },
            vHashToBpmToAvgTriesLineChartBpm: vHashToBpmToAvgTriesLineChartBpm,
            scatter: this.getScatter(lesson),
        }

    }

    getScatter(lesson) {
        let coordinates = lesson.getAllTimes().map((t, _i) => {
            return { x: t[1], y: t[0] }
        }
        )
        return coordinates

    }
    getRadialCharts(lesson) {
        return {
            v0: this.getRadialChart(lesson.getVariantDataset(), lesson.getNotes(), lesson.getGoal()),
            v1: this.getRadialChart(lesson.getVariantDataset(), lesson.getV(), lesson.getGoal()),
            v2: this.getRadialChart(lesson.getVariantDataset(), lesson.getV2(), lesson.getGoal()),
        }

    }

    //variantNames is a list of a sector of variantDatasets keys 
    getRadialChart(variantDataset, variantNames, goal) {
        if (variantNames == undefined || variantNames.length == 0) {
            return {
            }
        }
        let adjustedWindowedAvgs = []
        variantNames.forEach((vName) => {
            adjustedWindowedAvgs.push(this.getAdjustedWindowedAverage(variantDataset[vName], goal))
        })
        return {
            variantNames: variantNames,
            adjustedWindowedAverages: adjustedWindowedAvgs
        }
    }

    f(x, goal) {

        let g = goal * 1000

        //approach 100 as x approaches  0
        //approach 0 as x approaches inf  
        if (x == 0 || x > LIMIT) {
            return 10
        } if (x <= g) {
            return 100
        }
        let diffFromGoal = (x - g) / 1000
        let ret = 100 - (16.4317 * Math.sqrt(diffFromGoal))
        return (ret > 0 ? ret : 10)
    }

    getAdjustedWindowedAverage(variantTimes, goal) {
        let windowedAvg = Util.arrayAvg(Util.getWindowOfTimes(variantTimes, Constants.TIMES_WINDOW_SIZE))
        return this.f(windowedAvg, goal)
    }

}
import * as React from "react";
import {
  Text,
  View
} from "react-native";
import { lessonRepository, statService, groupRepository} from "../App"
import { ScrollView } from "react-native-gesture-handler";
import { LessonCategoryRadarChartComponent } from "../components/LessonCategoryRadarChartComponent";
import { LessonCategoryLineChartComponent } from "../components/LessonCategoryLineChartComponent";
import Path from "../services/Path";
import Constants from "../constant/Constants";
import Util from "../services/Util";

const DOMAIN = { y: [0, 100] }
const LIMIT = 30 * 1000

export class GroupStatsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.setState({

    });
  }

  componentWillUnmount() {

  }

  //entered at mount due to state channge
  componentDidUpdate() {
  }

  f(x) {

    let goal = this.props.lesson.getGoal() * 1000

    //approach 100 as x approaches  0
    //approach 0 as x approaches inf  
    if (x == 0 || x > LIMIT) {
      return 10
    } if (x <= goal) {
      return 100
    }
    let diffFromGoal = (x - goal) / 1000
    let ret = 100 - (16.4317 * Math.sqrt(diffFromGoal))
    return (ret > 0 ? ret : 10)
  }

  render() {

    //1. weakest variants 
    let lessons = lessonRepository.getAllLessonsRecursiveFlatByParentGroupPath(this.props.path)

    //All of these are structured like normal lesson datasets. VHashes map to list of times - or bpms. 
    let timedDatasets = lessons.filter(lesson => lesson.getType() == Constants.LESSON_TYPE_TIMED).map(lesson => lesson.getDataset())
    let triesDatasets = lessons.filter(lesson => lesson.getType() == Constants.LESSON_TYPE_TRIES).map(lesson => lesson.getDataset())
    let bpmDatasets = lessons.filter(lesson => lesson.getType() == Constants.LESSON_TYPE_TRIES).map(lesson => lesson.getBPMs())
    //ABOVE TWO DATASETS SHOULD HAVE MATCHING KEYS THAT MAP TO LISTS WITH MATCHING LENGTHS. 
    //CONVERT THESE TO A SINGLE DATASET WITH VHASHES AS KEYS THAT MAP TO A LIST OF PAIRS EACH CONTAINING A TIME AND CORRESPONDING BPM. USE A LIST FOR THE PAIRS
    let aggTriesAndBPMPairsDatasets = []

    for (let i = 0; i < triesDatasets.length; i++) {
      let triesDs = triesDatasets[i]
      let bpmsDs = bpmDatasets[i]
      aggTriesAndBPMPairsDatasets.push(Util.pairTriesAndBPMsDatasets(triesDs, bpmsDs))
    }

    /* FINAL TIMED RESULT 
  returns -> 
      { "a" : 
        [[2,6,3,6,4,7,6,4,8,2,6,7]
      "b" :
        [[5,2,6,7,3,....]
      }
*/
    /* FINAL BPM RESULT 
  returns -> 
      { "a" : 
        [[(2,49),(6,50),(3,50),(6,52),(4,53),(7,54),(6,55),(4,56),(8,57),(2,58),(6,59),(7,60)]
        ....
*/
    let timedResult = statService.getAllInterleavedTimesByVariant(timedDatasets)
    let triesResult = statService.getAllInterleavedTimesByVariant(aggTriesAndBPMPairsDatasets)


    return (<ScrollView><Text>{("\n\n\n\n\n\n\n\n\n" + JSON.stringify(timedResult) + "\n\n\n\n" + JSON.stringify(triesResult)).replace(/,/g, ",\n")}</Text></ScrollView>)

    


    let recentAvgsByLessonName = {}
    let originalAvgsByLessonName = {}
    // let lessons = lessonNames.map(name => {
    //   lessonRepository.getLessonByPath(Path.Plus(this.props.path, name))
    // })
    for (lesson of lessons) {



      /*
  returns -> 
      { "lesson1" : 
        [[[2,6,3,6,4,7,6,4,8,2,6,7],
        [5,2,6,7,3],
        [1,6]],
        [[a,b,c....g],
        [maj7,m7...d7],
        [left,right]]],...
      }
*/
      recentAvgsByLessonName[name] = statsService.getRecentAveragesByVariant(lesson)
      /*
  returns -> 
      { "lesson1" : 
        [[[2,6,3,6,4,7,6,4,8,2,6,7],
        [5,2,6,7,3],
        [1,6]],
        [[a,b,c....g],
        [maj7,m7...d7],
        [left,right]]],...
      }
*/
      originalAvgsByLessonName[name] = statsService.getOriginalAveragesByVariant(lesson)
    }

    /*
    still returns -> 
    { "lesson1" : 
        [[[100,600,300,60,40,70,60,40,80,200,60,70],
        [50,200,60,70,300],
        [100,60]],
        [[a,b,c....g],
        [maj7,m7...d7],
        [left,right]]],...
    }
*/
    let lessonNameToPercentsImproved = {}
    for (lesson of lessons) {
      lessonNameToPercentImproved[lesson.getName()] = getPercentImproved(originalAvgsByLessonName[lesson.getName()], recentAvgsByLessonName[lesson.getName()])
    }


    /*
just returns -> 
 
    [[[100,600,300,60,40,70,60,40,80,200,60,70],
    [50,200,60,70,300],
    [100,60]],
    [[a,b,c....g],
    [maj7,m7...d7],
    [left,right]]],...
    ***HURR***
*/
    let variantToOverallAvgImprovement = this.getOverallAvgImprovementByVariant(lessonNameToPercentsImproved)


        /*
    returns -> 
 
    [[[1,6,3,6,4,7,6,4,8,2,6,7],
    [5,2,6,7,3],
    [1,6]],
    [[a,b,c....g],
    [maj7,m7...d7],
    [left,right]]],...
    ***HURR***
*/
    let variantToOverallAvgTime = this.getVariantToOverallAvgTime(Util.copyOf(lessonNameToPercentsImproved))

    let slowestVariants = this.getReduceEachListToMax(Util.copyOf(variantToOverallAvgTime))
    let fastestVariants = this.getReduceEachListToMin(Util.copyOf(variantToOverallAvgTime))

    let lessonNamesMapToImprovements = Object.keys(lessonNameToPercentImproved)
    let lessonImprovements = lessonNamesMapToImprovements.map(key => {
        getSingularLessonAvg(lessonNameToPercentsImproved[key])
    })
    let maxIndex = 0;
    let max = -13876;
    for (let i = 0; i < lessonImprovements.length; i++){
      let thisLessonImproved = lessonImprovements[i]
      if (thisLessonImproved > max){
        max = thisLessonImproved
        maxIndex = i
      }
    }
    let mostImprovedLessonName = lessonNamesMapToImprovements[maxIndex]
    let mostImprovedLessonImprovement = lessonImprovements[maxIndex]

    
    let variantsWithMostImprovementOverall = this.getReduceEachListToMax(Util.copyOf(variantToOverallAvgImprovement))
    /*
    Lesson with most improvement overall(1) -> mostImprovedLessonName CHECK
      - list - % improvement by lesson(no#lessons) -> vars lessonNamesMapToImprovements, lessonImprovements CHECK

    Variant with most improvement overall(3) -> variantsWithMostImprovementOverall CHECK
      - list - % improvement by variant(no#variants)(3) -> variantToOverallAvgImprovement CHECK
    Strongest Variant(3) - slowestVariants CHECK
    Weakest Variant(3) - fastestVariants CHECK
    
    */ 









    //get historical averages for each variant we see in this group
    //1. get a list of all unique vartiants in the group 
    //2. now, using those names as keys, create dict mapping them to constructed times array for their whole history
    // a big task of course d
    //3. now you can get a window from there to create a radial chart or the whole thing to make a line chart 
    //  - for each category of variant represented. 

    let response = statService.getRecentAveragesByVariant(this.props.lesson)
    let averagesByVariant = response[0]
    let namesOfVariants = response[1]
    let adjustedAveragesByVariant = []
    for (let i = 0; i < averagesByVariant.length; i++) {
      let adjustedList = []
      for (let k = 0; k < averagesByVariant[i].length; k++) {
        adjustedList.push(this.f(averagesByVariant[i][k]))
      }
      adjustedAveragesByVariant.push(adjustedList)
    }
    if (adjustedAveragesByVariant.length == 1) {
      return (
        <ScrollView>

          <LessonCategoryRadarChartComponent averages={adjustedAveragesByVariant[0]} namesOfVariants={namesOfVariants[0]} />
          <LessonCategoryLineChartComponent namesOfVariants={namesOfVariants[0]} lesson={this.props.lesson} />

        </ScrollView>

      );
    } else if (adjustedAveragesByVariant.length == 2) {


      return (
        <ScrollView>

          <LessonCategoryRadarChartComponent averages={adjustedAveragesByVariant[0]} namesOfVariants={namesOfVariants[0]} />
          <LessonCategoryRadarChartComponent averages={adjustedAveragesByVariant[1]} namesOfVariants={namesOfVariants[1]} />
          <LessonCategoryLineChartComponent namesOfVariants={namesOfVariants[0]} lesson={this.props.lesson} />
          <LessonCategoryLineChartComponent namesOfVariants={namesOfVariants[1]} lesson={this.props.lesson} />

        </ScrollView>


      );
    } else if (adjustedAveragesByVariant.length == 3) {

      return (

        <ScrollView>

          <LessonCategoryRadarChartComponent averages={adjustedAveragesByVariant[0]} namesOfVariants={namesOfVariants[0]} />
          <LessonCategoryRadarChartComponent averages={adjustedAveragesByVariant[1]} namesOfVariants={namesOfVariants[1]} />
          <LessonCategoryRadarChartComponent averages={adjustedAveragesByVariant[2]} namesOfVariants={namesOfVariants[2]} />
          <LessonCategoryLineChartComponent namesOfVariants={namesOfVariants[0]} lesson={this.props.lesson} />
          <LessonCategoryLineChartComponent namesOfVariants={namesOfVariants[1]} lesson={this.props.lesson} />
          <LessonCategoryLineChartComponent namesOfVariants={namesOfVariants[2]} lesson={this.props.lesson} />


        </ScrollView>


      );
    } else {
      return (<View><Text>huh?</Text></View>)
    }
  }
}

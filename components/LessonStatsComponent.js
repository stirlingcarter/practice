import * as React from "react";
import {
  Text,
  View
} from "react-native";
import { statService } from "../App"
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { LessonCategoryRadarChartComponent } from "../components/LessonCategoryRadarChartComponent";
import { LessonCategoryLineChartComponent } from "../components/LessonCategoryLineChartComponent";
import Util from "../services/Util";
import Constants from "../constant/Constants";
import { BPMLineChartComponent } from "./BPMLineChartComponent";
import { allTheStyles } from "../styles/allTheStyles";
import ShapedLessonStats from "../models/ShapedLessonStats";
const DOMAIN = { y: [0, 100] }
const LIMIT = 30 * 1000

export class LessonStatsComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      shapedStats: undefined
    };

  }

  componentDidMount() {
    let sls = new ShapedLessonStats();
    sls.generateDataset(this.props.lesson);
    this.setState({shapedStats: sls});
    // alert(sls.radialCharts.v0.adjustedWindowedAverages)

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

  // generateStats() {
  //   let sls = this.state.shapedStats
  //   sls.generateDataset(this.props.lesson)
  //   this.setState({ shapedStats: sls })
  // }



  render() {

    if (true){
      return (
        <View>
            <Text style={{color: "white", fontSize: 40, top:200}} onPress={this.generateStats}>Generate stats</Text>
        <ScrollView>
          {this.state.shapedStats && this.state.shapedStats.dataset.radialCharts.v0.adjustedWindowedAverages ? <LessonCategoryRadarChartComponent averages={this.state.shapedStats.dataset.radialCharts.v0.adjustedWindowedAverages} namesOfVariants={this.props.lesson.getNotes()} /> : null}
          {this.state.shapedStats && this.state.shapedStats.dataset.radialCharts.v1.adjustedWindowedAverages ? <LessonCategoryRadarChartComponent averages={this.state.shapedStats.dataset.radialCharts.v1.adjustedWindowedAverages} namesOfVariants={this.props.lesson.getV()} /> : null}
          {this.state.shapedStats && this.state.shapedStats.dataset.radialCharts.v2.adjustedWindowedAverages ? <LessonCategoryRadarChartComponent averages={this.state.shapedStats.dataset.radialCharts.v2.adjustedWindowedAverages} namesOfVariants={this.props.lesson.getV2()} /> : null}

          {this.state.shapedStats && this.state.shapedStats.dataset.variantHiMidLowLineChart ? <LessonCategoryLineChartComponent shapedData={this.state.shapedStats.dataset.variantHiMidLowLineChart} /> : null}
          {this.state.shapedStats && this.state.shapedStats.dataset.vHashHiMidLowLineChart ? <LessonCategoryLineChartComponent shapedData={this.state.shapedStats.dataset.vHashHiMidLowLineChart} /> : null}

          <Text style={{color: "white", fontSize: 40, top:200}} onPress={this.generateStats}>{JSON.stringify(this.state.shapedStats)}</Text>

        </ScrollView>
        </View>)
    }

    let isTries = this.props.lesson.getType() == Constants.LESSON_TYPE_TRIES

    if (isTries) {
      var variantsToTryBPMPairs = Util.pairTriesAndBPMsDatasets(this.props.lesson.getDataset(), this.props.lesson.getBPMs())
      var allSingleKeys = Object.keys(variantsToTryBPMPairs)
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

          <LessonCategoryRadarChartComponent averages={adjustedAveragesByVariant[0]} namesOfVariants={namesOfVariants[0].map(v => Util.getNoParens(v))} />
          <LessonCategoryLineChartComponent namesOfVariants={namesOfVariants[0]} lesson={this.props.lesson} />
          {<Text>{isTries && JSON.stringify(Util.pairTriesAndBPMsDatasets(this.props.lesson.getDataset(), this.props.lesson.getBPMs())).replace(/,/g, ",\n")}</Text>}
          {isTries && allSingleKeys.map((key) => {
            <View>
              <Text>{key}</Text>
              <LessonCategoryLineChartComponent lesson={undefined} namesOfVariants={["TRIES", "BPM"]} times={variantsToTryBPMPairs[key].map(p => p[0])} bpms={variantsToTryBPMPairs[key].map(p => p[1])} vHashes={this.props.lesson.getVHashes()} />
            </View>
          }


          )}

        </ScrollView>

      );
    } else if (adjustedAveragesByVariant.length == 2) {

      return (
        <ScrollView>

          <LessonCategoryRadarChartComponent averages={adjustedAveragesByVariant[0]} namesOfVariants={namesOfVariants[0].map(v => Util.getNoParens(v))} />
          <LessonCategoryRadarChartComponent averages={adjustedAveragesByVariant[1]} namesOfVariants={namesOfVariants[1].map(v => Util.getNoParens(v))} />
          <LessonCategoryLineChartComponent namesOfVariants={namesOfVariants[0]} lesson={this.props.lesson} />
          <LessonCategoryLineChartComponent namesOfVariants={namesOfVariants[1]} lesson={this.props.lesson} />
          {/* {<Text>{this.props.lesson.getType() == Constants.LESSON_TYPE_TRIES && JSON.stringify(Util.pairTriesAndBPMsDatasets(this.props.lesson.getDataset(),this.props.lesson.getBPMs())).replace(/,/g, ",\n")}</Text>} */}

          {/*Why won't the below component render? */}
          {//the reason is that the below component is not a valid react component. It is a function.
            //so how do we fix this by encapsulating the below code in a react component?
            // all we need to do is to make a react component that takes in the props and returns the below code}

            isTries && <FlatList data={allSingleKeys} renderItem={({ item }) => (
              <View>
                <Text style={{ color: "white", fontSize: 30 }}>{Util.getVHashPretty(item)}</Text>
                <LessonCategoryLineChartComponent lesson={undefined} namesOfVariants={["TRIES", "BPM"]} times={variantsToTryBPMPairs[item].map(pair => pair[0] * 1000)} bpms={variantsToTryBPMPairs[item].map(pair => pair[1])} vHashes={this.props.lesson.getVHashes()} />
              </View>
            )} />
          }

        </ScrollView>


      );
    } else if (adjustedAveragesByVariant.length == 3) {

      return (

        <ScrollView>

          <LessonCategoryRadarChartComponent averages={adjustedAveragesByVariant[0]} namesOfVariants={namesOfVariants[0].map(v => Util.getNoParens(v))} />
          <LessonCategoryRadarChartComponent averages={adjustedAveragesByVariant[1]} namesOfVariants={namesOfVariants[1].map(v => Util.getNoParens(v))} />
          <LessonCategoryRadarChartComponent averages={adjustedAveragesByVariant[2]} namesOfVariants={namesOfVariants[2].map(v => Util.getNoParens(v))} />
          <LessonCategoryLineChartComponent namesOfVariants={namesOfVariants[0]} lesson={this.props.lesson} />
          <LessonCategoryLineChartComponent namesOfVariants={namesOfVariants[1]} lesson={this.props.lesson} />
          <LessonCategoryLineChartComponent namesOfVariants={namesOfVariants[2]} lesson={this.props.lesson} />
          {<Text>{isTries && JSON.stringify(Util.pairTriesAndBPMsDatasets(this.props.lesson.getDataset(), this.props.lesson.getBPMs())).replace(/,/g, ",\n")}</Text>}
          {isTries && allSingleKeys.map((key) => {
            <View>
              <Text style={{ color: "white" }}>{Util.getVHashPretty(key)}</Text>
              <LessonCategoryLineChartComponent lesson={undefined} namesOfVariants={["TRIES", "BPM"]} times={variantsToTryBPMPairs[key].map(p => p[0])} bpms={variantsToTryBPMPairs[key].map(p => p[1])} vHashes={this.props.lesson.getVHashes()} />
            </View>
          }

          )}

        </ScrollView>


      );
    } else {
      return (<View><Text>huh?</Text></View>)
    }
  }
}


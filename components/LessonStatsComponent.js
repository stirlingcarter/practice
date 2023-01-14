import * as React from "react";
import {
  Text,
  View
} from "react-native";
import { statService } from "../App"
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { LessonCategoryRadarChartComponent } from "../components/LessonCategoryRadarChartComponent";
import { LessonCategoryLineChartComponent } from "../components/LessonCategoryLineChartComponent";
import { LessonCategoryScatterPlotComponent } from "../components/LessonCategoryScatterPlotComponent";
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

    if (this.props.lesson.getType() == Constants.LESSON_TYPE_TIMED){
      return (
        <View>
          <ScrollView>
            <Text style={{color: "pink", fontSize: 50, top:40, textAlign: "center"}}>{this.props.lesson.getName()}</Text>
            <Text style={{color: "white", fontSize: 30, top: 40, textAlign: "center"}}>{"Latency goal: " + this.props.lesson.getGoal() + "s"}</Text>
          <Text style={{color: "white", fontSize: 40, marginTop: 50, textAlign: "center"}}>{"Completion by variant"}</Text>

          {this.state.shapedStats && this.state.shapedStats.dataset.radialCharts.v0.adjustedWindowedAverages ? <LessonCategoryRadarChartComponent averages={this.state.shapedStats.dataset.radialCharts.v0.adjustedWindowedAverages} namesOfVariants={this.props.lesson.getNotes()} /> : null}
          {this.state.shapedStats && this.state.shapedStats.dataset.radialCharts.v1.adjustedWindowedAverages ? <LessonCategoryRadarChartComponent averages={this.state.shapedStats.dataset.radialCharts.v1.adjustedWindowedAverages} namesOfVariants={this.props.lesson.getV()} /> : null}
          {this.state.shapedStats && this.state.shapedStats.dataset.radialCharts.v2.adjustedWindowedAverages ? <LessonCategoryRadarChartComponent averages={this.state.shapedStats.dataset.radialCharts.v2.adjustedWindowedAverages} namesOfVariants={this.props.lesson.getV2()} /> : null}

          {this.state.shapedStats && this.state.shapedStats.dataset.allLineChart ? <LessonCategoryLineChartComponent shapedData={this.state.shapedStats.dataset.allLineChart} /> : null}
          {this.state.shapedStats && this.state.shapedStats.dataset.variantHiMidLowLineChart ? <LessonCategoryLineChartComponent shapedData={this.state.shapedStats.dataset.variantHiMidLowLineChart} /> : null}
          {this.state.shapedStats && this.state.shapedStats.dataset.vHashHiMidLowLineChart ? <LessonCategoryLineChartComponent shapedData={this.state.shapedStats.dataset.vHashHiMidLowLineChart} /> : null}


        </ScrollView>
        </View>)
    } else if (this.props.lesson.getType() == Constants.LESSON_TYPE_TRIES) {
      return (
        <View>
          <ScrollView>
            <Text style={{color: "pink", fontSize: 50, top:40, textAlign: "center"}}>{this.props.lesson.getName()}</Text>
            <Text style={{color: "white", fontSize: 30, top: 40, textAlign: "center"}}>{"Latency goal: " + this.props.lesson.getGoal() + " bpm"}</Text>
          <Text style={{color: "white", fontSize: 40, marginTop: 50, textAlign: "center"}}>{"avg tries by bpm [recent]"}</Text>


          {this.state.shapedStats && this.state.shapedStats.datasetBpm && this.state.shapedStats.datasetBpm.scatter ? <LessonCategoryScatterPlotComponent coordinates={this.state.shapedStats.datasetBpm.scatter} /> : null}
          <Text style={{color: "white", fontSize: 40, top:200}} onPress={this.generateStats}>{JSON.stringify(this.state.shapedStats)}</Text>
</ScrollView>
        </View>)

}}}


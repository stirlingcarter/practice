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

import { lessonRepository } from "../App";
export class LessonStatsComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      shapedStats: undefined
    };

  }

  componentDidMount() {
    let sls = new ShapedLessonStats();
    let refreshedLesson = lessonRepository.getLessonByPath(this.props.lesson.getPath())
    sls.generateDataset(refreshedLesson);
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
          
            <View style={{backgroundColor: "pink", height: 300}}>
            <Text style={allTheStyles.groupScreenTitle}>{this.props.lesson.getName()}</Text>
            <Text style={allTheStyles.statsStyle1}>{"latency eliminated"}</Text>
            {this.state.shapedStats && <Text style={{color: this.state.shapedStats.dataset.latencyElimination < 100 ? "#222222" : "green", fontSize: 40, marginTop: 4, textAlign: "center"}}>{Math.round(this.state.shapedStats.dataset.latencyElimination * 100) / 100 + "%"}</Text>}
            
            <View style={{flexDirection: "row", justifyContent: "center"}}>
            <Text style={allTheStyles.statsStyle3}>{"latency goal: "}</Text>
            <Text style={allTheStyles.statsStyle2}>{this.props.lesson.getGoal() + "s"}</Text>
            </View>
            </View><ScrollView>
          <Text style={allTheStyles.statsStyle1}>{"completion by variant"}</Text>

          {this.state.shapedStats && this.state.shapedStats.dataset.radialCharts.v0.adjustedWindowedAverages ? <LessonCategoryRadarChartComponent averages={this.state.shapedStats.dataset.radialCharts.v0.adjustedWindowedAverages} namesOfVariants={this.props.lesson.getNotes()} /> : null}
          {this.state.shapedStats && this.state.shapedStats.dataset.radialCharts.v1.adjustedWindowedAverages ? <LessonCategoryRadarChartComponent averages={this.state.shapedStats.dataset.radialCharts.v1.adjustedWindowedAverages} namesOfVariants={this.props.lesson.getV()} /> : null}
          {this.state.shapedStats && this.state.shapedStats.dataset.radialCharts.v2.adjustedWindowedAverages ? <LessonCategoryRadarChartComponent averages={this.state.shapedStats.dataset.radialCharts.v2.adjustedWindowedAverages} namesOfVariants={this.props.lesson.getV2()} /> : null}
          <Text style={allTheStyles.statsStyle1}>{"Charts"}</Text>

          {this.state.shapedStats && this.state.shapedStats.dataset.allLineChart ? <LessonCategoryLineChartComponent shapedData={this.state.shapedStats.dataset.allLineChart} /> : null}
          {this.state.shapedStats && this.state.shapedStats.dataset.variantHiMidLowLineChart ? <LessonCategoryLineChartComponent shapedData={this.state.shapedStats.dataset.variantHiMidLowLineChart} /> : null}
          {this.props.lesson.getNumberOfVariantGroups() > 1 && this.state.shapedStats && this.state.shapedStats.dataset.vHashHiMidLowLineChart ? <LessonCategoryLineChartComponent shapedData={this.state.shapedStats.dataset.vHashHiMidLowLineChart} /> : null}
          {<Text style={allTheStyles.statsStyle1}>{"\n\n\n\n\n\n\n\n\n"}</Text>}

      

          {/* {this.state.shapedStats ? <Text style={{color: "white", fontSize: 40, textAlign: "center"}}>{JSON.stringify(this.state.shapedStats.dataset.radialCharts)}</Text> : null} */}
        </ScrollView>
        </View>)
    } else if (this.props.lesson.getType() == Constants.LESSON_TYPE_TRIES) {
      return (
        <View>
          
          <View style={{backgroundColor: "pink", height: 300}}>

          <Text style={allTheStyles.groupScreenTitle}>{this.props.lesson.getName()}</Text>
            {this.state.shapedStats && this.state.shapedStats.datasetBpm &&
            <View>
            <Text style={allTheStyles.statsStyle1}>{"latency eliminated"}</Text>
            <Text style={{color: this.state.shapedStats.datasetBpm.latencyElimination < 100 ? "#222222" : "green", fontSize: 40, marginTop: 4, textAlign: "center"}}>{!this.state.shapedStats.datasetBpm.latencyElimination ? "0%" : Math.round(this.state.shapedStats.datasetBpm.latencyElimination * 100) / 100 + "%"}</Text>
            <View style={{flexDirection: "row", justifyContent: "center"}}>
            <Text style={allTheStyles.statsStyle3}>{"latency goal: "}</Text>
            <Text style={allTheStyles.statsStyle2}>{this.props.lesson.getGoal() + " bpm"}</Text>
            
            </View>
          </View>}
          </View>
          <Text style={allTheStyles.statsStyle1}>{"tries by bpm"}</Text>
          {this.state.shapedStats && this.state.shapedStats.datasetBpm && this.state.shapedStats.datasetBpm.scatter ? <LessonCategoryScatterPlotComponent coordinates={this.state.shapedStats.datasetBpm.scatter} /> : null}
          {<Text style={allTheStyles.statsStyle1}>{"\n\n\n\n\n\n\n\n\n"}</Text>}
          {<Text style={allTheStyles.statsStyle1}>{"\n\n\n\n\n\n\n\n\n"}</Text>}

        </View>)

}}}


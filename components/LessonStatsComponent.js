import * as React from "react";
import {
  Text,
  View
} from "react-native";
import { statService } from "../App"
import { ScrollView } from "react-native-gesture-handler";
import { LessonCategoryRadarChartComponent } from "../components/LessonCategoryRadarChartComponent";
import { LessonCategoryLineChartComponent } from "../components/LessonCategoryLineChartComponent";

const DOMAIN = {y:[0,100]}
const LIMIT = 30 * 1000

export class LessonStatsComponent extends React.Component {

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

  f(x){

    let goal = this.props.lesson.getGoal() * 1000 

    //approach 100 as x approaches  0
    //approach 0 as x approaches inf  
    if (x == 0 || x > LIMIT){
      return 10
    } if (x <= goal){
      return 100 
    }
    let diffFromGoal = (x - goal) / 1000
    let ret = 100 - (16.4317 * Math.sqrt(diffFromGoal))
    return (ret > 0 ? ret : 10)
  }

  render() {
    let response = statService.getAveragesByVariant(this.props.lesson)
    let averagesByVariant = response[0]
    let namesOfVariants = response[1]

    //challengeService.getAveragesByVariant returns -> [
    //            [
    //              [2,6,3,6,4,7,6,4,8,2,6,7],
    //              [5,2,6,7,3],
    //              [1,6]
    //             ],
    //             [
    //              [a,b,c....g],
    //              [maj7,m7...d7],
    //              [left,right]
    //             ]
    //            ]

    let adjustedAveragesByVariant = []
    for (let i = 0; i < averagesByVariant.length; i++){
      let adjustedList = []
      for (let k = 0; k < averagesByVariant[i].length; k++){
        adjustedList.push(this.f(averagesByVariant[i][k]))
      }
      adjustedAveragesByVariant.push(adjustedList)
    }


    if (adjustedAveragesByVariant.length == 1){
      return (
        <ScrollView>
  
        <LessonCategoryRadarChartComponent averages={adjustedAveragesByVariant[0]}  namesOfVariants={namesOfVariants[0]}/>
        <LessonCategoryLineChartComponent namesOfVariants={namesOfVariants[0]} lesson={this.props.lesson}/>

        </ScrollView>
      
      );
    }else if (adjustedAveragesByVariant.length == 2){


      return (
        <ScrollView>
  
        <LessonCategoryRadarChartComponent averages={adjustedAveragesByVariant[0]} namesOfVariants={namesOfVariants[0]}/>
        <LessonCategoryRadarChartComponent averages={adjustedAveragesByVariant[1]} namesOfVariants={namesOfVariants[1]}/>
        <LessonCategoryLineChartComponent namesOfVariants={namesOfVariants[0]} lesson={this.props.lesson}/>
        <LessonCategoryLineChartComponent namesOfVariants={namesOfVariants[1]} lesson={this.props.lesson}/>

        </ScrollView>

      
      );
    }else if (adjustedAveragesByVariant.length == 3){

      return (

        <ScrollView>
  
        <LessonCategoryRadarChartComponent averages={adjustedAveragesByVariant[0]}  namesOfVariants={namesOfVariants[0]}/>
        <LessonCategoryRadarChartComponent averages={adjustedAveragesByVariant[1]}  namesOfVariants={namesOfVariants[1]}/>
        <LessonCategoryRadarChartComponent averages={adjustedAveragesByVariant[2]}  namesOfVariants={namesOfVariants[2]}/>
        <LessonCategoryLineChartComponent namesOfVariants={namesOfVariants[0]} lesson={this.props.lesson}/>
        <LessonCategoryLineChartComponent namesOfVariants={namesOfVariants[1]} lesson={this.props.lesson}/>
        <LessonCategoryLineChartComponent namesOfVariants={namesOfVariants[2]} lesson={this.props.lesson}/>


        </ScrollView>

      
      );
    }else{
      return (<View><Text>huh?</Text></View>)
    }
  }
}

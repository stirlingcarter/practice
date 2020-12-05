import * as React from "react";
import {
  Text,
  View,
  StyleSheet
} from "react-native";
import { HQI } from "../App";
import { VictoryChart, VictoryTheme, VictoryArea, VictoryPolarAxis, VictoryLabel  } from "victory-native";
import { ScrollView } from "react-native-gesture-handler";
import { LessonCategoryRadarChartComponent } from "../components/LessonCategoryRadarChartComponent";

const DOMAIN = {y:[0,100]}
const LIMIT = 30 * 1000

//  want this to be ininviisiible and cover whole screen TODO
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

    let goal = HQI.getLessonGoal() * 1000 

    //approach 100 as x approaches  0
    //approach 0 as x approaches inf  
    if (x == 0 || x > LIMIT){
      return 10
    } if (x <= goal){
      return 100 
    }
    let diffFromGoal = (x - goal) / 1000

    return 100 - (16.4317 * Math.sqrt(diffFromGoal))
  }

  render() {
    let response = HQI.getAveragesByCategory()
    let averagesByCategory = response[0]
    let namesByCategory = response[1]

    //HQI.getAverages returns -> [
      //            [
        //          [2,6,3,6,4,7,6,4,8,2,6,7],
    //              [5,2,6,7,3],
    //              [1,6]
  //                ],
  //                [
    //              [a,b,c....g],
    //              [maj7,m7...d7],
    //              [left,right]
  //                ]
//                                ]

    let adjustedAveragesByCategory = []
    for (let i = 0; i < averagesByCategory.length; i++){
      let adjustedList = []
      for (let k = 0; k < averagesByCategory[i].length; k++){
        adjustedList.push(this.f(averagesByCategory[i][k]))
      }
      adjustedAveragesByCategory.push(adjustedList)
    }

    
    

      

    if (adjustedAveragesByCategory.length == 1){
      return (
        <ScrollView>
  
        <LessonCategoryRadarChartComponent variants={adjustedAveragesByCategory[0]}  names={namesByCategory[0]}/>
  
        </ScrollView>
      
      );
    }else if (adjustedAveragesByCategory.length == 2){

      return (
        <ScrollView>
  
        <LessonCategoryRadarChartComponent variants={adjustedAveragesByCategory[0]} names={namesByCategory[0]}/>
        <LessonCategoryRadarChartComponent variants={adjustedAveragesByCategory[1]} names={namesByCategory[1]}/>

        </ScrollView>

      
      );
    }else if (adjustedAveragesByCategory.length == 3){

      return (

        <ScrollView>
  
        <LessonCategoryRadarChartComponent variants={adjustedAveragesByCategory[0]}  names={namesByCategory[0]}/>
        <LessonCategoryRadarChartComponent variants={adjustedAveragesByCategory[1]}  names={namesByCategory[1]}/>
        <LessonCategoryRadarChartComponent variants={adjustedAveragesByCategory[2]}  names={namesByCategory[2]}/>

        </ScrollView>

      
      );
    }else{
      return (<View><Text>huh?</Text></View>)
    }
  }
}

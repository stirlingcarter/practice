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

const DOMAIN = {y:[0,5]}

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
    //approach 100 as x approaches  0
    //approach 0 as x approaches inf  
    return 10 - x
  }

  render() {







    // ONE in HQ: 


    //make a set of the non meta keys - A$maj7$left
    //make n+1 sets, n = number of $
    //divide each member into proper sets
    //now you have (A,Bb,B....Ab), (maj7,min7....dim7), (left,right), and a master set. 
    //now, make the sets ordered. These sets will be the basis for param. order from here on out.
    //each set member needs a corresponding average time 
    //what is the av for A? 
    //have a getter that gets you all the keys with A from the master set. 
    //from each of those keys' value arrays, get a windowed average. [1,4,5,.............2,4,3,5,4,6,5,7,6,8] average the last 10.
    
    
    
    let averagesByCategory = HQI.getAveragesByCategory()[0]
    let namesByCategory = HQI.getAveragesByCategory()[1]

    //HQI.getAverages returns -> [[[2,6,3,6,4,7,6,4,8,2,6,7],
    //              [5,2,6,7,3],
    //              [1,6]],[[a,b,c....g],
    //              [maj7,m7...d7],
    //              [left,right]]]

    let adjustedAveragesByCategory = []
    for (let i = 0; i< averagesByCategory.length; i++){
      let adjustedList = []
      for (let k = 0; k < averagesByCategory[i].length; k++){
        adjustedList.push(f(averagesByCategory[i][k]))
      }
      adjustedAveragesByCategory.push(adjustedList)
    }
    

      

    if (adjustedAveragesByCategory.length == 0){
      return (
        <ScrollView>
  
        <LessonCategoryRadarChartComponent variants={adjustedAveragesByCategory[0]}  names={namesByCategory[0]}/>
  
        </ScrollView>
      
      );
    }else if (adjustedAveragesByCategory.length == 1){
      return (
        <ScrollView>
  
        <LessonCategoryRadarChartComponent variants={adjustedAveragesByCategory[0]} names={namesByCategory[0]}/>
        <LessonCategoryRadarChartComponent variants={adjustedAveragesByCategory[1]} names={namesByCategory[1]}/>

        </ScrollView>

      
      );
    }else{
      return (
        <ScrollView>
  
        <LessonCategoryRadarChartComponent variants={adjustedAveragesByCategory[0]}  names={namesByCategory[0]}/>
        <LessonCategoryRadarChartComponent variants={adjustedAveragesByCategory[1]}  names={namesByCategory[1]}/>
        <LessonCategoryRadarChartComponent variants={adjustedAveragesByCategory[2]}  names={namesByCategory[2]}/>

        </ScrollView>

      
      );
    }
  }
}

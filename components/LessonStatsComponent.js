import * as React from "react";
import {
  Text,
  View,
  StyleSheet
} from "react-native";
import { HQI } from "../App";
import { VictoryChart, VictoryTheme, VictoryArea, VictoryPolarAxis, VictoryLabel  } from "victory-native";
import { ScrollView } from "react-native-gesture-handler";



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
  }

  render() {

    

    const notesData = [
      {
        x: 1,
        y: 1
      },
      {
        x: 2,
        y: 2
      },
      {
        x: 3,
        y: 3
      },
      {
        x: 4,
        y: 4
      },
      {
        x: 5,
        y: 5
      },
      {
        x: 6,
        y: 6
      },
      {
        x: 7,
        y: 7
      },
      {
        x: 8,
        y: 8
      },
      {
        x: 9,
        y: 9
      },
      {
        x: 10,
        y: 10
      },
      {
        x: 11,
        y: 11
      },
      {
        x: 12,
        y: 12
      }
    ]

    const variantData = [
      {
        x: 1,
        y: 3
      },
      {
        x: 2,
        y: 4
      },
      {
        x: 3,
        y: 3
      },
      {
        x: 4,
        y: 1
      },
    ]

    const variant2Data = [
      {
        x: 1,
        y: 19
      },
      {
        x: 2,
        y: 30
      },
      {
        x: 3,
        y: 22
      },
      {
        x: 4,
        y: 28
      },
      {
        x: 5,
        y: 10
      }
    ]





    // ONE in HQ: 


    //make a set of the non meta keys - A$maj7$left
    //make n+1 sets, n = number of $
    //divide each member into proper sets
    //now you have (A,Bb,B....Ab), (maj7,min7....dim7), (left,right), and a master set 
    //each set member needs a corresponding average time 
    //what is the av for A? 
    //have a getter that gets you all the keys with A from the master set. 
    //from each of those keys' value arrays, get a windowed average. [1,4,5,.............2,4,3,5,4,6,5,7,6,8] average the last 10. 


    // TWO

    //HQI.getAverages returns -> { 0 : [2,6,3,6,4,7,6,4,8,2,6,7]
    //              1: [5,2,6,7,3]
    //              2: [1,6]}
    //each value will get f(x)'d to do a value conversion;
    //and then transformed to meet the variantData pattern. 




    // THREE 
    // create a component that given [1,4] returns the right formattnig if its just 2. use that instead of more conditoinals

  
    // just three condiitoinals here based on how many lists are returned from HQI.getAverages

    // if there is one variant:
    // if there are two variants:
    //    -return both 
    // else:
    //    -return the one variant 




    return (
      <ScrollView>

      <VictoryChart polar
      animate={{
        duration: 2000,
        easing: "bounce"
      }}
      theme={VictoryTheme.material}
      labels={["first", "second", "third"]}
      
      >
      <VictoryArea data={notesData}/>
      <VictoryPolarAxis
      labelPlacement="vertical"
      tickValues={["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"]}/>
            
      </VictoryChart>

      <VictoryChart polar
      theme={VictoryTheme.material}
      labels={["first", "second", "third"]}
      
      >
      <VictoryArea data={variant2Data}/>
      <VictoryPolarAxis
      labelPlacement="vertical"
      tickValues={["Maj7", "Min7", "Dom7", "Dim7", "Half Dim7"]}/>
            
      
      </VictoryChart>

      <VictoryChart polar
            domain={{y:[0,6]}}

      theme={VictoryTheme.material}
      labels={["first", "second", "third"]}
      
      >
      <VictoryArea data={variantData}/>
      <VictoryPolarAxis
      labelPlacement="vertical"
      tickValues={["", "Right Hand"," ","Left Hand"]}/>

      </VictoryChart>



      </ScrollView>
    
    );
  }
}

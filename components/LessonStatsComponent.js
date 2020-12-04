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
        y: 10
      },
      {
        x: 3,
        y: 3
      },
      {
        x: 4,
        y: 8
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

    return (
      <ScrollView>

      <VictoryChart polar
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

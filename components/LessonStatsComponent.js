import * as React from "react";
import {
  Text,
  View,
  StyleSheet
} from "react-native";
import { HQI } from "../App";
import { VictoryChart, VictoryTheme, VictoryArea, VictoryPolarAxis, VictoryLabel  } from "victory-native";



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

    const sampleData = [
      {
        x: 1,
        y: 12,
        label: "A"
      },
      {
        x: 2,
        y: 5
      },
      {
        x: 3,
        y: 5
      },
      {
        x: 4,
        y: 4
      },
      {
        x: 5,
        y: 7
      },
      {
        x: 6,
        y: 1
      },
      {
        x: 7,
        y: 3
      },
      {
        x: 8,
        y: 4
      },
      {
        x: 9,
        y: 10
      },
      {
        x: 10,
        y: 2
      },
      {
        x: 11,
        y: 9 
      },
      {
        x: 12,
        y: 7
      }
    ]

    return (
      <View>

      <VictoryChart polar
      theme={VictoryTheme.material}
      labels={["first", "second", "third"]}
      
      >
      <VictoryArea data={sampleData}/>
      <VictoryPolarAxis
      labelPlacement="vertical"
      tickValues={["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"]}/>
      </VictoryChart>

      </View>
    
    );
  }
}

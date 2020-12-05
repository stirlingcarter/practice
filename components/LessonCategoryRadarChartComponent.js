import * as React from "react";
import {
  Text,
  View,
  StyleSheet
} from "react-native";
import { HQI } from "../App";
import { VictoryChart, VictoryTheme, VictoryArea, VictoryPolarAxis, VictoryLabel  } from "victory-native";
import { ScrollView } from "react-native-gesture-handler";

const DOMAIN_Y_BOUND = 100
const DOMAIN = {y:[0,DOMAIN_Y_BOUND]}


//  want this to be ininviisiible and cover whole screen TODO
export class LessonCategoryRadarChartComponent extends React.Component {

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

    let color = "mediumspringgreen"
    for(var i = 0; i < this.props.variants.length; i++) {
      if (this.props.variants[i] < 100){
        color = "black"
        break; 
      }
    }

    //variants: [1,2,3,4,5,6,7,8,9,10,11,12], or [1,2,3], or [1,2] or whatever f(x)'d already
    //names: (a,ab,b,c,db......) (right hand)
    if (this.props.variants.length == 1){

      let variantData = [
        {
          x: 1,
          y: this.props.variants[0]
        },
        {
          x: 2,
          y: this.props.variants[0]
        },
        {
          x: 3,
          y: this.props.variants[0]
        },
        {
          x: 4,
          y: this.props.variants[0]
        },
      ]

      return (
      <VictoryChart polar
            domain={DOMAIN}
      theme={VictoryTheme.material}>
      <VictoryArea style={{ data: { fill: color} }} data={variantData}/>
      <VictoryPolarAxis
      labelPlacement="vertical"
      tickValues={["", this.props.names[0]," ","  "]}/>
      </VictoryChart>
      );

    } else if (this.props.variants.length == 2){

      let variantData = [
        {
          x: 1,
          y: DOMAIN["y"][1]/3
        },
        {
          x: 2,
          y: this.props.variants[0]
        },
        {
          x: 3,
          y: DOMAIN["y"][1]/3
        },
        {
          x: 4,
          y: this.props.variants[1]
        },
      ]

      return (
      <VictoryChart polar
            domain={DOMAIN}
      theme={VictoryTheme.material}>
      <VictoryArea style={{ data: { fill: color }} } data={variantData}/>
      <VictoryPolarAxis
      labelPlacement="vertical"
      tickValues={["", this.props.names[0]," ",this.props.names[1]]}/>
      </VictoryChart>
      );

    } else if (this.props.variants.length > 2){



      let variantData = [

      ]
      for (let i = 0; i < this.props.names.length; i++){
        let tmp = {
          x: i+1,
          y: this.props.variants[i]
        }

        variantData.push(tmp)
      }

      return (
        <VictoryChart polar
              domain={DOMAIN}
        theme={VictoryTheme.material}
        
        >
          
        <VictoryArea style={{ data: { fill: color} }} data={variantData}
        />
        <VictoryPolarAxis
        labelPlacement="vertical"
        tickValues={this.props.names}
        />
        </VictoryChart>
        );








    } else {

      return (<View><Text>nothin</Text></View>)

    }

    


  }
}

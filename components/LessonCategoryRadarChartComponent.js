import * as React from "react";
import {
  Text,
  View,
  StyleSheet
} from "react-native";
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
    for(var i = 0; i < this.props.averages.length; i++) {
      if (this.props.averages[i] < 100){
        color = "black"
        break; 
      }
    }

    //averages: [1,2,3,4,5,6,7,8,9,10,11,12], or [1,2,3], or [1,2] or whatever f(x)'d already
    //namesOfVariants: (a,ab,b,c,db......) (right hand)
    if (this.props.averages.length == 1){

      let averagesData = [
        {
          x: 1,
          y: this.props.averages[0]
        },
        {
          x: 2,
          y: this.props.averages[0]
        },
        {
          x: 3,
          y: this.props.averages[0]
        },
        {
          x: 4,
          y: this.props.averages[0]
        },
      ]

      return (
      <VictoryChart polar
            domain={DOMAIN}
      theme={VictoryTheme.material}>
      <VictoryArea style={{ data: { fill: color} }} data={averagesData}/>
      <VictoryPolarAxis
      labelPlacement="vertical"
      tickValues={["", this.props.namesOfVariants[0]," ","  "]}/>
      </VictoryChart>
      );

    } else if (this.props.averages.length == 2){

      let averagesData = [
        {
          x: 1,
          y: DOMAIN["y"][1]/3
        },
        {
          x: 2,
          y: this.props.averages[0]
        },
        {
          x: 3,
          y: DOMAIN["y"][1]/3
        },
        {
          x: 4,
          y: this.props.averages[1]
        },
      ]

      return (
      <VictoryChart polar
            domain={DOMAIN}
      theme={VictoryTheme.material}>
      <VictoryArea style={{ data: { fill: color }} } data={averagesData}/>
      <VictoryPolarAxis
      labelPlacement="vertical"
      tickValues={["", this.props.namesOfVariants[0]," ",this.props.namesOfVariants[1]]}/>
      </VictoryChart>
      );

    } else if (this.props.averages.length > 2){



      let averagesData = [

      ]
      for (let i = 0; i < this.props.namesOfVariants.length; i++){
        let tmp = {
          x: i+1,
          y: this.props.averages[i]
        }

        averagesData.push(tmp)
      }

      return (
        <VictoryChart polar
              domain={DOMAIN}
        theme={VictoryTheme.material}
        
        >
          
        <VictoryArea style={{ data: { fill: color} }} data={averagesData}
        />
        <VictoryPolarAxis
        labelPlacement="vertical"
        tickValues={this.props.namesOfVariants}
        />
        </VictoryChart>
        );








    } else {

      return (<View><Text>nothin</Text></View>)

    }

    


  }
}

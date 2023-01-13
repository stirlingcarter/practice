import * as React from "react";
import {
  Text,
  View
} from "react-native";
import { VictoryChart, VictoryLine, VictoryScatter, VictoryGroup, VictoryVoronoiContainer, VictoryTooltip } from "victory-native";
import { statService } from "../App";
import Constants from "../constant/Constants";
import { allTheStyles } from "../styles/allTheStyles";
const DOMAIN_X_BOUND = 100


/*
expects shapedData to be an object with keys being the variant names and values being arrays of times and intended x values
for example:
{
  // A$dom$LH" : [[60,61,62..],[5,7,9...]]
  // VHASH          BPM x          AVG TRIES y

  or

  // A$dom$LH" : [[60,61,62..],[5,7,9...]]
  // VHASH          "date/timeline x dim" AVG TRIES y
}

the component will shape the data further into coordinates.
*/
export class LessonCategoryLineChartComponent extends React.Component {

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

  getCoords(historicalTimes) {
    if (historicalTimes == undefined || historicalTimes.length == 0) {
      return []
    } else if (historicalTimes.length == 1) {
      let res = []
      res.push({ x: 0, y: historicalTimes[0] / 1000 })
      res.push({ x: DOMAIN_X_BOUND, y: historicalTimes[0] / 1000 })
      return res
    }
    let res = []
    let l = historicalTimes.length
    let xCoords = []
    let sum = 0
    let step = DOMAIN_X_BOUND / (l - 1)
    for (let i = 0; i < l; i++) {
      xCoords.push(sum)
      res.push({ x: sum, y: historicalTimes[i] / 1000 })
      sum += step
    }
    return res
  }

  getCoordinates(xs, ys) {
    let res = []
    for (let i = 0; i < xs.length; i++) {
      res.push({ x: xs[i], y: ys[i] })
    }
    return res
  }

  getColoredSubtitlesBullshit(namesOfVariants) {

    const subtitles = []
    for (let i = 0; i < namesOfVariants.length; i++) {
      let variant = namesOfVariants[i]
      subtitles.push(this.getOneSubtitle(variant, Constants.COLORS[i]))
    }
    return subtitles


  }

  getOneSubtitle(variant, color) {
    return (
      <Text style={{ color: color }}>{variant}</Text>
    )
  }

  getOneGroupElement(ys, xs, label, color) {
    return (
      <VictoryGroup
        color={color}
        labels={({ datum }) => `${label}: ${datum.y}`}
        labelComponent={
          <VictoryTooltip
            style={{ fontSize: 25, color: "white" }}
          />
        }
        data={
          this.getCoordinates(ys, xs)
        }
      >
        <VictoryLine />
        <VictoryScatter
          size={({ active }) => active ? 8 : 3}
        />
      </VictoryGroup>
    )
  }

  render() {
    const fields = []
    let i = 0

    Object.keys(this.props.shapedData).forEach(label => {
        let color = Constants.COLORS[i % Constants.COLORS.length]
        let xAndYVals = this.props.shapedData[label]
        fields.push(this.getOneGroupElement(xAndYVals[0], xAndYVals[1], label, color))
        i += 1
      });

    
    return ( 
      <View>
        <VictoryChart theme={allTheStyles.chartTheme} height={400} width={400}
          containerComponent={<VictoryVoronoiContainer />}
        >
          {fields}
        </VictoryChart>
        {this.getColoredSubtitlesBullshit(Object.keys(this.props.shapedData))}</View>

    )
  }
}

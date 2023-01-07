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

  getColoredSubtitles(namesOfVariants) {

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

  getOneGroupElement(times, variant, color) {
    return (
      <VictoryGroup
        color={color}
        labels={({ datum }) => `${variant}: ${datum.y}`}
        labelComponent={
          <VictoryTooltip
            style={{ fontSize: 10 }}
          />
        }
        data={
          this.getCoords(times)
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
    let historicalAveragesByVariant = undefined
    if (this.props.lesson != undefined){
      historicalAveragesByVariant = statService.getHistoricalAveragesByVariantBPM(this.props.namesOfVariants, this.props.lesson.getVHashes(), this.props.lesson.getDataset())
          let i = 0

      this.props.namesOfVariants.forEach(variant => {
        let color = Constants.COLORS[i % 12]
        fields.push(this.getOneGroupElement(historicalAveragesByVariant[variant], variant, color))
        i += 1
      });
    }else{
      fields.push(this.getOneGroupElement(this.props.times, this.props.namesOfVariants[0], Constants.COLORS[0]))
      fields.push(this.getOneGroupElement(this.props.bpms, this.props.namesOfVariants[1], Constants.COLORS[1]))
    }
    
    return ( 
      <View>
        <VictoryChart theme={allTheStyles.chartTheme} height={400} width={400}
          containerComponent={<VictoryVoronoiContainer />}
        >
          {fields}
        </VictoryChart>
        {this.getColoredSubtitles(this.props.namesOfVariants)}</View>

    )
  }
}

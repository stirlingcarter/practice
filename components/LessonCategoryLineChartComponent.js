import * as React from "react";
import {
  Text,
  View,
  StyleSheet
} from "react-native";
import { VictoryChart, VictoryTheme, VictoryLine, VictoryScatter, VictoryGroup, VictoryLabel, VictoryVoronoiContainer, VictoryTooltip  } from "victory-native";
import { ScrollView } from "react-native-gesture-handler";

// const DOMAIN_Y_BOUND = 100
// const DOMAIN = {y:[0,DOMAIN_Y_BOUND]}
const DOMAIN_X_BOUND = 100
const COLORS = ["pink","blue","purple","orange","red","green","violet","navy","magenta","tomato","gold","darkgreen"]
//  want this to be ininviisiible and cover whole screen TODO
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

  getCoords(historicalTimes){
    if (historicalTimes.length == 0){
      return []
    } else if (historicalTimes.length == 1){
      let res = []
      res.push({ x: 0, y: historicalTimes[0]/1000  })
      res.push({ x: DOMAIN_X_BOUND, y: historicalTimes[0]/1000 })
      return res
    }
    let res = []
    let l = historicalTimes.length
    let xCoords = []
    let sum = 0
    let step = DOMAIN_X_BOUND/(l-1)
    for (let i = 0; i < l; i++){
      xCoords.push(sum)
      res.push({ x: sum, y: historicalTimes[i]/1000 })
      sum += step
    }
    return res
  }

  getColoredSubtitles(namesOfVariants){

    const subtitles = []
    for (let i = 0; i < namesOfVariants.length; i++){
      subtitles.push(this.getOneSubtitle(namesOfVariants[i],COLORS[i]))
    }
    return subtitles
      

  }

  getOneSubtitle(name,color){
    return (
      <Text style={{color: color}}>{name}</Text>
    )
  }

  getOneGroupElement(times,catMember,color){
    return(
    <VictoryGroup
      color={color}
      labels={({ datum }) => `${catMember}: ${datum.y}`}
      labelComponent={
        <VictoryTooltip
          style={{ fontSize: 10 }}
        />
      }
      data={
        this.getCoords(times)
      }
    >
      <VictoryLine/>
      <VictoryScatter
        size={({ active }) => active ? 8 : 3}
      />
    </VictoryGroup>
    )
  }

//this.props.namesOfVariants- [a,b,c....g]

  render() {

      // [
    //   [8,7,5,3] this is a whole interleaved array tho
    //   [5,2]
    //   []
    //   [23,14,10,7,6,4,3]
    //   ....
  // ]
    let historicalAveragesByCatMember = statService.getHistoricalAveragesByCatMember(this.props.namesOfVariants)
    

    const fields = []
    for (let i = 0; i < this.props.namesOfVariants.length; i++) {
      let color = COLORS[i%12]
      fields.push(this.getOneGroupElement(historicalAveragesByCatMember[i],this.props.namesOfVariants[i],color));
    }

    return(
<View>
      <VictoryChart height={400} width={400}
        containerComponent={<VictoryVoronoiContainer/>}
      >
          {fields}
   </VictoryChart>
   {this.getColoredSubtitles(this.props.namesOfVariants)}</View>

    )



    


  }
}

import * as React from "react";
import {
  Text,
  View
} from "react-native";
import challengeService from "../App"
import { ScrollView } from "react-native-gesture-handler";
import { LessonCategoryRadarChartComponent } from "../components/LessonCategoryRadarChartComponent";
import { LessonCategoryLineChartComponent } from "../components/LessonCategoryLineChartComponent";

const DOMAIN = {y:[0,100]}
const LIMIT = 30 * 1000

export class GroupStatsComponent extends React.Component {

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
    return (<View><Text>not impled yet hunney</Text></View>)
  }
}

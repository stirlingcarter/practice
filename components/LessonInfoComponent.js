import * as React from "react";
import {
  ScrollView,
  SafeAreaView,


  Text
} from "react-native";
import { HQI } from "../App";
import { allTheStyles } from "../styles/allTheStyles.js"

export class WholeAssLessonInfo extends React.Component {
  constructor(props) {
    super(props);
    this.getCri = this.getCri.bind(this);
    this.state = {
      cri: "def",
    };

    HQI.mountLesson(this.props.instrument, this.props.lesson, this.getCri);
  }
  componentDidMount() {
    this.getCri();
  }

  async getCri() {
    // alert(HQI.getCri())
    this.setState({
      cri: HQI.getCri(),
    });
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView snapToStart={false} style={allTheStyles.scrollStyle}>
          <Text style={allTheStyles.cri}>{this.state.cri}</Text>

          <Text
            style={allTheStyles.startButton}
            title={"start " + this.props.lesson}
            onPress={() => this.props.nav.navigate("LessonChallengeScreen", {
              lesson: this.props.lesson,
              instrument: this.props.instrument,
            })}
          >
            {"\n\n\nSTART"}
          </Text>
          <Text
            style={allTheStyles.startButton}
            title={"start " + this.props.lesson}
            onPress={() => this.props.nav.navigate("LessonStatsScreen", {
              lesson: this.props.lesson,
              instrument: this.props.instrument,
            })}
          >
            {"\n\n\nSTATS"}
          </Text>
        </ScrollView>
        <Text style={allTheStyles.lessonInfoScreenSpacer}>{"\n"}</Text>
      </SafeAreaView>
    );
  }
}

import * as React from "react";
import {
  ScrollView,
  SafeAreaView,
  Text
} from "react-native";
import { lessonRepository } from "../App";
import { allTheStyles } from "../styles/allTheStyles.js"

export class LessonLaunchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.lesson = lessonRepository.getLessonByPath(this.props.path)

  

  }
  async componentDidMount() {
    let l = lessonRepository.getLessonByPath(this.props.path)
    this.setState({
      lesson: l
    });
  } 

  componentWillUnmount() {

  }

  render() {

    return (
      <SafeAreaView>
        <ScrollView snapToStart={false} style={allTheStyles.scrollStyle}>
          <Text style={allTheStyles.cri}>{this.lesson.getCriteria()}</Text>

          <Text
            style={allTheStyles.startButton}
            title={"start " + this.props.lessonName}
            onPress={() => this.props.nav.navigate("LessonChallengeScreen", {
              lesson: this.lesson,
              groupName: this.props.path,
            })}
          >
            {"\n\n\nSTART"}
          </Text>
          <Text
            style={allTheStyles.startButton}
            title={"start " + this.props.lessonName}
            onPress={() => this.props.nav.navigate("LessonStatsScreen", {
              lesson: this.lesson,
              path: this.props.path,
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

import * as React from "react";
import {
  ScrollView,
  SafeAreaView,
  Text
} from "react-native";
import LessonRepository from "../repositories/LessonRepository";
import { allTheStyles } from "../styles/allTheStyles.js"

const lessonRepository = LessonRepository.getInstance();

export class LessonLaunchComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lesson: null
    };

  }
  async componentDidMount() {
    let l = lessonRepository.getLessonByNameAndGroupName(this.props.lessonName, this.props.groupName)
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
          <Text style={allTheStyles.cri}>{this.state.lesson.getCriteria()}</Text>

          <Text
            style={allTheStyles.startButton}
            title={"start " + this.props.lessonName}
            onPress={() => this.props.nav.navigate("LessonChallengeScreen", {
              lesson: this.state.lesson,
              groupName: this.props.groupName,
            })}
          >
            {"\n\n\nSTART"}
          </Text>
          <Text
            style={allTheStyles.startButton}
            title={"start " + this.props.lessonName}
            onPress={() => this.props.nav.navigate("LessonStatsScreen", {
              lesson: this.state.lesson,
              groupName: this.props.groupName,
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

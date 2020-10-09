import * as React from "react";
import {
  Text,
  View
} from "react-native";
import { HQI } from "../App";
import { allTheStyles } from "../styles/allTheStyles.js"

//  want this to be ininviisiible and cover whole screen TODO
export class WholeAssChallenge extends React.Component {
  constructor(props) {
    super(props);
    this.challengeCallback = this.challengeCallback.bind(this);
    this.state = {
      //clock
      start: 0,
      isOn: false,
      end: 0,
      note: HQI.getNextNote(),
    };
  }

  componentDidMount() {
    this.setState({
      start: Date.now(),
      isOn: true,
      end: this.state.end,
    });
  }

  componentWillUnmount() {
    HQI.saveLesson();
  }

  challengeCallback(nav) {
    this.setState({
      isOn: false,
      end: Date.now(),
    });

    nav.navigate("LessonChallengeScreen");
  }

  //entered at mount due to state channge
  componentDidUpdate() {
    //not entered at mount due to bool
    if (this.state.isOn == false) {
      let diff = this.state.end - this.state.start;
      //alert(diff);
      HQI.commit(diff);

      this.setState({
        note: HQI.getNextNote(),
        start: Date.now(),
        isOn: true,
        end: this.state.end,
      });
    }
  }

  render() {
    return (
      <View style={allTheStyles.challengeScreenBackground}>
        <Text>{"\n\n\n\n\n\n\n"}</Text>
        <Text
          onPress={() => this.challengeCallback(this.props.nav)}
          style={allTheStyles.challengeButton}
        >
          {this.state.note}
        </Text>

      </View>
    );
  }
}

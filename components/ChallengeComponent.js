import * as React from "react";
import {
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { AnalService } from "../App";
import LessonRepository from "../repositories/LessonRepository";
import { allTheStyles } from "../styles/allTheStyles.js"
import { Util } from "../services/Util.js"

lessonRepository = LessonRepository.getInstance();

const analService = AnalService.getInstance()

//  want this to be ininviisiible and cover whole screen TODO
export class ChallengeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.challengeCallback = this.challengeCallback.bind(this);

    this.lesson = this.props.lesson;

    this.state = {
      //clock
      start: 0,
      isOn: false,
      end: 0,
      vHash: analService.getNextVHash(this.lesson),
    };
  }

  componentDidMount() {
    this.setState({
      start: Date.now(),
      isOn: true
    });
  }

  componentWillUnmount() {
    lessonRepository.save(this.lesson);
  }

  challengeCallback(nav) {
    let end = Date.now()
    this.setState({
      isOn: false
    });

    let diff = end - this.state.start;
    this.lesson.registerTime(diff, this.state.vHash)
    lessonRepository.save(this.lesson)
    this.setState({
      vHash: analService.getNextVHash(this.lesson), //this is where the refreshing happens, but it can happen all at once up there^ 
      start: Date.now(),
      isOn: true
    });

    // nav.navigate("LessonChallengeScreen");
  }

  // //entered at mount due to state channge
  // componentDidUpdate() {
  //   //not entered at mount due to bool
  //   if (this.state.isOn == false) {
  //     let diff = this.state.end - this.state.start;
  //     //alert(diff);
  //     HQI.commit(diff);
  //     this.lesson.registerTime(diff, vHash)
  //     this.setState({
  //       vHash: analService.getNextVHash(this.lesson), //this is where the refreshing happens, but it can happen all at once up there^ 
  //       start: Date.now(),
  //       isOn: true,
  //       end: this.state.end,
  //     });
  //   }
  // }

  render() {
    return (
      <View onTouchStart={() => this.challengeCallback(this.props.nav)}
        style={{ width: '100%', height: '100%' }}>
        <Text>{"\n\n\n\n\n\n\n"}</Text>
        <Text
          style={allTheStyles.challengeButton}
        >
          {Util.vHashToName(this.vHash)}
        </Text>
      </View>
    );
  }
}

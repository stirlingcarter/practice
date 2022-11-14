import * as React from "react";
import {
  Text,
  View
} from "react-native";
import { lessonRepository} from "../App";
import { allTheStyles } from "../styles/allTheStyles.js"
import Util from "../services/Util.js"
import { challengeService } from "../App";



export class ChallengeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.challengeCallback = this.challengeCallback.bind(this);

    this.lesson = this.props.lesson;

    this.state = {
      start: 0,
      vHash: challengeService.getNextVHash(this.lesson),
    };
  }

  componentDidMount() {
    this.setState({
      start: Date.now()
    });
  }

  componentWillUnmount() {
    lessonRepository.save(this.lesson);
  }

  challengeCallback(nav) {
    let end = Date.now()
    let diff = end - this.state.start;
    this.lesson.registerTime(diff, this.state.vHash)


    lessonRepository.save(this.lesson)
    this.setState({
      vHash: challengeService.getNextVHash(this.lesson), 
      start: Date.now()
    });

    // nav.navigate("LessonChallengeScreen");
  }

  render() {
    return (
      <View onTouchStart={() => this.challengeCallback(this.props.nav)}
        style={{ width: '100%', height: '100%' }}>
        <Text>{"\n\n\n\n\n\n\n"}</Text>
        <Text
          style={allTheStyles.challengeButton}
        >
          {Util.vHashToName(this.state.vHash)}
        </Text>
      </View>
    );
  }
}

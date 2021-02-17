import * as React from "react";
import {
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { HQI } from "../App";
import { allTheStyles } from "../styles/allTheStyles.js"

//  want this to be ininviisiible and cover whole screen TODO
export class ChallengeComponent extends React.Component {
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
        note: HQI.getNextNote(), //this is where the refreshing happens, but it can happen all at once up there^ 
        start: Date.now(),
        isOn: true,
        end: this.state.end,
      });
    }
  }

  render() {
    let args = this.state.note.split("$")
    let challenge = ""
    for (let i = 0; i < args.length; i++){
      challenge += args[i]
      challenge += " "
    }


    return (
      <View onTouchStart={() => this.challengeCallback(this.props.nav)}
      style={{ width: '100%', height: '100%' }}>
        <Text>{"\n\n\n\n\n\n\n"}</Text>
        <Text
         
          style={allTheStyles.challengeButton}
        >
          {challenge}
        </Text>
      </View>
    );
  }
}

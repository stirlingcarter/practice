import * as React from "react";
import {
  Text,
  View
} from "react-native";
import { lessonRepository} from "../App";
import { allTheStyles } from "../styles/allTheStyles.js"
import Util from "../services/Util.js"
import { challengeService } from "../App";
import Constants from "../constant/Constants";


export class ChallengeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.challengeCallback = this.challengeCallback.bind(this);
    this.add = this.add.bind(this);
    this.subtract = this.subtract.bind(this);
    this.lesson = this.props.lesson;

    this.type = this.props.type

    this.state = {
      start: 0,
      vHash: challengeService.getNextVHash(this.lesson),
      count: 0
    };
  }

  componentDidMount() {
    this.setState({
      start: Date.now(),
      count: 0
    });
  }

  componentWillUnmount() {
    lessonRepository.save(this.lesson);
  }

  challengeCallback(nav) {

    if (this.type == Constants.LESSON_TYPE_TRIES) {
      if (this.state.count == undefined || this.state.count == 0) {
        alert("You need to do at least one try!")
        return
      }
      this.lesson.registerTime(this.state.count, this.state.vHash)
    }else{
      let end = Date.now()
      let diff = end - this.state.start;
      this.lesson.registerTime(diff, this.state.vHash)
    }
     
    lessonRepository.save(this.lesson)
    
    this.setState({
      vHash: challengeService.getNextVHash(this.lesson),
      start: Date.now(),
      count: 0
    })

    // nav.navigate("LessonChallengeScreen");
  }

  add(){
    this.setState({
      count: this.state.count + 1
    })
  }

  subtract(){
    if (this.state.count == 0) {
      return;
    }
    this.setState({
      count: this.state.count - 1
    })
  }

  render() {
    return (
      <View>
      <View onTouchStart={() => this.challengeCallback(this.props.nav)}
        style={{ width: '100%', height: '52%' }}>
        <Text>{"\n\n\n\n\n\n\n"}</Text><Text>{"\n\n\n\n\n\n\n"}</Text>
        <Text
          style={allTheStyles.challengeButton}
        >
          {Util.vHashToName(this.state.vHash)}
        </Text>
        
      </View>


  { this.type == Constants.LESSON_TYPE_TRIES && 
      <Text
        style={allTheStyles.challengeButton}
      >
        {this.state.count == undefined ? 0 : this.state.count}
      </Text>
  }
  { this.type == Constants.LESSON_TYPE_TRIES && 
      <View
      style={ allTheStyles.examplesRow}>    
      <Text>{"\n\n\n\n\n\n\n"}</Text>

      <Text>{"\n\n\n\n\n\n\n"}</Text>
      <View style={allTheStyles.addLessonCol}>
      <View style={allTheStyles.examplesRow}>
        <Text onPress={this.subtract}
        style={allTheStyles.challengeButton}
      >
        {"-  "}
      </Text>
      <Text onPress={this.add}
        style={allTheStyles.challengeButton}
      >
        {"  +"}
      </Text>
      </View>
      <Text 
        style={allTheStyles.challengeButton}
      >
        {"BPM:" + this.props.bpm}
      </Text>
      </View>
      </View>
  }
      </View>
    );
  }
}

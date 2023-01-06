import * as React from "react";
import {
  ScrollView,
  SafeAreaView,
  Text,
  View
} from "react-native";
import { challengeService, lessonRepository } from "../App";
import Constants from "../constant/Constants";
import { allTheStyles } from "../styles/allTheStyles.js"
import Util from "../services/Util";

export class LessonLaunchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.add = this.add.bind(this);
    this.subtract = this.subtract.bind(this);
    this.handleAutoToggle = this.handleAutoToggle.bind(this);
    this.updateLessonBPM = this.updateLessonBPM.bind(this);
    let lesson = lessonRepository.getLessonByPath(this.props.path)

    let recc = challengeService.reccommendBPM(lesson)

    this.state = {
      lesson: lesson,
      bpm: lesson.getBPM() == undefined ? recc : lesson.getBPM(),
      auto: lesson.getBPM() == undefined || lesson.getBPM() == recc 
    }
  

  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((state, props) => {
        return {
          examples: [Util.getRandomFromArray(this.state.lesson.getNotes()),Util.getRandomFromArray(this.state.lesson.getV()),Util.getRandomFromArray(this.state.lesson.getV2())]
        };
      });
    }, 1600);
  }

  add(){
    if (this.state.auto){
      this.handleAutoToggle()
    }
    this.setState({
      bpm: this.state.bpm + 1
    })

    this.updateLessonBPM(1)
    
  }

  updateLessonBPM(n){
    let newLesson = this.state.lesson
    newLesson.setBPM(this.state.bpm + n)
    lessonRepository.save(newLesson)
  }

  subtract(){
    if (this.state.auto){
      this.handleAutoToggle()
    }
    if (this.state.bpm == 1) {
      return;
    }
    this.setState({
      bpm: this.state.bpm - 1
    })

    this.updateLessonBPM(-1)
  }

  handleAutoToggle()  {
    if (!this.state.auto){//if we are turning auto on
      let newBPM = challengeService.reccommendBPM(this.state.lesson)
      let diff = newBPM - this.state.bpm
      this.setState({
        bpm: newBPM
      })
      this.updateLessonBPM(diff)
    }
    this.setState({
      auto: !this.state.auto
    })
  }

  render() {
    let init = allTheStyles.challengeButton
    let green = allTheStyles.challengeButtonGreen
    return (
      <SafeAreaView>
        <ScrollView snapToStart={false} style={allTheStyles.scrollStyle}>

          <Text style={allTheStyles.criWhite}>{this.state.lesson.getCriteria()}</Text>
          { (this.state.lesson.getType() === Constants.LESSON_TYPE_TRIES) && 
      <View
      style={ allTheStyles.examplesRow}>    
      <Text>{"\n\n\n\n\n\n\n"}</Text>

      <Text>{"\n\n\n\n\n\n\n"}</Text>

      { this.state.lesson.getType() == Constants.LESSON_TYPE_TRIES && 
      
      <View style={allTheStyles.addLessonCol}> 
      <Text
        style={allTheStyles.challengeButton}
      >
        {"BPM: "}
      </Text>
      
      <Text
        style={this.state.auto ? green : init}
      >
        {this.state.bpm == undefined ? Constants.DEFAULT_STARTING_BPM : this.state.bpm}
      </Text>

<View style={allTheStyles.examplesRow}>
      <Text onPress={this.subtract}
        style={allTheStyles.challengeButton}
      >
        {"- "}
      </Text>
      <Text onPress={this.add}
        style={allTheStyles.challengeButton}
      >
        {" + "}
      </Text>
      <Text onPress={this.handleAutoToggle}
        style={this.state.auto ? green : init}
      >
        {" Auto"}
      </Text>
        </View>
      </View>
  }


      </View>
  }        
                    <View style={allTheStyles.examplesRow}>
          <Text style={allTheStyles.actualExampleO}>{this.state.examples == undefined ? "" : this.state.examples[0] + " "}</Text>
          <Text style={allTheStyles.actualExampleGO}>{this.state.examples == undefined ? "" : Util.getNoParens(this.state.examples[1]) + " "}</Text>
          <Text style={allTheStyles.actualExampleBO}>{this.state.examples == undefined ? "" : Util.getNoParens(this.state.examples[2])}</Text>
          </View>
          
          <Text
            style={allTheStyles.startButton}
            title={"start " + this.props.lessonName}
            onPress={() => this.props.nav.navigate("LessonChallengeScreen", {
              lesson: this.state.lesson,
              groupName: this.props.path,
              type: this.state.lesson.getType(),
              bpm: this.state.bpm,
              auto: this.state.auto
            })}
          >
            {"START"}
          </Text>
          
          <Text
            style={allTheStyles.startButton}
            title={"start " + this.props.lessonName}
            onPress={() => this.props.nav.navigate("LessonStatsScreen", {
              lesson: this.state.lesson,
              path: this.props.path
            })}
          >
            {"STATS"}
          </Text>
          
        </ScrollView>

        { this.state.lesson.getType() == Constants.LESSON_TYPE_TRIES && 
      <Text
        style={allTheStyles.challengeButton}
      >
        {this.state.bpm == undefined ? Constants.DEFAULT_STARTING_BPM : this.state.bpm}
      </Text>
  }


      </SafeAreaView>
    );
  }
}

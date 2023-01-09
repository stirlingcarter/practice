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

  render() {

    return (
      <SafeAreaView>
        <ScrollView snapToStart={false} style={allTheStyles.scrollStyle}>

          <Text style={allTheStyles.criWhite}>{this.state.lesson.getCriteria()}</Text>
          { (this.state.lesson.getType() === Constants.LESSON_TYPE_TRIES) && 
      <View
      style={ allTheStyles.examplesRow}>    
      <Text>{"\n\n\n\n\n\n\n"}</Text>

      <Text>{"\n\n\n\n\n\n\n"}</Text>




      </View>
  }        
                    <View style={allTheStyles.examplesRow}>
          <Text style={allTheStyles.actualExampleO}>{this.state.examples == undefined ? "For example" : this.state.examples[0] + " "}</Text>
          <Text style={allTheStyles.actualExampleGO}>{this.state.examples == undefined ? "" : Util.getNoParens(this.state.examples[1]) + " "}</Text>
          <Text style={allTheStyles.actualExampleBO}>{this.state.examples == undefined ? "" : Util.getNoParens(this.state.examples[2])}</Text>
          </View>
          
          <Text
            style={allTheStyles.startButton}
            title={"start " + this.props.lessonName}
            onPress={() => this.props.nav.navigate("LessonChallengeScreen", {
              lesson: lessonRepository.getLessonByPath(this.props.path),
              groupName: this.props.path,
              type: this.state.lesson.getType(),
              auto: this.state.auto
            })}
          >
            {"START"}
          </Text>
          
          <Text
            style={allTheStyles.startButton}
            title={"start " + this.props.lessonName}
            onPress={() => this.props.nav.navigate("LessonStatsScreen", {
              lesson: lessonRepository.getLessonByPath(this.props.path),
              path: this.props.path
            })}
          >
            {"STATS"}
          </Text>
          
        </ScrollView>




      </SafeAreaView>
    );
  }
}

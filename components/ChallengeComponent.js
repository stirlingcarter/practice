import * as React from "react";
import {
  Text,
  View,
  TouchableHighlight
} from "react-native";
import { lessonRepository } from "../App";
import { allTheStyles } from "../styles/allTheStyles.js"
import Util from "../services/Util.js"
import { challengeService } from "../App";
import Constants from "../constant/Constants";
import Metronome from "./Metronome";


export class ChallengeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.challengeCallback = this.challengeCallback.bind(this);
    this.addBpm = this.addBpm.bind(this);
    this.subtractBpm = this.subtractBpm.bind(this);
    this.lesson = this.props.lesson
    this.handleUndoLast = this.handleUndoLast.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.addTries = this.addTries.bind(this);
    this.subtractTries = this.subtractTries.bind(this);
    this.handleAutoToggle = this.handleAutoToggle.bind(this);
    this.updateLessonBPM = this.updateLessonBPM.bind(this);
    this.handleMetronomeIsPlayingChange = this.handleMetronomeIsPlayingChange.bind(this);
    this.type = this.props.type
    let recc = challengeService.reccommendBPM(this.lesson)

    this.state = {
      start: 0,
      vHash: challengeService.getNextVHash(this.lesson),
      prevVHash: undefined,
      count: 0,
      bpm: this.lesson.getBPM(),
      auto: this.lesson.getBPM() == undefined || this.lesson.getBPM() == recc,
      metronomeIsPlaying: false,
      t: 3
    };

    setTimeout(() => this.setState({t: 2}), 1000);
    setTimeout(() => this.setState({t: 1}), 2000);
    setTimeout(() => this.setState({t: 0,
    start: Date.now()}), 3000);





  }

  addBpm() {
    if (this.state.auto) {
      this.handleAutoToggle()
    }
    this.updateLessonBPM(1)

  }

  updateLessonBPM(n) {
    let newLesson = this.lesson
    newLesson.setBPM(this.state.bpm + n)
    lessonRepository.save(newLesson)
    this.lesson = newLesson
    this.setState({
      bpm: newLesson.getBPM()
    })
 

  }

  subtractBpm() {
    if (this.state.auto) {
      this.handleAutoToggle()
    }
    if (this.state.bpm == 1) {
      return;
    }
    this.updateLessonBPM(-1)
  }

  handleAutoToggle() {
    if (!this.state.auto) {//if we are turning auto on
      let newBPM = challengeService.reccommendBPM(this.lesson)
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
      this.lesson.registerTimeWithBPM(this.state.count, this.state.vHash, this.state.bpm)
      let newBPM = this.state.bpm
      if (this.state.auto) {
        newBPM = challengeService.reccommendBPM(this.lesson)
        this.lesson.setCompletedBPM(newBPM)//mostly this will be the same and do nothing. but sometimes it will be one more or less if youre doing well or poorly, and it will update the lesson
        this.lesson.setBPM(newBPM)
        lessonRepository.save(this.lesson)
      }
      this.setState({
        bpm: newBPM
      })
    } else {
      let end = Date.now()
      let diff = end - this.state.start;
      this.lesson.registerTime(diff, this.state.vHash)
    }

    let prev = this.state.vHash

    this.setState({
      vHash: challengeService.getNextVHash(this.lesson),
      start: Date.now(),
      count: 0,
      prevVHash: prev
    })
    // nav.navigate("LessonChallengeScreen");
  }

  addTries() {
    this.setState({
      count: this.state.count + 1
    })
  }

  subtractTries() {
    if (this.state.count == 0) {
      return;
    }
    this.setState({
      count: this.state.count - 1
    })
  }

  handleMetronomeIsPlayingChange() {
    this.setState({
      metronomeIsPlaying: !this.state.metronomeIsPlaying
    })

  }

  handleUndoLast(){
      if (this.state.prevVHash == undefined) {
        alert("Nothing to undo!")
        return
      }
      this.lesson.undoLastTriesLessonTypeAgnostic(this.state.prevVHash)
      lessonRepository.save(this.lesson)
      this.setState({
        prevVHash: undefined
      }
      )
  }

  handleLeave(){
    this.props.nav.navigate("LessonLaunchScreen", {
      path: this.props.lesson.getPath(),
      lessonName: this.props.lesson.getName(),
      nav: this.props.nav
    })
  }

  render() {
    let init = allTheStyles.challengeButton
    let green = allTheStyles.challengeButtonGreen
    let variants = this.state.vHash.split("$")
    let l = variants.length

    let isTries = this.type == Constants.LESSON_TYPE_TRIES
    let prevVariants = undefined
    if (this.state.prevVHash) {
      prevVariants = this.state.prevVHash.split("$")
    }

    let p0 = !prevVariants || prevVariants.length == 0 ? "NA   " : prevVariants[0] 
    let p1 = !prevVariants || prevVariants.length < 2 ? "     " : prevVariants[1] 
    let p2 = !prevVariants || prevVariants.length < 3 ? "     " : prevVariants[2] 
    p1 = Util.getNoParens(p1)
    p2 = Util.getNoParens(p2)

    return (!isTries && this.state.t > 0) ? (<Text style={{top: 250, color: "white", textAlign: "center", fontSize: 300, fontStyle: "italic",
    fontWeight: "bold"}}>{this.state.t}</Text>) : (
      <View>
        <View
          style={{ width: '100%', height: '33%' }}>
          <Text>{"\n\n\n"}</Text>

          {<View style={allTheStyles.examplesRow}>
            <Text onPress={this.handleLeave}
              style={allTheStyles.challengeExitButton}
            >
              {"leave"}
            </Text>

<View style={allTheStyles.examplesRow}>
            <Text onPress={this.handleUndoLast}
              style={this.state.prevVHash ? allTheStyles.challengeUndoButton : allTheStyles.challengeUndoButtonDisabled}
            >
              {" undo"}
            </Text>
            <View style={{flexDirection: "column"}}>
            <Text style={allTheStyles.challengeText}>
              {p0}
              </Text>



              {p1 && <Text style={allTheStyles.challengeTextG}>
              {p1.slice(0, 7) + (p1.trim().length < 7 ? '' : '...')}
              </Text>}
              {p2 && <Text style={allTheStyles.challengeTextB}>
              {p2.slice(0, 7) + (p2.trim().length < 7 ? '' : '...')}
              </Text>}


              </View>
            </View>
          </View>}     
          {!isTries && <Text>{"\n"}</Text>}


                    { !isTries && <Text>{"\n\n\n\n\n"}</Text>}
          { !isTries && <Text>{"\n\n\n\n"}</Text>}
          { !isTries && <Text>{"\n\n\n\n\n"}</Text>}     
          {

            <View style={isTries ? allTheStyles.challengeBorderT : allTheStyles.challengeBorder} onTouchStart={() => this.challengeCallback(this.props.nav)}>
              <View style={isTries ? allTheStyles.lT : allTheStyles.l}/>
              <View style={isTries ? allTheStyles.rT : allTheStyles.r}/>
              <View style={isTries ? allTheStyles.tT : allTheStyles.t}/>
              <View style={isTries ? allTheStyles.bT : allTheStyles.b}/>
              <View style={isTries ? allTheStyles.bT2 : allTheStyles.b2}/>

              {variants != undefined && <Text style={allTheStyles.actualExample}>{variants[0] + " "}</Text>}
              {l > 1 && <Text style={allTheStyles.actualExampleG}>{Util.getNoParens(variants[1]) + " "}</Text>}
              {l > 2 && <Text style={allTheStyles.actualExampleB}>{Util.getNoParens(variants[2])}</Text>}
            </View>

          }




          {isTries && <View style={allTheStyles.examplesRow}>
            <Text onPress={this.subtractTries}
              style={allTheStyles.challengeMinusButton}
            >
              {"-  "}
            </Text>
            <Text onPress={this.addTries}
              style={allTheStyles.challengePlusButton}
            >
              {"+  "}
            </Text>
            {isTries &&
            <Text
              style={allTheStyles.triesIndicator}
            >
              {this.state.count == undefined ? 0 : this.state.count}
            </Text>}
            <Text
              style={allTheStyles.triesLabel}
            >
              {" tries"}
            </Text>
          </View>}

          { isTries && <Text>{"\n"}</Text>}


          {isTries &&
            <View
              style={allTheStyles.challengeMetronomeMain}>
              <View style={allTheStyles.challengeMetronomeColumn}>

                <View style={allTheStyles.metronomeLabelAndPlayButtonRow}>
                  <Text
                    style={allTheStyles.metronomeLabel}
                  >
                    {"      METRONOME        "}
                  </Text>
                </View>

                <View style={allTheStyles.metronomeLabelAndPlayButtonRow}>

                <Text
                  style={allTheStyles.challengeBpmIndicatorInit}
                >
                  {"BPM: "}
                </Text>

                <Text
                  style={this.state.auto ? allTheStyles.challengeBpmIndicatorGreen : allTheStyles.challengeBpmIndicatorInit}
                >
                  {this.state.bpm}
                </Text>
                <Metronome onPressCB={this.handleMetronomeIsPlayingChange} playPauseButtonTextStyle={allTheStyles.challengeMetronomeButton} bpm={this.state.bpm}></Metronome>

                </View>
              </View>
            </View>
          }
          {isTries && <View style={allTheStyles.challengeMetronomeSubheading}>
            <Text onPress={() => !this.state.metronomeIsPlaying ? this.subtractBpm() : alert("You need to stop the metronome first.")}
              style={this.state.metronomeIsPlaying ? allTheStyles.challengeBpmChangeButtonInVis : allTheStyles.challengeBpmChangeButtonVis}
            >
              {"- "}
            </Text>
            <Text onPress={() => !this.state.metronomeIsPlaying ? this.addBpm() : alert("You need to stop the metronome first.")}
              style={this.state.metronomeIsPlaying ? allTheStyles.challengeBpmChangeButtonInVis : allTheStyles.challengeBpmChangeButtonVis}
            >
              {" + "}
            </Text>
            <Text onPress={this.handleAutoToggle}
              style={this.state.auto ? allTheStyles.challengeAutoButtonG : allTheStyles.challengeAutoButton}
            >
              {" Auto"}
            </Text>
          </View>}

        </View>

      </View>
    );
  }
}

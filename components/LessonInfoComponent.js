import * as React from "react";
import {
  ScrollView,
  SafeAreaView,


  Text
} from "react-native";
import { HQI } from "../App";
import { allTheStyles } from "../styles/allTheStyles.js"

export class WholeAssLessonInfo extends React.Component {
  constructor(props) {
    super(props);

    this.open = this.open.bind(this);

    this.getCri = this.getCri.bind(this);
    this.state = {
      cri: "def",
      loading: "false"
    };

    HQI.mountLesson(this.props.instrument, this.props.lesson, this.getCri);
  }
  async componentDidMount() {
    this.getCri();
    if (this.state.loading === "true"){

      await this.props.nav.navigate("LessonStatsScreen", {
        lesson: this.props.lesson,
        instrument: this.props.instrument,
      })
    
  }


  }

  componentWillUnmount() {

  }

  async getCri() {
    // alert(HQI.getCri())
    this.setState({
      cri: HQI.getCri(),
    });
  }

  //entered at mount due to state channge
  componentDidUpdate() {
    if (this.state.loading === "true"){

      this.props.nav.navigate("LessonStatsScreen", {
        lesson: this.props.lesson,
        instrument: this.props.instrument,
      })
    
  }

  }


  async open(){


    
    const load = async () => {

      try {
          await this.setState({loading: "true"})
          this.forceUpdate()
        ;
        await this.props.cb();
      } catch (error) { }
    };

    load()

  }

  render() {

    // if (this.state.loading == "true"){
    //   return (
    //     <Text>{this.state.loading}</Text>
    //   )
    // }

    return (
      <SafeAreaView>
        <ScrollView snapToStart={false} style={allTheStyles.scrollStyle}>
          <Text style={allTheStyles.cri}>{this.state.cri}</Text>

          <Text
            style={allTheStyles.startButton}
            title={"start " + this.props.lesson}
            onPress={() => this.props.nav.navigate("LessonChallengeScreen", {
              lesson: this.props.lesson,
              instrument: this.props.instrument,
            })}
          >
            {"\n\n\nSTART"}
          </Text>
          <Text
            style={allTheStyles.startButton}
            title={"start " + this.props.lesson}
            onPress={() => this.open()}
          >
            {"\n\n\nSTATS"}
          </Text>
        </ScrollView>
        <Text style={allTheStyles.lessonInfoScreenSpacer}>{"\n"}</Text>
      </SafeAreaView>
    );
  }
}

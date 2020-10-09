import * as React from "react";
import {
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
  Button,
  Text,


  TouchableHighlight
} from "react-native";
import Swipeable from "react-native-swipeable-row";
import { HQI } from "../App";
import { allTheStyles } from "../styles/allTheStyles.js"
import { styles5 } from "../styles/styles5.js"

export class BetterLessonPreviewsContainer extends React.Component {
  constructor(props) {
    super(props); //this.props.num = 1;

    this.getLessonNames = this.getLessonNames.bind(this);
    this.getPresets = this.getPresets.bind(this);

    this.state = { lessons: [], currentlyOpenSwipeable: null };
  }

  componentDidMount() {
    this.getLessonNames();
    this.getPresets();
  }

  async getPresets(lessons) {
    var presets = {
      Lesson1: {
        instrument: "guitar",
        uniqueName: "a",
        cri: "a",
      },
      Lesson2: {
        instrument: "piano",
        uniqueName: "b",
        cri: "a",
      },
      Lesson2: {
        instrument: "piano",
        uniqueName: "c",
        cri: "a",
      },
    };

    const save = async (instr, name, cri) => {
      if (!lessons.includes(name) && this.props.instrument == instr) {
        try {
          await HQI.saveNewLesson(instr, name, cri);
        } catch (error) { }
      }
    };

    for (let i = 1; i < Object.keys(presets).length + 1; i++) {
      let key = "Lesson" + i;
      await save(
        presets[key]["instrument"],
        presets[key]["uniqueName"],
        presets[key]["cri"]
      );
    }
  }

  async getLessonNames() {
    var lessons = await HQI.getLessonNamesByInstrument(this.props.instrument);

    var response = await this.getPresets(lessons);

    this.setState({
      lessons: lessons,
    });
  }

  render() {
    const itemProps = {
      onOpen: (event, gestureState, swipeable) => {
        if (this.state.currentlyOpenSwipeable &&
          this.state.currentlyOpenSwipeable !== swipeable) {
          this.state.currentlyOpenSwipeable.recenter();
        }

        this.setState({ currentlyOpenSwipeable: swipeable });
      },
      onClose: () => this.setState({ currentlyOpenSwipeable: null }),
    };
    //this.num = 1;
    //const data = this.state.lessons.map( x => { this.getMap(x)})
    const rightButtons = [
      <TouchableHighlight>
        <Button
          title={"Delete                                      "}
          style="position: absolute; left: 0;"
          onPress={() => (t = 3)} />
      </TouchableHighlight>,
    ];
    return (
      <>
        <SafeAreaView>
          <ScrollView snapToStart={false} style={allTheStyles.scrollStyle}>
            <Text
              onPress={() => this.props.nav.navigate("AddLessonScreen", {
                instrument: this.props.instrument,
                cb: this.getLessonNames,
              })}
              style={allTheStyles.saveButton3}
            >
              {this.props.instrument}
            </Text>
            <Text
              onPress={() => this.props.nav.navigate("AddLessonScreen", {
                instrument: this.props.instrument,
                cb: this.getLessonNames,
              })}
              style={allTheStyles.saveButton4}
            >
              {"tap here to add lessons.\n"}
            </Text>

            <FlatList
              data={this.state.lessons}
              renderItem={({ item }) => (
                <Swipeable
                  rightButtons={[
                    <TouchableOpacity
                      onPress={async () => {
                        await HQI.deleteLesson(
                          this.props.instrument,
                          item,
                          this.getLessonNames
                        );
                      }}
                      style={[
                        styles5.rightSwipeItem,
                        { backgroundColor: "red" },
                      ]}
                    >
                      <Text></Text>
                    </TouchableOpacity>,
                  ]}
                  onRightButtonsOpenRelease={itemProps.onOpen}
                  onRightButtonsCloseRelease={itemProps.onClose}
                >
                  <Text
                    onPress={() => this.props.nav.navigate("LessonLaunchScreen", {
                      lesson: item,
                      instrument: this.props.instrument,
                    })}
                    style={allTheStyles.lessonOption}
                  >
                    {item}
                  </Text>
                </Swipeable>
              )}
              keyExtractor={(item, index) => index.toString()} />
            <Text style={allTheStyles.instrumentScreenSpacer}>{"\n"}</Text>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

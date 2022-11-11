import * as React from "react";
import {
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
  Text
} from "react-native";
import Swipeable from "react-native-swipeable-row";
import InstrumentRepository from "../repositories/InstrumentRepository";
import LessonRepository from "../repositories/LessonRepository";
import { allTheStyles } from "../styles/allTheStyles.js"
import { styles5 } from "../styles/styles5.js"

const instrumentRepository = InstrumentRepository.getInstance()
const lessonRepository = LessonRepository.getInstance()

export class LessonsPreviewComponent extends React.Component {
  constructor(props) {
    super(props); //this.props.num = 1;

    this.getLessonNames = this.getLessonNames.bind(this);

    this.state = { lessonNames: [], currentlyOpenSwipeable: null };
  }

  componentDidMount() {
    this.getLessonNames();
  }

  async getLessonNames() {
    var names = await instrumentRepository.getInstrumentByName(this.props.instrumentName).getLessonNames();
    this.setState({
      lessonNames: names,
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

    return (
      <>
        <SafeAreaView>
          <ScrollView snapToStart={false} style={allTheStyles.scrollStyle}>
            <Text
              onPress={() => this.props.nav.navigate("AddLessonScreen", {
                instrumentName: this.props.instrumentName,
                cb: this.getLessonNames,
              })}
              style={allTheStyles.saveButton3}
            >
              {this.props.instrumentName}
            </Text>
            <Text
              onPress={() => this.props.nav.navigate("AddLessonScreen", {
                instrumentName: this.props.instrumentName,
                cb: this.getLessonNames,
              })}
              style={allTheStyles.saveButton4}
            >
              {"tap here to add lessons.\n"}
            </Text>

            <FlatList
              data={this.state.lessonNames}
              renderItem={({ item }) => (
                <Swipeable
                  rightButtons={[
                    <TouchableOpacity
                      onPress={async () => {
                        await lessonRepository.delete(
                          item,
                          this.props.instrumentName
                        );
                        this.getLessonNames()
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
                      lessonName: item,
                      instrumentName: this.props.instrumentName,
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

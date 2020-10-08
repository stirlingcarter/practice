import * as React from "react";

import {
  TouchableOpacity,
  Keyboard,
  ScrollView,
  SafeAreaView,
  TextInput,
  FlatList,
  Button,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} from "react-native";

// You can import from local files
import { app_styles } from "./styles/styles.js"; //this me
import HQ from "./HQ";
import { render } from "react-dom";

// or any pure javascript modules available in npm
import { Card } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { AsyncStorage } from "react-native";
import Swipeable from "react-native-swipeable-row";

const Stack = createStackNavigator();

var HQI = HQ.getInstance();

export default function App() {
  const [stateString, setStateString] = React.useState("inital");

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "HomeScreen" }}
        />
        <Stack.Screen
          name="InstrumentScreen"
          component={InstrumentScreen}
          options={{ title: "InstrumentScreen" }}
        />
        <Stack.Screen
          name="LessonLaunchScreen"
          component={LessonLaunchScreen}
          options={{ title: "LessonLaunchScreen" }}
        />
        <Stack.Screen
          name="LessonChallengeScreen"
          component={LessonChallengeScreen}
          options={{ title: "LessonChallengeScreen" }}
        />
        <Stack.Screen
          name="AddLessonScreen"
          component={AddLessonScreen}
          options={{ title: "AddLessonScreen" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//SCREENS -----------------------------------------------------------------------------------------------------------------------------------------------------------

function HomeScreen({ navigation }) {
  var instrumentNames = HQI.getInstrumentNames();

  return (
    <View style={noteStyle.homeScreenBackground}>
      <Text style={noteStyle.homeScreenSpacer}>{"\n"}</Text>

      <FlatList
        data={instrumentNames}
        renderItem={({ item }) => (
          <>
            <Text
              onPress={() =>
                navigation.navigate("InstrumentScreen", { instrument: item })
              }
              style={noteStyle.instrumentNames}
            >
              {item + "\n"}
            </Text>
            <Text
              onPress={() =>
                navigation.navigate("InstrumentScreen", { instrument: item })
              }
              style={noteStyle.homescreenSpacer2}
            >
              {"\n"}
            </Text>
          </>
        )}
      />

      <Text style={noteStyle.homeScreenSpacer}>{"\n"}</Text>
    </View>
  );
}

function InstrumentScreen({ route, navigation }) {
  const { instrument } = route.params;

  return (
    <View>
      <BetterLessonPreviewsContainer nav={navigation} instrument={instrument} />
    </View>
  );
}
function LessonLaunchScreen({ route, navigation }) {
  const { lesson } = route.params;
  const { instrument } = route.params;

  //HQI.getStatsByInstr(instrument)
  return (
    <WholeAssLessonInfo
      instrument={instrument}
      nav={navigation}
      lesson={lesson}
    />
  );
}

function AddLessonScreen({ route, navigation }) {
  const { instrument } = route.params;
  const { cb } = route.params;

  return <AddLessonComponent instrument={instrument} cb={cb} />;
}

function LessonChallengeScreen({ route, navigation }) {
  const { lesson } = route.params;
  const { instrument } = route.params;

  return <WholeAssChallenge nav={navigation} />;
}

//COMPONENTS --------------------------------------------------------------------------------------------------------------------------------------------------------

class AddLessonComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = { name: "", cri: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCriChange = this.handleCriChange.bind(this);
  }

  handleNameChange(name) {
    this.setState({ name });
  }

  handleCriChange(cri) {
    this.setState({ cri });
  }

  handleSubmit() {
    const save = async () => {
      try {
        await HQI.saveNewLesson(
          this.props.instrument,
          this.state.name,
          this.state.cri
        );
        await this.props.cb();
      } catch (error) {}
    };

    save();
  }

  render() {
    return (
      <View style={noteStyle.saveScreenBackground}>
        <ScrollView>
          <View>
            <TextInput
              style={noteStyle.saveButton}
              onBlur={Keyboard.dismiss}
              placeholder="Title"
              maxLength={200}
              value={this.state.name}
              onChangeText={this.handleNameChange}
            />
            <Text style={noteStyle.saveScreenSpacer}>{"\n"}</Text>
            <TextInput
              style={noteStyle.saveButton5}
              onBlur={Keyboard.dismiss}
              placeholder="Description"
              numberOfLines={2}
              multiline={true}
              value={this.state.cri}
              onChangeText={this.handleCriChange}
            />

            <Text
              style={noteStyle.saveLessonButton}
              onPress={this.handleSubmit}
              onChangeText={this.handleNameChange}
            >
              {"save"}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

class LessonPreviewsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.getLessonNames = this.getLessonNames.bind(this);

    this.state = { lessons: [] };
  }

  componentDidMount() {
    this.getLessonNames();
  }

  async getLessonNames() {
    var lessons = await HQI.getLessonNamesByInstrument(this.props.instrument);

    this.setState({
      lessons: lessons,
    });
  }

  render() {
    return (
      <>
        <Button
          title={"Add Lesson"}
          onPress={() =>
            this.props.nav.navigate("AddLessonScreen", {
              instrument: this.props.instrument,
              cb: this.getLessonNames,
            })
          }
        />

        <FlatList
          data={this.state.lessons}
          renderItem={({ item }) => (
            <Button
              title={item}
              onPress={() =>
                this.props.nav.navigate("LessonLaunchScreen", {
                  lesson: item,
                  instrument: this.props.instrument,
                })
              }
            />
          )}
        />
      </>
    );
  }
}

class BetterLessonPreviewsContainer extends React.Component {
  constructor(props) {
    super(props); //this.props.num = 1;

    this.getLessonNames = this.getLessonNames.bind(this);

    this.state = { lessons: [], currentlyOpenSwipeable: null };
  }

  componentDidMount() {
    this.getLessonNames();
  }

  async getLessonNames() {
    var lessons = await HQI.getLessonNamesByInstrument(this.props.instrument);
    this.setState({
      lessons: lessons,
    });
  }

  render() {
    const itemProps = {
      onOpen: (event, gestureState, swipeable) => {
        if (
          this.state.currentlyOpenSwipeable &&
          this.state.currentlyOpenSwipeable !== swipeable
        ) {
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
          onPress={() => (t = 3)}
        />
      </TouchableHighlight>,
    ];
    return (
      <>
        <SafeAreaView>
          <ScrollView snapToStart={false} style={noteStyle.scrollStyle}>
          <SafeAreaView style={{flex: 1}}>
            <Text
              onPress={() =>
                this.props.nav.navigate("AddLessonScreen", {
                  instrument: this.props.instrument,
                  cb: this.getLessonNames,
                })
              }
              style={noteStyle.saveButton3}
            >
              {this.props.instrument}
            </Text>
            <Text
              onPress={() =>
                this.props.nav.navigate("AddLessonScreen", {
                  instrument: this.props.instrument,
                  cb: this.getLessonNames,
                })
              }
              style={noteStyle.saveButton4}
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
                        styles3.rightSwipeItem,
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
                    onPress={() =>
                      this.props.nav.navigate("LessonLaunchScreen", {
                        lesson: {item},
                        instrument: this.props.instrument,
                      })
                    }
                    style={noteStyle.lessonOption}
                  >
                    {item}
                  </Text>
                </Swipeable>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <Text style={noteStyle.instrumentScreenSpacer}>{"\n"}</Text>
            </SafeAreaView>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
class WholeAssLessonInfo extends React.Component {
  constructor(props) {
    super(props);
    this.getCri = this.getCri.bind(this);
    this.state = {
      cri: "def",
    };

    HQI.mountLesson(this.props.instrument, this.props.lesson, this.getCri);
  }
  componentDidMount() {
    this.getCri();
  }

  async getCri() {
    // alert(HQI.getCri())
    this.setState({
      cri: HQI.getCri(),
    });
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView snapToStart={false} style={noteStyle.scrollStyle}>
          <Text style={noteStyle.cri}>{this.state.cri}</Text>

          <Text
            style={noteStyle.startButton}
            title={"start " + this.props.lesson}
            onPress={() =>
              this.props.nav.navigate("LessonChallengeScreen", {
                lesson: this.props.lesson,
                instrument: this.props.instrument,
              })
            }
          >
            {"\n\n\nSTART"}
          </Text>
        </ScrollView>
        <Text style={noteStyle.lessonInfoScreenSpacer}>{"\n"}</Text>
      </SafeAreaView>
    );
  }
}

//  want this to be ininviisiible and cover whole screen TODO
class WholeAssChallenge extends React.Component {
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
        note: HQI.getNextNote(),
        start: Date.now(),
        isOn: true,
        end: this.state.end,
      });
    }
  }

  render() {
    return (
      <View style={noteStyle.challengeScreenBackground}>
        <Text>{"\n\n\n\n\n\n\n"}</Text>
        <Text
          onPress={() => this.challengeCallback(this.props.nav)}
          style={noteStyle.challengeButton}
        >
          {this.state.note}
        </Text>
        {/* <Text onPress={() => this.challengeCallback(this.props.nav)} style = {noteStyle.saveButton2} >{"TAP SCREEN WHEN DONE"}</Text> */}
      </View>
    );
  }
}

//STYLES ------------------------------------------------------------------------------------------------------------------------------------------------------------

const noteStyle = StyleSheet.create({
  saveButton: {
    textAlignVertical: "center",
    textAlign: "center",
    backgroundColor: "#FFEBCD",
    fontSize: 100,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 170,
  },
  startButton: {
    textAlignVertical: "center",
    textAlign: "center",
    backgroundColor: "#FFEBCD",
    fontSize: 100,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 300,
  },
  saveButton2: {
    textAlignVertical: "top",
    textAlign: "center",
    backgroundColor: "#98FB98",
    fontSize: 25,
    fontStyle: "italic",
    fontWeight: "bold",
  },

  saveButton3: {
    textAlignVertical: "top",
    textAlign: "center",
    backgroundColor: "#98FB98",
    fontSize: 89,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  saveButton4: {
    textAlignVertical: "top",
    textAlign: "center",
    backgroundColor: "#98FB98",
    fontSize: 12,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  saveButton5: {
    flexShrink: 1,
    textAlignVertical: "top",
    textAlign: "center",
    backgroundColor: "#FFEBCD",
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 200,
    color: "#000000",
    flexDirection: "column",
  },

  saveScreenSpacer: {
    textAlignVertical: "top",
    textAlign: "center",
    backgroundColor: "#FFEBCD",
    fontSize: 25,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  lessonInfoScreenSpacer: {
    textAlignVertical: "top",
    textAlign: "center",
    backgroundColor: "#FFEBCD",
    fontSize: 25,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 300,
  },

  instrumentNames: {
    textAlignVertical: "top",
    textAlign: "center",
    backgroundColor: "#FFEBCD",
    fontSize: 89,
    fontStyle: "italic",
    fontWeight: "bold",
  },

  homescreenSpacer2: {
    textAlignVertical: "top",
    textAlign: "center",
    backgroundColor: "#FFEBCD",
    fontSize: 12,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 80,
  },

  lessonOption: {
    textAlignVertical: "top",
    textAlign: "center",
    backgroundColor: "#FFEBCD",
    fontSize: 89,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 110,
  },

  homeScreenSpacer: {
    textAlignVertical: "top",
    textAlign: "center",
    backgroundColor: "#FFEBCD",
    fontSize: 25,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 90,
  },

  saveLessonButton: {
    textAlignVertical: "center",
    textAlign: "center",
    backgroundColor: "#FFEBCD",
    fontSize: 100,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 180,
  },

  instrumentScreenSpacer: {
    textAlignVertical: "center",
    textAlign: "center",
    backgroundColor: "#FFEBCD",
    fontSize: 100,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 500,
  },
  instrumentScreenBackground: {
    backgroundColor: "#FFEBCD",
  },
  homeScreenBackground: {
    backgroundColor: "#FFEBCD",
  },
  saveScreenBackground: {
    backgroundColor: "#FFEBCD",
  },
  lessonInfoScreenBackground: {
    backgroundColor: "#FFEBCD",
    height: 5000,
  },
  challengeScreenBackground: {
    backgroundColor: "#FFEBCD",
    height: 2000,
  },
  challengeButton: {
    textAlignVertical: "center",
    textAlign: "center",
    backgroundColor: "#FFEBCD",
    fontSize: 250,
    fontStyle: "italic",
    fontWeight: "bold",
  },

  cri: {
    textAlignVertical: "center",
    textAlign: "auto",
    backgroundColor: "#FFEBCD",
    fontSize: 100,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  scrollStyle: {
    backgroundColor: "#FFEBCD",
  },
});

//LEFTOVER 3RD PARTY STYLES ------------------------------------------------------------------------------------------------------------------------------------------------------------

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const styles2 = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#000000",
    paddingTop: 15,
    paddingBottom: 25,
  },
  textInput: {
    borderColor: "#CCCCCC",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20,
  },
  saveButton: {
    borderWidth: 1,
    borderColor: "#007BFF",
    backgroundColor: "#007BFF",
    padding: 15,
    margin: 5,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center",
  },
});

//SHOWING ONLY. THE EYES, THE FACE.
const styles3 = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  listItem: {
    height: 75,
    alignItems: "center",
    justifyContent: "center",
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 20,
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 0,
  },
});

const styles4 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignItems: "stretch",
  },
  title: {
    fontSize: 20,
    color: "#fff",
  },
  item1: {
    backgroundColor: "orange",
    flex: 1,
    height: 200,
    fontSize: 50,
  },
  item2: {
    backgroundColor: "purple",
    flex: 1,
  },
  item3: {
    backgroundColor: "yellow",
    flex: 1,
  },
  item4: {
    backgroundColor: "red",
    flex: 1,
  },
});

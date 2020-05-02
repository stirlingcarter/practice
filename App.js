import * as React from "react";

import {
  TouchableOpacity,
  Keyboard,
  ScrollView,
  TextInput,
  FlatList,
  Button,
  Text,
  View,
  StyleSheet,
} from "react-native";

// You can import from local files
import { app_styles } from "./styles/styles.js"; //this me
import HQ from "./HQ";

// or any pure javascript modules available in npm
import { Card } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

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
    <View style={styles1.container}>
      <FlatList
        data={instrumentNames}
        renderItem={({ item }) => (
          <Button
            title={item}
            onPress={() =>
              navigation.navigate("InstrumentScreen", { instrument: item })
            }
          />
        )}
      />
    </View>
  );
}

function InstrumentScreen({ route, navigation }) {
  const { instrument } = route.params;

  //alert(HQI.getOrderedUniqueLessonNamesByInstr(instrument))

  return (
    <View style={styles1.container}>
      <Text>{instrument}</Text>
      <LessonPreviewsContainer nav={navigation} instrument={instrument} />
    </View>
  );
}

function LessonLaunchScreen({ route, navigation }) {
  const { lesson } = route.params;
  const { instrument } = route.params;

  HQI.mountLesson(instrument, lesson);
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

  return <AddLessonComponent instrument={instrument} />;
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
    HQI.saveNewLesson(this.props.instrument, this.state.name, this.state.cri);
  }

  render() {
    return (
      <View style={styles1.container}>
        <ScrollView>
          <View style={styles2.inputContainer}>
            <TextInput
              style={styles2.textInput}
              onBlur={Keyboard.dismiss}
              placeholder="Minor 7 root voicings"
              maxLength={20}
              value={this.state.name}
              onChangeText={this.handleNameChange}
            />
            <TextInput
              style={styles2.textInput}
              onBlur={Keyboard.dismiss}
              placeholder="Play every root voicing of <note>minor7"
              maxLength={20}
              value={this.state.cri}
              onChangeText={this.handleCriChange}
            />

            <View style={styles2.inputContainer}>
              <TouchableOpacity style={styles2.saveButton}>
                <Text
                  style={styles2.saveButtonText}
                  onPress={this.handleSubmit}
                >
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

class LessonPreviewsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { lessons: [] };

    const getLessonNames = async () => {
      const result = await HQI.mountLessonNames();
      this.setState({
        lessons: HQI.getOrderedUniqueLessonNamesByInstr(this.props.instrument),
      });
    };

    getLessonNames();
  }

  render() {
    return (
      <>
        <Button
          title={"Add Lesson"}
          onPress={() =>
            this.props.nav.navigate("AddLessonScreen", {
              instrument: this.props.instrument,
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

class WholeAssLessonInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{HQI.getCri()}</Text>
        <Button
          title={"start " + this.props.lesson}
          onPress={() =>
            this.props.nav.navigate("LessonChallengeScreen", {
              lesson: this.props.lesson,
              instrument: this.props.instrument,
            })
          }
        />
      </View>
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
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>{this.state.note}</Text>
          <Text>{HQI.getBpm()}</Text>
          <Text>{HQI.getCri()}</Text>
          <Text>{HQI.getVisId()}</Text>
        </View>
        <Text>{"\n\n\n\n"}</Text>

        <Button
          title={"NEXT"}
          onPress={() => this.challengeCallback(this.props.nav)}
        />
      </View>
    );
  }
}

//STYLES ------------------------------------------------------------------------------------------------------------------------------------------------------------

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
    paddingTop: 15,
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

import * as React from "react";

import { FlatList, Button, Text, View, StyleSheet } from "react-native";

// You can import from local files
import { app_styles } from "./styles/styles.js"; //this me
import HQ from "./HQ";
// or any pure javascript modules available in npm
import { Card } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

const HQI = new HQ(); 

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//SCREENS -----------------------------------------------------------------------------------------------------------------------------------------------------------

function HomeScreen({ navigation }) {
  var instrumentNames = getInstrumentNames();

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

  // load lessonIds from disk. for <insntrument>
  var lessons = ["lesson1", "lesson2", "3"];

  return (
    <View style={styles1.container}>
      <Text>{instrument}</Text>
      <LessonPreviewsContainer nav={navigation} lessons={lessons} />
    </View>
  );
}

function LessonLaunchScreen({ route, navigation }) {
  const { lesson } = route.params;
  const { instrument } = route.params;
  //HQ.getStatsByInstr(instrument)
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>speed increase thus far: 7 MILLIOIN PERCENT</Text>
      <Button
        title={"start " + lesson}
        onPress={() =>
          navigation.navigate("LessonChallengeScreen", {
            lesson: lesson,
            instrument: instrument,
          })
        }
      />
    </View>
  );
}

function LessonChallengeScreen({ route, navigation }) {
  const { lesson } = route.params;
  const { instrument } = route.params;

  //HQ.initializeLesson(instrument,lesson)

  let note = new Note("A", 0, "whatever", "aM_pic.jpg");
  return <WholeAssChallenge note={note} nav={navigation} />;
}

//COMPONENTS --------------------------------------------------------------------------------------------------------------------------------------------------------

function LessonPreviewsContainer(props) {
  return (
    <FlatList
      data={props.lessons}
      renderItem={({ item }) => (
        <Button
          title={item}
          onPress={() =>
            props.nav.navigate("LessonLaunchScreen", { lesson: item })
          }
        />
      )}
    />
  );
}

class Note {
  constructor(note, bpm, cri, visId) {
    this.note = note;
    this.bpm = bpm;
    this.cri = cri;
    this.visId = visId;
  }

  getNote() {
    return this.note;
  }

  getBpm() {
    return this.bpm;
  }

  getCri() {
    return this.cri;
  }

  getVisId() {
    return this.visId;
  }
}

class ChallengeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //brain blast!!!

      //HQ.getNextNote()
      note: new Note("A", 0, "whatever", "aM_pic.jpg"),
    };
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{this.state.note.getNote()}</Text>
        <Text>{this.state.note.getBpm()}</Text>
        <Text>{this.state.note.getCri()}</Text>
        <Text>{this.state.note.getVisId()}</Text>
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
    //HQ.saveLesson()
  }
  //entered at mount due to state channge
  componentDidUpdate() {
    //not entered at mount due to bool
    if (this.state.isOn == false) {
      let diff = this.state.end - this.state.start;
      alert(diff);
      //HQ.commit(diff)

      this.setState({
        start: Date.now(),
        isOn: true,
        end: this.state.end,
      });
    }
  }

  challengeCallback(nav) {
    this.setState({
      isOn: false,
      end: Date.now(),
    });

    nav.navigate("LessonChallengeScreen");
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ChallengeCard />

        <Text>{"\n\n\n\n"}</Text>

        <Button
          title={"DONE, NEXT."}
          onPress={() => this.challengeCallback(this.props.nav)}
        />
      </View>
    );
  }
}

//DATA COMPUTATION FUNCTIONS ----------------------------------------------------------------------------------------------------------------------------------------

function getInstrumentNames() {
  var names = ["guitar", "piano"];
  return names;
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

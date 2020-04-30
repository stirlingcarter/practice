import * as React from "react";

import {
  FlatList,
  Button,
  Text,
  View,
  StyleSheet,
  ProgressBarAndroid,
  ProgressBarAndroidComponent,
} from "react-native";

// You can import from local files
import AssetExample from "./components/AssetExample";
import { app_styles } from "./styles/styles.js"; //this me

// or any pure javascript modules available in npm
import { Card } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

//const db = timeDB(); //constrcutr loads shit from disk
//db.commit(instr,lesson,note,time)
//db.save()
const Stack = createStackNavigator();

export default function App() {
  const [stateString, setStateString] = React.useState("inital");

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "landing" }}
        />
        <Stack.Screen
          name="InstrumentScreen"
          component={InstrumentScreen}
          options={{ title: "lessons" }}
        />
        <Stack.Screen
          name="LessonLaunchScreen"
          component={LessonLaunchScreen}
          options={{ title: "lesson launch" }}
        />
        <Stack.Screen
          name="LessonChallengeScreen"
          component={LessonChallengeScreen}
          options={{ title: "lesson challenge" }}
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

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>speed increase thus far: 7 MILLIOIN PERCENT</Text>
      <Button
        title={"start " + lesson}
        onPress={() =>
          navigation.navigate("LessonChallengeScreen", { lesson: lesson })
        }
      />
    </View>
  );
}

function LessonChallengeScreen({ route, navigation }) {
  const { lesson } = route.params;

  var challenge_data = {
    //db.getNext()
    note: "A",
    bpm: "0",
    cri: "every instance",
    visId: "neck_maj7_e_root",
  };

  var note = challenge_data["note"]; // A
  var bpm = challenge_data["bpm"]; // 0
  var cri = challenge_data["cri"]; // every voicing of x
  var visId = challenge_data["visId"]; // the path of a pic, perhaps

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
      //clock

      //brain blast
      note: new Note("A", 0, "whatever", "aM_pic.jpg"),

      // note: brain.getNextNote
      // bpm: props.bpm,
      // cri: props.cri
      // visId:
    };
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{this.state.note.getNote()}</Text>
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

      // note: brain.getNextNote
      // bpm: props.bpm,
      // cri: props.cri
      // visId:
    };
  }

  componentDidMount() {
    this.setState({
      start: Date.now(),
      isOn: true,
      end: this.state.end,
    });
  }

  //entered at mount due to state channge
  componentDidUpdate() {
    //not entered at mount due to bool
    if (this.state.isOn == false) {
      let diff = this.state.end - this.state.start;
      alert(diff);
      //brain.update(diff)

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

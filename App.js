import * as React from "react";

import { FlatList, Button, Text, View, StyleSheet } from "react-native";

// You can import from local files
import AssetExample from "./components/AssetExample";
import { app_styles } from "./styles/styles.js"; //this me

// or any pure javascript modules available in npm
import { Card } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";


const Stack = createStackNavigator();


export default function App() {

  return (

    <Practice/>

  );


}



function Practice(props) {

  return (

    <EntryScreen/>

  );

}


function EntryScreen(props) {

  return (

    <InstrumentPreviewsContainer/>

  );

}


function InstrumentPreviewsContainer(props) {

  let Instruments = ["gutar","pano"]
  
  var instrument = "piiano"

  return (

     <>
    

    <InstrumentPreview instr={instrument}/>
    </>

  );

}

function InstrumentPreview(props) {

  return (

    < Text u/>

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
      <Button title={"start " + lesson} onPress={() => navigation.navigate("LessonChallengeScreen")} />
    </View>
  );
}

function LessonChallengeScreen({ route, navigation }) {

  var challenge_data = {
    "note" : "A",
    "bpm" : "0",
    "cri" : "every instance",
    "visId" : "neck_maj7_e_root",
  }

  var note = challenge_data["note"] // A
  var bpm = challenge_data["bpm"] // 0 
  var cri = challenge_data["cri"] // every voicing of x 
  var visId = challenge_data["visId"] // the path of a pic, perhaps

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{"Play " + cri + " of " + note + " at " + bpm + " bpm:" }</Text> 
      <Text>{"\n\n\n\n"}</Text> 

      <Button title={"DONE, NEXT."} onPress={() => navigation.navigate("LessonChallengeScreen")} />
    </View>
  );
}


//COMPONENTS --------------------------------------------------------------------------------------------------------------------------------------------------------

function LessonPreviewsContainer(props) {
  return (
    <FlatList
      data={props.lessons}
      renderItem={({ item }) => (
        <Button title={item} onPress={() => props.nav.navigate("LessonLaunchScreen", {lesson : item})} />
      )}
    />
  );
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




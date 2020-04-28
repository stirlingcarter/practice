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


  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>do a back flip.</Text> 
      <Text>{"\n\n\n\n"}</Text> 

      <Button title={"DONE, NEXT."} onPress={() => props.nav.navigate("LessonLaunchScreen", {lesson : "yo"})} />
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




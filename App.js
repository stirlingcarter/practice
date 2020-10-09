import * as React from "react";


// You can import from local files
import { app_styles } from "./styles/styles.js"; //this me
import HQ from "./HQ";
import { render } from "react-dom";

// or any pure javascript modules available in npm
import { Card } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { AsyncStorage } from "react-native";
import { LessonChallengeScreen } from "./screens/LessonChallengeScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { InstrumentScreen } from "./screens/InstrumentScreen";
import { LessonLaunchScreen } from "./screens/LessonLaunchScreen";
import { AddLessonScreen } from "./screens/AddLessonScreen";
import { allTheStyles } from "./styles/allTheStyles";
import { styles5 } from "./styles/styles5";

const Stack = createStackNavigator();

export var HQI = HQ.getInstance();

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






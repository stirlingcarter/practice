import * as React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { LessonChallengeScreen } from "./screens/LessonChallengeScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { InstrumentScreen } from "./screens/InstrumentScreen";
import { LessonLaunchScreen } from "./screens/LessonLaunchScreen";
import { AddLessonScreen } from "./screens/AddLessonScreen";
import { LessonStatsScreen } from "./screens/LessonStatsScreen";

const Stack = createStackNavigator();

export default function App() {

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
        <Stack.Screen
          name="LessonStatsScreen"
          component={LessonStatsScreen}
          options={{ title: "LessonStatsScreen" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}






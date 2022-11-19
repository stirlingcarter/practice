import * as React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { LessonChallengeScreen } from "./screens/LessonChallengeScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { GroupScreen } from "./screens/GroupScreen";
import { LessonLaunchScreen } from "./screens/LessonLaunchScreen";
import { AddCustomLessonScreen } from "./screens/AddCustomLessonScreen";
import { LessonStatsScreen } from "./screens/LessonStatsScreen";

import { GroupStatsScreen } from "./screens/GroupStatsScreen";
import { IntroScreen } from "./screens/IntroScreen";
import { AddLessonFromTemplateScreen } from "./screens/AddLessonFromTemplateScreen";
import { AddGroupScreen } from "./screens/AddGroupScreen";
import { ScanLeadsheetScreen } from "./screens/ScanLeadsheetScreen";
import { LessonSourceScreen } from "./screens/LessonSourceScreen";
import ChallengeService from "./services/ChallengeService";
import StatService from "./services/StatService";

import GroupRepository from "./repositories/GroupRepository";
import LessonRepository from "./repositories/LessonRepository";

import LifecycleManager from "./services/LifecycleManager";

const PROD = "production"
const LOCAL = "production"
const PROFILE = PROD

export const lessonRepository = new LessonRepository()
export const groupRepository = new GroupRepository()
const lifecycleManager = new LifecycleManager()

export const challengeService = new ChallengeService()
export const statService = new StatService()


const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="IntroScreen"   screenOptions={{
    headerShown: false,
    cardStyle: {
      backgroundColor: '#222222'
  }
  }}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: "HomeScreen" }}
        />
        <Stack.Screen
          name="GroupScreen"
          component={GroupScreen}
          options={{ title: "GroupScreen" }}
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
          name="AddCustomLessonScreen"
          component={AddCustomLessonScreen}
          options={{ title: "AddCustomLessonScreen" }}
        />
        <Stack.Screen
          name="LessonStatsScreen"
          component={LessonStatsScreen}
          options={{ title: "LessonStatsScreen" }}
        />
        <Stack.Screen
          name="GroupStatsScreen"
          component={GroupStatsScreen}
          options={{ title: "GroupStatsScreen" }}
        />
        <Stack.Screen
          name="IntroScreen"
          component={IntroScreen}
          options={{ title: "IntroScreen" }}
        />
        <Stack.Screen
          name="AddLessonFromTemplateScreen"
          component={AddLessonFromTemplateScreen}
          options={{ title: "AddLessonFromTemplateScreen" }}
        />
        <Stack.Screen
          name="AddGroupScreen"
          component={AddGroupScreen}
          options={{ title: "AddGroupScreen" }}
        />
        <Stack.Screen
          name="ScanLeadsheetScreen"
          component={ScanLeadsheetScreen}
          options={{ title: "ScanLeadsheetScreen" }}
        />
        <Stack.Screen
          name="LessonSourceScreen"
          component={LessonSourceScreen}
          options={{ title: "LessonSourceScreen" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}






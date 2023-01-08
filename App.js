import * as React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { LessonChallengeScreen } from "./screens/LessonChallengeScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { GroupScreen } from "./screens/GroupScreen";
import { LessonLaunchScreen } from "./screens/LessonLaunchScreen";
import { AddCustomLessonScreen } from "./screens/AddCustomLessonScreen";
import { LessonStatsScreen } from "./screens/LessonStatsScreen";
import { FluencyRequirementsScreen } from "./screens/FluencyRequirementsScreen";
import { SingleRowVariantChooserSaverScreen } from "./screens/SingleRowVariantChooserSaverScreen";
import { GroupStatsScreen } from "./screens/GroupStatsScreen";
import { IntroScreen } from "./screens/IntroScreen";
import { AddLessonFromTemplateScreen } from "./screens/AddLessonFromTemplateScreen";
import { AddGroupScreen } from "./screens/AddGroupScreen";
import { ScanLeadsheetScreen } from "./screens/ScanLeadsheetScreen";
import { LessonSourceScreen } from "./screens/LessonSourceScreen";
import { AddVariantGroupScreen } from "./screens/AddVariantGroupScreen";
import ChallengeService from "./services/ChallengeService";
import StatService from "./services/StatService";
import { Audio } from 'expo-av';

import GroupRepository from "./repositories/GroupRepository";
import LessonRepository from "./repositories/LessonRepository";
import CustomVariantSetRepository from "./repositories/CustomVariantSetRepository";

import LifecycleManager from "./services/LifecycleManager";

export const sounds = [
  new Audio.Sound(), //20-30
  new Audio.Sound(), //31-40
  new Audio.Sound(), //41-50
  new Audio.Sound(), //51-60
  new Audio.Sound(), //61-70
  new Audio.Sound(), //71-80
  new Audio.Sound(), //81-90
  new Audio.Sound(), //91-100
  new Audio.Sound(), //101-110
  new Audio.Sound() //111+
]

const PROD = "production"
const LOCAL = "production"
const PROFILE = PROD

export const lessonRepository = new LessonRepository()
export const groupRepository = new GroupRepository()
export const customVariantSetRepository = new CustomVariantSetRepository()

const lifecycleManager = new LifecycleManager()

export const challengeService = new ChallengeService()
export const statService = new StatService()


const Stack = createStackNavigator();

export default function App() {


    sounds[0].loadAsync(require('./assets/sounds/metronome/25bpm10m.mp3'), {shouldPlay: false});
    sounds[1].loadAsync(require('./assets/sounds/metronome/35bpm10m.mp3'), {shouldPlay: false});
    sounds[2].loadAsync(require('./assets/sounds/metronome/45bpm10m.mp3'), {shouldPlay: false});
    sounds[3].loadAsync(require('./assets/sounds/metronome/55bpm10m.mp3'), {shouldPlay: false});
    sounds[4].loadAsync(require('./assets/sounds/metronome/65bpm10m.mp3'), {shouldPlay: false});
    sounds[5].loadAsync(require('./assets/sounds/metronome/75bpm10m.mp3'), {shouldPlay: false});
    sounds[6].loadAsync(require('./assets/sounds/metronome/85bpm10m.mp3'), {shouldPlay: false});
    sounds[7].loadAsync(require('./assets/sounds/metronome/95bpm10m.mp3'), {shouldPlay: false});
    sounds[8].loadAsync(require('./assets/sounds/metronome/105bpm10m.mp3'), {shouldPlay: false});
    sounds[9].loadAsync(require('./assets/sounds/metronome/120bpm10m.mp3'), {shouldPlay: false});
  
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="IntroScreen" screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'black'
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
        <Stack.Screen
          name="AddVariantGroupScreen"
          component={AddVariantGroupScreen}
          options={{ title: "AddVariantGroupScreen" }}
        />
        <Stack.Screen
          name="FluencyRequirementsScreen"
          component={FluencyRequirementsScreen}
          options={{ title: "FluencyRequirementsScreen" }}
        />
        <Stack.Screen
          name="SingleRowVariantChooserSaverScreen"
          component={SingleRowVariantChooserSaverScreen}
          options={{ title: "SingleRowVariantChooserSaverScreen" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}




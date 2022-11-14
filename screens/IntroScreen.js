import * as React from "react";
import { View, Text, FlatList } from "react-native";
import { allTheStyles } from "../styles/allTheStyles.js"
import { IntroComponent } from "../components/IntroComponent"

export function IntroScreen({ navigation }) {
  return (
    <View style={allTheStyles.homeScreenBackground}>
      <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>

      <IntroComponent nav={navigation}></IntroComponent>

      <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>
    </View>
  );
}

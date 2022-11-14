import * as React from "react";
import { View, Text, FlatList } from "react-native";
import { allTheStyles } from "../styles/allTheStyles.js"
import {  groupRepository } from "../App";
import { HomeScreenComponent } from "../components/HomeScreenComponent.js";

export function HomeScreen({ navigation }) {
  const headGroup = groupRepository.getHeadGroup()
  
  const groupNames = headGroup.getGroupNames()
  return (
    <View style={allTheStyles.homeScreenBackground}>
      <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>

      <HomeScreenComponent  nav={navigation} groupNames={groupNames}></HomeScreenComponent>

      <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>
    </View>
  );
}

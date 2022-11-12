import * as React from "react";
import { View, Text, FlatList } from "react-native";
import { allTheStyles } from "../styles/allTheStyles.js"
import groupRepository from "../repositories/GroupRepository";
import { HomeScreenComponent } from "../components/HomeScreenComponent.js";

export function HomeScreen({ navigation }) {
  const headGroup = groupRepository.getHeadGroup()
  const groupNames = headGroup.getGroupNames()
  return (
    <View style={allTheStyles.homeScreenBackground}>
      <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>

      <HomeScreenComponent groupNames={groupNames}></HomeScreenComponent>

      <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>
    </View>
  );
}

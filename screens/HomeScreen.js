import * as React from "react";
import { View, Text, FlatList } from "react-native";
import { allTheStyles } from "../styles/allTheStyles.js"
import {  groupRepository } from "../App";
import { HomeScreenComponent } from "../components/HomeScreenComponent.js";
import Constants from "../constant/Constants.js";
export function HomeScreen({ navigation }) {
  const headGroup = groupRepository.getHeadGroup()
  const path = Constants.HEAD_GROUP_PATH
  const groupNames = headGroup.getGroupNames()
  return (
    <View style={allTheStyles.homeScreenBackground}>

      <HomeScreenComponent  nav={navigation} groupNames={groupNames} path={path}></HomeScreenComponent>

    </View>
  );
}

import * as React from "react";
import { View, Text, FlatList } from "react-native";
import { allTheStyles } from "../styles/allTheStyles.js"
import groupRepository from "../repositories/GroupRepository";

export function HomeScreen({ navigation }) {
  var headGroup = groupRepository.getHeadGroup()
  let groupNames = headGroup.getGroupNames()
  return (
    <View style={allTheStyles.homeScreenBackground}>
      <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>

      <FlatList
        data={groupNames}
        renderItem={({ item }) => (
          <>
            <Text
              onPress={() => navigation.navigate("GroupScreen", { groupName: item })}
              style={allTheStyles.groupNames}
            >
              {item + "\n"}
            </Text>
            <Text
              onPress={() => navigation.navigate("GroupScreen", { groupName: item })}
              style={allTheStyles.homescreenSpacer2}
            >
              {"\n"}
            </Text>
          </>
        )} />

      <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>
    </View>
  );
}

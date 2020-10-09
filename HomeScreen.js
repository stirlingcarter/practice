import * as React from "react";
import { HQI } from "./App";
import {View, Text, FlatList} from "react-native" ;
import { allTheStyles } from "./allTheStyles.js"

export function HomeScreen({ navigation }) {
  var instrumentNames = HQI.getInstrumentNames();

  return (
    <View style={allTheStyles.homeScreenBackground}>
      <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>

      <FlatList
        data={instrumentNames}
        renderItem={({ item }) => (
          <>
            <Text
              onPress={() => navigation.navigate("InstrumentScreen", { instrument: item })}
              style={allTheStyles.instrumentNames}
            >
              {item + "\n"}
            </Text>
            <Text
              onPress={() => navigation.navigate("InstrumentScreen", { instrument: item })}
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

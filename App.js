import * as React from "react";

import { FlatList, Button, Text, View, StyleSheet } from "react-native";

// You can import from local files
import AssetExample from "./components/AssetExample";

// or any pure javascript modules available in npm
import { Card } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// STYLE IMPORT
import { app_styles } from "./styles/styles.js";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "HOME_SCR" }}
        />
        <Stack.Screen
          name="InstrumentScreen"
          component={InstrumentScreen}
          options={{ title: "INSTR_SCRj" }}
        />
        <Stack.Screen
          name="LessonScreen"
          component={LessonScreen}
          options={{ title: "lesson_screen_title" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  var instrumentNames = getInstrumentNames();

  return (
    <View style={styles1.container}>
      <FlatList
        data={instrumentNames}
        renderItem={({ item }) => (
          <Button
            title={item}
            onPress={() =>
              navigation.navigate("InstrumentScreen", { instrument: item })
            }
          />
        )}
      />
    </View>
  );
}

function InstrumentScreen({ route, navigation }) {
  const { instrument } = route.params;

  var lessons = ["lesson1", "lesson2", "3"];

  return (
    <View style={styles1.container}>
      <Text>hi</Text>
      <LessonContainer nav={navigation} lessons={lessons} />
    </View>
  );
}

function getInstrumentNames() {
  var names = ["guitar", "piano"];
  return names;
}

function LessonContainer(props) {
  return (
    <FlatList
      data={props.lessons}
      renderItem={({ item }) => (
        <Button title={item} onPress={() => props.nav.navigate({ item })} />
      )}
    />
  );
}

function LessonScreen({ route, navigation }) {
  const { lesson } = route.params;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>playcard component go here</Text>
    </View>
  );
}

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

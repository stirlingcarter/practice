import * as React from "react";
import { View, Text, FlatList } from "react-native";
import { allTheStyles } from "../styles/allTheStyles.js"
import { LessonSourceComponent } from "../components/LessonSourceComponent.js";

export function LessonSourceScreen({ navigation }) {
    const { groupName } = route.params;
    return (
        <View style={allTheStyles.homeScreenBackground}>
            <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>

            <LessonSourceComponent groupName={groupName}></LessonSourceComponent>

            <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>
        </View>
    );
}

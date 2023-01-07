import * as React from "react";
import { View, Text, FlatList } from "react-native";
import { allTheStyles } from "../styles/allTheStyles.js"
import { LessonSourceComponent } from "../components/LessonSourceComponent.js";

export function LessonSourceScreen({ route, navigation }) {
    const { path } = route.params;
    const { cb } = route.params;

    return (
        <View style={allTheStyles.homeScreenBackground}>

            <LessonSourceComponent nav={navigation} path={path} cb ={cb}></LessonSourceComponent>

            <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>
        </View>
    );
}

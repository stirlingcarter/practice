import * as React from "react";
import { View } from "react-native";
import { LessonPreviewComponent } from "../components/LessonPreviewComponent";

export function InstrumentScreen({ route, navigation }) {
  const { instrument } = route.params;

  return (
    <View>
      <LessonPreviewComponent nav={navigation} instrument={instrument} />
    </View>
  );
}

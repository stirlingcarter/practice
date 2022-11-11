import * as React from "react";
import { View } from "react-native";
import { LessonsPreviewComponent } from "../components/LessonsPreviewComponent";

export function InstrumentScreen({ route, navigation }) {
  const { instrumentName } = route.params;

  return (
    <View>
      <LessonsPreviewComponent nav={navigation} instrumentName={instrumentName} />
    </View>
  );
}

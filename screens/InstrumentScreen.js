import * as React from "react";
import { View } from "react-native";
import { BetterLessonPreviewsContainer } from "../components/LessonPreviewComponent";

export function InstrumentScreen({ route, navigation }) {
  const { instrument } = route.params;

  return (
    <View>
      <BetterLessonPreviewsContainer nav={navigation} instrument={instrument} />
    </View>
  );
}

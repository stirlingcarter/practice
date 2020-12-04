import * as React from "react";
import { LessonStatsComponent } from "../components/LessonStatsComponent";

export function LessonStatsScreen({ route, navigation }) {
  const { lesson } = route.params;
  const { instrument } = route.params;

  return <LessonStatsComponent nav={navigation} />;
}

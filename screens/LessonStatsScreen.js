import * as React from "react";
import { LessonStatsComponent } from "../components/LessonStatsComponent";

export function LessonStatsScreen({ route, navigation }) {
  const { lesson } = route.params;
  const { groupName } = route.params;

  return <LessonStatsComponent nav={navigation} lesson={lesson} groupName={groupName} />;
}

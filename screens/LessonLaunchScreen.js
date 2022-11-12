import * as React from "react";
import { LessonLaunchComponent } from "../components/LessonLaunchComponent";

export function LessonLaunchScreen({ route, navigation }) {
  const { lessonName } = route.params;
  const { groupName } = route.params;

  return (
    <LessonLaunchComponent
      groupName={groupName}
      nav={navigation}
      lessonName={lessonName} />
  );
}

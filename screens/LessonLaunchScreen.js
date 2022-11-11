import * as React from "react";
import { WholeAssLessonInfo } from "../components/LessonInfoComponent";

export function LessonLaunchScreen({ route, navigation }) {
  const { lessonName } = route.params;
  const { groupName } = route.params;

  return (
    <WholeAssLessonInfo
      groupName={groupName}
      nav={navigation}
      lessonName={lessonName} />
  );
}

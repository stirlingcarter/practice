import * as React from "react";
import { WholeAssLessonInfo } from "../components/LessonInfoComponent";

export function LessonLaunchScreen({ route, navigation }) {
  const { lessonName } = route.params;
  const { instrumentName } = route.params;

  return (
    <WholeAssLessonInfo
      instrumentName={instrumentName}
      nav={navigation}
      lessonName={lessonName} />
  );
}

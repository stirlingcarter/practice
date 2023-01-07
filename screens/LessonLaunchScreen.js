import * as React from "react";
import { LessonLaunchComponent } from "../components/LessonLaunchComponent";

export function LessonLaunchScreen({ route, navigation }) {
  const { lessonName } = route.params;
  const { path } = route.params;

  return (
    <LessonLaunchComponent
      path={path}
      nav={navigation}
      lessonName={lessonName} />
  );
}

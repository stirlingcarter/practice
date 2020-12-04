import * as React from "react";
import { WholeAssLessonInfo } from "../components/LessonInfoComponent";

export function LessonLaunchScreen({ route, navigation }) {
  const { lesson } = route.params;
  const { instrument } = route.params;

  //HQI.getStatsByInstr(instrument)
  return (
    <WholeAssLessonInfo
      instrument={instrument}
      nav={navigation}
      lesson={lesson} />
  );
}

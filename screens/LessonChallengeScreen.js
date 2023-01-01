import * as React from "react";
import { ChallengeComponent } from "../components/ChallengeComponent";

export function LessonChallengeScreen({ route, navigation }) {
  const { lesson } = route.params;
  const { groupName } = route.params;
  const { type } = route.params;
  const { bpm } = route.params;

  return <ChallengeComponent nav={navigation} lesson={lesson} groupName={groupName} type={type} bpm={bpm} />;
}

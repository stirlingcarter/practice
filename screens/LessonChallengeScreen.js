import * as React from "react";
import { ChallengeComponent } from "../components/ChallengeComponent";

export function LessonChallengeScreen({ route, navigation }) {
  const { lesson } = route.params;
  const { instrument } = route.params;

  return <ChallengeComponent nav={navigation} />;
}

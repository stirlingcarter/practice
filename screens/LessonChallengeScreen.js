import * as React from "react";
import { WholeAssChallenge } from "../components/ChallengeComponent";

export function LessonChallengeScreen({ route, navigation }) {
  const { lesson } = route.params;
  const { instrument } = route.params;

  return <WholeAssChallenge nav={navigation} />;
}

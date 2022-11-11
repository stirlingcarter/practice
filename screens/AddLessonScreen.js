import * as React from "react";

import { AddLessonComponent } from "../components/AddLessonComponent";

export function AddLessonScreen({ route, navigation }) {
  const { instrumentName } = route.params;
  const { cb } = route.params;

  return <AddLessonComponent instrumentName={instrumentName} cb={cb} nav={navigation}/>;
}

import * as React from "react";

import { AddLessonComponent } from "./AddLessonComponent";

export function AddLessonScreen({ route, navigation }) {
  const { instrument } = route.params;
  const { cb } = route.params;

  return <AddLessonComponent instrument={instrument} cb={cb} />;
}

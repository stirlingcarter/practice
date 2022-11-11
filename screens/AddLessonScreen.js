import * as React from "react";

import { AddLessonComponent } from "../components/AddLessonComponent";

export function AddLessonScreen({ route, navigation }) {
  const { groupName } = route.params;
  const { cb } = route.params;

  return <AddLessonComponent groupName={groupName} cb={cb} nav={navigation}/>;
}

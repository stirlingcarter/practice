import * as React from "react";

import { AddCustomLessonComponent } from "../components/AddCustomLessonComponent";

export function AddCustomLessonScreen({ route, navigation }) {
  const { groupName } = route.params;
  const { cb } = route.params;

  return <AddCustomLessonComponent groupName={groupName} cb={cb} nav={navigation}/>;
}

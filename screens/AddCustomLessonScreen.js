import * as React from "react";

import { AddCustomLessonComponent } from "../components/AddCustomLessonComponent";

export function AddCustomLessonScreen({ route, navigation }) {
  const { path } = route.params;
  const { cb } = route.params;
  const {existingLessonNames} = route.params;

  return <AddCustomLessonComponent path={path} cb={cb} nav={navigation} existingLessonNames={existingLessonNames}/>;
}

import * as React from "react";
import { AddLessonFromTemplateComponent } from "../components/AddLessonFromTemplateComponent";

export function AddLessonFromTemplateScreen({ route, navigation }) {
  const { path } = route.params;
  const { cb } = route.params;

  return <AddLessonFromTemplateComponent av={navigation} path={path} cb={cb} />;
}

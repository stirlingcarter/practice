import * as React from "react";
import { AddLessonFromTemplateComponent } from "../components/AddLessonFromTemplateComponent";

export function AddLessonFromTemplateScreen({ route, navigation }) {
  const { groupName } = route.params;

  return <AddLessonFromTemplateComponent nav={navigation} groupName={groupName} />;
}

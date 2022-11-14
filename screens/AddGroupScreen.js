import * as React from "react";

import { AddGroupComponent } from "../components/AddGroupComponent";

export function AddGroupScreen({ route, navigation }) {
  const { groupName } = route.params;
  const { cb } = route.params;

  return <AddGroupComponent nav={navigation} groupName={groupName} cb={cb} />;
}

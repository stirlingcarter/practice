import * as React from "react";

import { AddGroupComponent } from "../components/AddGroupComponent";

export function AddGroupScreen({ route, navigation }) {
  const { path } = route.params;
  const { cb } = route.params;

  return <AddGroupComponent nav={navigation} path={path} cb={cb} />;
}

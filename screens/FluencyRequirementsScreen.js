import * as React from "react";
import { FluencyRequirementsComponent } from "../components/FluencyRequirementsComponent";


export function FluencyRequirementsScreen({ route, navigation }) {
  const { path } = route.params;
  const { cb } = route.params;

  return <FluencyRequirementsComponent path={path} cb={cb} nav={navigation}/>;
}

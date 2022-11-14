import * as React from "react";
import { ScanLeadsheetComponent } from "../components/ScanLeadsheetComponent";

export function ScanLeadsheetScreen({ route, navigation }) {
  const { path } = route.params;
  const { cb } = route.params;


  return <ScanLeadsheetComponent nav={navigation} path={path} cb={cb} />;
}

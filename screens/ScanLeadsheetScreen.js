import * as React from "react";
import { ScanLeadsheetComponent } from "../components/ScanLeadsheetComponent";

export function ScanLeadsheetScreen({ route, navigation }) {
  const { groupName } = route.params;

  return <ScanLeadSheetComponent nav={navigation} groupName={groupName} />;
}

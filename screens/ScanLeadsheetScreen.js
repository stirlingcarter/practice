import * as React from "react";
import { ScanLeadSheetComponent } from "../components/ScanLeadSheetComponent";

export function ScanLeadsheetScreen({ route, navigation }) {
  const { groupName } = route.params;

  return <ScanLeadSheetComponent nav={navigation} groupName={groupName} />;
}

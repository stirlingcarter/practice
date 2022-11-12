import * as React from "react";
import { GroupStatsComponent } from "../components/GroupStatsComponent";

export function GroupStatsScreen({ route, navigation }) {
  const { groupName } = route.params;

  return <GroupStatsComponent nav={navigation} groupName={groupName} />;
}

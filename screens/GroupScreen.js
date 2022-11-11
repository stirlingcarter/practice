import * as React from "react";
import { View } from "react-native";
import { GroupPreviewComponent } from "../components/GroupPreviewComponent";

export function GroupScreen({ route, navigation }) {
  const { groupName } = route.params;

  return (
    <View>
      <GroupPreviewComponent nav={navigation} groupName={groupName} />
    </View>
  );
}

import * as React from "react";
import { View } from "react-native";
import { AddVariantGroupComponent } from "../components/AddVariantGroupComponent";
import { SingleRowVariantChooserSaverComponent } from "../components/SingleRowVariantChooserSaverComponent";

export function SingleRowVariantChooserSaverScreen({ route, navigation }) {
  const { path } = route.params;
  const { category } = route.params;
  const { cb } = route.params;
  const { alreadyChosen } = route.params
  
  return (
    <View>
      <SingleRowVariantChooserSaverComponent nav={navigation} path={path} category={category} cb={cb} alreadyChosen={alreadyChosen}/>
    </View>
  );
}


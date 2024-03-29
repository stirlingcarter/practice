import * as React from "react";
import { View } from "react-native";
import { AddVariantGroupComponent } from "../components/AddVariantGroupComponent";

export function AddVariantGroupScreen({ route, navigation }) {
  const { path } = route.params;
  const { green } = route.params;
  const { cb } = route.params;
  const { alreadyChosen } = route.params
  
  return (
    <View>
      <AddVariantGroupComponent nav={navigation} path={path} green={green} cb={cb} alreadyChosen={alreadyChosen}/>
    </View>
  );
}

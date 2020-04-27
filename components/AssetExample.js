import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

// STYLE IMPORT
import {asset_example_styles} from "../styles/styles.js";

export default function AssetExample() {
  return (
    <View style={asset_example_styles.container}>
      <Text style={asset_example_styles.paragraph}>
        Local filess and assets can be imported by dragging and dropping them into the editor
      </Text>
      <Image style={asset_example_styles.logo} source={require('../assets/snack-icon.png')} />
    </View>
  );
}



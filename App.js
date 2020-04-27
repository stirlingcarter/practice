import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

// STYLE IMPORT
import { app_styles } from "./styles/styles.js";

export default function App() {
  return (
    <View style={app_styles.container}>
      <Text style={app_styles.paragraph}>
        Change code in the editor and watch it changedd on your phone! Save to get a shareable url.
      </Text>
      <Card>
        <AssetExample />
      </Card>
    </View>
  );
}



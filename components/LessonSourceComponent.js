import * as React from "react";
import {
  Text,
  View
} from "react-native";
import { allTheStyles } from "../styles/allTheStyles.js"

export class LessonSourceComponent extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }


  render() {
    return (
      <View
        style={{ width: '100%', height: '100%' }}>
        <Text>{"\n\n\n\n\n\n\n"}</Text>
        <Text
          style={allTheStyles.challengeButton}
          onPress={() => this.props.nav.navigate("AddLessonFromTemplateScreen", {
            groupName: this.props.groupName
          })}
        >
          {"Template"}
        </Text>
        <Text>{"\n\n\n\n\n\n\n"}</Text>
        <Text
          style={allTheStyles.challengeButton}
          onPress={() => this.props.nav.navigate("AddCustomLessonScreen", {
            groupName: this.props.groupName,
          })}
        >
          {"Custom"}
        </Text>
        <Text>{"\n\n\n\n\n\n\n"}</Text>
        <Text
          style={allTheStyles.challengeButton}
          onPress={() => this.props.nav.navigate("ScanLeadsheetScreen", {
            groupName: this.props.groupName
          })}
        >
          {"Scan leadsheet"}
        </Text>
      </View>
    );
  }
}

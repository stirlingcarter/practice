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
          onPress={() => this.props.nav.navigate("AddCustomLessonScreen", {
            path: this.props.path,
            cb: this.props.cb
          })}
        >
          {"Custom"}
        </Text>
        <Text>{"\n\n\n\n\n\n\n"}</Text>

        <Text>{"\n\n\n\n\n\n\n"}</Text>
        <Text
          style={allTheStyles.challengeButton}
          onPress={() => this.props.nav.navigate("AddLessonFromTemplateScreen", {
            path: this.props.path,
            cb: this.props.cb
          })}
        >
          {"Template"}
        </Text>
        <Text>{"\n\n\n\n\n\n\n"}</Text>

        <Text
          style={allTheStyles.challengeButton}
          onPress={() => this.props.nav.navigate("ScanLeadsheetScreen", {
            path: this.props.path,
            cb: this.props.cb
          })}
        >
          {"Scan leadsheet"}
        </Text>
      </View>
    );
  }
}

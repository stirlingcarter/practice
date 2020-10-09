import * as React from "react";
import {
  Keyboard,
  ScrollView,

  TextInput,


  Text,
  View
} from "react-native";
import { HQI } from "../App";
import { allTheStyles } from "../styles/allTheStyles.js"

//COMPONENTS --------------------------------------------------------------------------------------------------------------------------------------------------------
export class AddLessonComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = { name: "", cri: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCriChange = this.handleCriChange.bind(this);
  }

  handleNameChange(name) {
    this.setState({ name });
  }

  handleCriChange(cri) {
    this.setState({ cri });
  }

  handleSubmit() {
    const save = async () => {
      try {
        await HQI.saveNewLesson(
          this.props.instrument,
          this.state.name,
          this.state.cri
        );
        await this.props.cb();
      } catch (error) { }
    };

    save();
  }

  render() {
    return (
      <View style={allTheStyles.saveScreenBackground}>
        <ScrollView>
          <View>
            <TextInput
              style={allTheStyles.saveButton}
              onBlur={Keyboard.dismiss}
              placeholder="Title"
              maxLength={200}
              value={this.state.name}
              onChangeText={this.handleNameChange} />
            <Text style={allTheStyles.saveScreenSpacer}>{"\n"}</Text>
            <TextInput
              style={allTheStyles.saveButton5}
              onBlur={Keyboard.dismiss}
              placeholder="Description"
              numberOfLines={2}
              multiline={true}
              value={this.state.cri}
              onChangeText={this.handleCriChange} />

            <Text
              style={allTheStyles.saveLessonButton}
              onPress={this.handleSubmit}
              onChangeText={this.handleNameChange}
            >
              {"save"}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

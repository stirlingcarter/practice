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
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';



//COMPONENTS --------------------------------------------------------------------------------------------------------------------------------------------------------
export class AddLessonComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = { name: "", cri: "" , type: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCriChange = this.handleCriChange.bind(this);
    this.handleVariantsChange = this.handleVariantsChange.bind(this);
  }

  handleNameChange(name) {
    this.setState({ name });
  }

  handleCriChange(cri) {
    this.setState({ cri });
  }

  handleVariantsChange(variants) {
    this.setState({ variants });
  }

  handleSubmit() {
    const save = async () => {
      
      try {
        await HQI.saveNewLesson(
          this.props.instrument,
          this.state.name,
          this.state.cri,
          this.state.variants
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
            <TextInput
              style={allTheStyles.saveButton5}
              onBlur={Keyboard.dismiss}
              placeholder="Variants (Maj7,m7,7)"
              numberOfLines={2}
              multiline={true}
              value={this.state.variants}
              onChangeText={this.handleVariantsChange} />
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

import * as React from "react";
import {
  Keyboard,
  ScrollView,
  TextInput,
  Text,
  View
} from "react-native";
import lessonRepository from "../App";
import { allTheStyles } from "../styles/allTheStyles.js"
import InputParser from "../services/InputParser.js"
import groupRepository from "../App";

export class AddCustomLessonComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = { name: "", criteria: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCriChange = this.handleCriteriaChange.bind(this);
    this.handleVariantsChange = this.handleVariantsChange.bind(this);
    this.handleVariants2Change = this.handleVariants2Change.bind(this);
    this.handleGoalChange = this.handleGoalChange.bind(this);

  }

  handleNameChange(name) {
    this.setState({ name });
  }

  handleCriteriaChange(criteria) {
    this.setState({ criteria });
  }

  handleVariantsChange(variants) {
    if (variants.replace(/\s/g, '').length) {
      this.setState({ variants });
    }
  }

  handleVariants2Change(variants2) {
    if (variants2.replace(/\s/g, '').length) {
      this.setState({ variants2 });
    }
  }


  handleGoalChange(goal) {
    this.setState({ goal });
  }


  handleSubmit() {
    const save = () => {

      let parentLevel = groupRepository.getGroupByName(this.props.groupName).getLevel()
      lessonRepository.save(
        new Lesson(
          this.state.name,
          this.state.criteria,
          this.props.groupName,
          InputParser.parseGoalFromStringInput(this.state.goal),
          InputParser.parseVariantsFromStringInput(this.state.variants),
          InputParser.parseVariantsFromStringInput(this.state.variants2),
          parentLevel + 1
        ))

      let group = groupRepository.getGroupByName(groupName)
      group.addLessonName(lesson.getName())
      groupRepository.save(group)
    };

    save().then(
      this.props.nav.navigate("GroupScreen", { groupName: this.props.groupName })
    )
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
              value={this.state.criteria}
              onChangeText={this.handleCriteriaChange} />
            <TextInput
              style={allTheStyles.saveButton5}
              onBlur={Keyboard.dismiss}
              placeholder="Variants (Maj7,m7,7)"
              numberOfLines={2}
              multiline={true}
              value={this.state.variants}
              onChangeText={this.handleVariantsChange} />
            <TextInput
              style={allTheStyles.saveButton5}
              onBlur={Keyboard.dismiss}
              placeholder="Any more variants? (0th,1st,2nd,3rd)"
              numberOfLines={2}
              multiline={true}
              value={this.state.variants2}
              onChangeText={this.handleVariants2Change} />
            <TextInput
              style={allTheStyles.saveButton5}
              onBlur={Keyboard.dismiss}
              placeholder="Your goal time for this exercise in seconds"
              numberOfLines={2}
              multiline={true}
              value={this.state.goal}
              onChangeText={this.handleGoalChange} />
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

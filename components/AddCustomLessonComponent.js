import * as React from "react";
import {
  Keyboard,
  ScrollView,
  TextInput,
  Text,
  View
} from "react-native";
import { lessonRepository } from "../App";
import { allTheStyles } from "../styles/allTheStyles.js"
import InputParser from "../services/InputParser.js"
import { groupRepository } from "../App";
import Path from "../services/Path";
import Lesson from "../models/Lesson";
import TreeUtils from "../services/TreeUtils"
import Util from "../services/Util";


export class AddCustomLessonComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePlus = this.handlePlus.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCriteriaChange = this.handleCriteriaChange.bind(this);
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
    this.setState({ variants: variants.replace(/\s/g, '') })
  }

  handleVariants2Change(variants2) {
    this.setState({ variants2: variants2.replace(/\s/g, '') })
  }


  handleGoalChange(goal) {
    this.setState({ goal });
  }


  handleSubmit() {
    if (Util.isEmptyOrWS(this.state.name)) {
      alert("error: Title cannot be empty")
    } else {
      let l = new Lesson(
        this.state.name,
        this.state.criteria,
        InputParser.parseGoalFromStringInput(this.state.goal),
        InputParser.parseVariantsFromStringInput(this.state.variants),
        InputParser.parseVariantsFromStringInput(this.state.variants2),
        {},
        Path.plus(this.props.path, this.state.name))

      TreeUtils.saveLesson(l)


      this.props.cb()
      this.props.nav.navigate("GroupScreen", { path: this.props.path })
    }
  }

  handlePlus(g) {
    alert("yo")
    // this.props.nav.navigate("AddVariantGroupScreen", { path: this.props.path, green: g})
  }

  render() {

    return (
      <View>
        <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>

        <ScrollView style={allTheStyles.addLessonCol}>
          <TextInput
            style={allTheStyles.saveButton}
            onBlur={Keyboard.dismiss}
            placeholder="Title"
            maxLength={200}
            value={this.state.name}
            onChangeText={this.handleNameChange} />
          <TextInput
            style={allTheStyles.saveButton7}
            onBlur={Keyboard.dismiss}
            placeholder="Criteria"
            multiline={true}
            value={this.state.criteria}
            onChangeText={this.handleCriteriaChange} />
          <TextInput
            style={allTheStyles.saveButton7}
            onBlur={Keyboard.dismiss}
            placeholder="Goal time (seconds)"
            multiline={true}
            numberOfLines={2}
            value={this.state.goal}
            onChangeText={this.handleGoalChange} />
          <Text style={allTheStyles.addVariant}>Variations</Text>
          <Text>                            </Text>
          <Text style={allTheStyles.addVariantPlus} onPress={() => {
            this.props.nav.navigate("AddVariantGroupScreen", { path: this.props.path, green: true })
          }}>{"  +"}</Text>
          <Text style={allTheStyles.addVariantPlus2} onPress={() => {
            this.props.nav.navigate("AddVariantGroupScreen", { path: this.props.path, green: false })
          }}>{"  +"}</Text>
          <Text
            style={allTheStyles.saveLessonButton}
            onPress={this.handleSubmit}
            onChangeText={this.handleNameChange}
          >
            {"save"}
          </Text>

          <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>
          <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>



        </ScrollView>
      </View>
    )
  }
}

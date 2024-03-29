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
import Constants from "../constant/Constants";

export class AddCustomLessonComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedNotes: Constants.ALL_NOTES,
      mode: Constants.LESSON_TYPE_TIMED
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCriteriaChange = this.handleCriteriaChange.bind(this);
    this.handleVariantsChange = this.handleVariantsChange.bind(this);
    this.handleVariants2Change = this.handleVariants2Change.bind(this);
    this.handleGoalChange = this.handleGoalChange.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);

  
  }

  handleNameChange(name) {
    this.setState({ name });
  }

  componentDidMount = () => {
    this.interval = setInterval(() => {
      this.setState((state, props) => {
        return {
          examples: [Util.getRandomFromArray(this.selectedNotes),Util.getRandomFromArray(this.state.variants),Util.getRandomFromArray(this.state.variants2)]
        };
      });
    }, 1600);
  };

  handleModeChange() {
    let indexOfCurrentMode = Constants.VALID_CHALLENGE_MODES.indexOf(this.state.mode)
    let indexOfNextMode = (indexOfCurrentMode + 1) % Constants.VALID_CHALLENGE_MODES.length
    let nextMode = Constants.VALID_CHALLENGE_MODES[indexOfNextMode]
    this.setState({ mode: nextMode })
  }

  handleCriteriaChange(criteria) {
    this.setState({ criteria });
  }

  handleVariantsChange(variants) {
    this.setState({ 
      variants: variants })
      }

  handleVariants2Change(variants2) {
    this.setState({ 
      variants2: variants2 })
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
        this.state.selectedNotes,
        this.state.variants,
        this.state.variants2,
        {},
        Path.plus(this.props.path, this.state.name),
        this.state.mode)

      TreeUtils.saveLesson(l)


      this.props.cb()
      this.props.nav.navigate("GroupScreen", { path: this.props.path })
    }
  }


  getListFromVariantList(rawList) {
    let l = this.sanitize(rawList)
    let ans = l == undefined ? "click to add" : l[0]
    let length = l == undefined ? 0 : l.length
    for (let i = 1; i < length; i++) {
      ans = ans + "," + l[i]
    }
    return ans == undefined ? "" : ans.length < 13 ? ans : ans.substring(0,13) + "..."

  }

  getPrefix(variant){
    return variant.indexOf("$") == -1 ? variant : variant.substring(0,variant.indexOf("$"))
  }

  getCategoryExplanation(variant){
    let cat = this.getPostfix(variant).toLowerCase()
    return this.getPrefix(variant) + "(" + cat.substring(1,cat.length-1) + ")"
  }
  getPostfix(variant){
    return variant.indexOf("$") == -1 ? "NO_CAT" : variant.substring(variant.indexOf("$"),variant.length)
  }

  handleNotesChange(note) {

    let current = this.state.selectedNotes;

    let i = current.indexOf(note);
    if (i > -1) { // only splice array when item is found
        current.splice(i, 1); // 2nd parameter means remove one item only
    } else {
        current.push(note)
    }

    this.setState({ selectedNotes: current });
}


  render() {

    let init = allTheStyles.highlighteableOption
    let green = allTheStyles.highlighteableOptionGreen

    return (
      <View>
        <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>

        <ScrollView style={allTheStyles.addLessonCol}>
          <TextInput
            style={allTheStyles.leTitleButton}
            onBlur={Keyboard.dismiss}
            placeholder="Title"
            maxLength={200}
            value={this.state.name}
            onChangeText={this.handleNameChange} />
          <TextInput
            style={allTheStyles.criteriaTextInput}
            onBlur={Keyboard.dismiss}
            placeholder="Criteria"
            multiline={true}
            value={this.state.criteria}
            onChangeText={this.handleCriteriaChange} />
          
        
            <Text onPress={this.handleModeChange} style={allTheStyles.criteriaTextInput}>{"Mode: " + (this.state.mode == Constants.LESSON_TYPE_TIMED ? "times" : "number of tries")}              </Text>
          <TextInput
            style={allTheStyles.goalTime}
            onBlur={Keyboard.dismiss}
            placeholder={this.state.mode == Constants.LESSON_TYPE_TIMED ? "Goal time (seconds)" : "Goal BPM"}
            multiline={true}
            numberOfLines={2}
            value={this.state.goal}
            onChangeText={this.handleGoalChange} />
          <Text>                            </Text>

          <View style={allTheStyles.addLessonOrGroupRow}>
          <Text style={allTheStyles.addVariantPlusLeft} >{(this.state.variants == undefined ? "0 Variations" : this.state.variants.length + " variation" + (this.state.variants.length == 1 ? "" : "s"))}</Text>

          <Text style={allTheStyles.addVariantPlus} onPress={() => {
            this.props.nav.navigate("AddVariantGroupScreen", { path: this.props.path, green: true, cb: this.handleVariantsChange, alreadyChosen: this.state.variants })
          }}>{"      (+)"}</Text></View>
          <View style={allTheStyles.addLessonOrGroupRow}>
          <Text style={allTheStyles.addVariantPlus2}>{(this.state.variants2 == undefined ? "0 Variations" : this.state.variants2.length + " variation" + (this.state.variants2.length == 1 ? "" : "s"))}</Text>

          <Text style={allTheStyles.addVariantPlus2Right} onPress={() => {
            this.props.nav.navigate("AddVariantGroupScreen", { path: this.props.path, green: false, cb: this.handleVariants2Change, alreadyChosen: this.state.variants2})
          }}>{"      (+)"}</Text></View>

          <Text style={allTheStyles.notesHeader}>{"NOTES"}</Text>            
          <View>
          <View style={allTheStyles.examplesRow}>
              <Text onPress={() => this.handleNotesChange("A")} style={this.state.selectedNotes.includes("A") ? green : init}>{"A"}</Text>
              <Text onPress={() => this.handleNotesChange("Bb")} style={this.state.selectedNotes.includes("Bb") ? green : init}>{"Bb"}</Text>
              <Text onPress={() => this.handleNotesChange("B")} style={this.state.selectedNotes.includes("B") ? green : init}>{"B"}</Text>
              <Text onPress={() => this.handleNotesChange("C")} style={this.state.selectedNotes.includes("C") ? green : init}>{"C"}</Text>
              <Text onPress={() => this.handleNotesChange("Db")} style={this.state.selectedNotes.includes("Db") ? green : init}>{"Db"}</Text>
              <Text onPress={() => this.handleNotesChange("D")} style={this.state.selectedNotes.includes("D") ? green : init}>{"D"}</Text>
          </View>
          <View style={allTheStyles.examplesRow}>
              <Text onPress={() => this.handleNotesChange("Eb")} style={this.state.selectedNotes.includes("Eb") ? green : init}>{"Eb"}</Text>
              <Text onPress={() => this.handleNotesChange("E")} style={this.state.selectedNotes.includes("E") ? green : init}>{"E"}</Text>
              <Text onPress={() => this.handleNotesChange("F")} style={this.state.selectedNotes.includes("F") ? green : init}>{"F"}</Text>
              <Text onPress={() => this.handleNotesChange("Gb")} style={this.state.selectedNotes.includes("Gb") ? green : init}>{"Gb"}</Text>
              <Text onPress={() => this.handleNotesChange("G")} style={this.state.selectedNotes.includes("G") ? green : init}>{"G"}</Text>
              <Text onPress={() => this.handleNotesChange("Ab")} style={this.state.selectedNotes.includes("Ab") ? green : init}>{"Ab"}</Text>
          </View>
          </View>
          
          <Text
            style={allTheStyles.saveLessonButton}
            onPress={this.handleSubmit}
            onChangeText={this.handleNameChange}
          >
            {"save"}
          </Text>
          <Text style={allTheStyles.examplesButton}>{"Examples"}</Text>

          <View style={allTheStyles.examplesRow}>
          <Text style={allTheStyles.actualExample}>{this.state.examples == undefined ? "e.g." : this.state.examples[0] + " "}</Text>
          <Text style={allTheStyles.actualExampleG}>{this.state.examples == undefined ? "" : Util.getNoParens(this.state.examples[1]) + " "}</Text>
          <Text style={allTheStyles.actualExampleB}>{this.state.examples == undefined ? "" : Util.getNoParens(this.state.examples[2])}</Text>
          </View>
          <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>
          <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>



        </ScrollView>
      </View>
    )
  }
}

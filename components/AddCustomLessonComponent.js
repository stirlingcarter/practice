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
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCriteriaChange = this.handleCriteriaChange.bind(this);
    this.handleVariantsChange = this.handleVariantsChange.bind(this);
    this.handleVariants2Change = this.handleVariants2Change.bind(this);
    this.handleGoalChange = this.handleGoalChange.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);
    this.state = {
      mode: Constants.LESSON_TYPE_TIMED
    }
  
  }

  handleNameChange(name) {
    this.setState({ name });
  }

  componentDidMount = () => {
    this.interval = setInterval(() => {
      this.setState((state, props) => {
        return {
          examples: [Util.getRandomFromArray(Constants.ALL_NOTES),Util.getRandomFromArray(this.sanitize(this.state.variants)),Util.getRandomFromArray(this.sanitize(this.state.variants2))]
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
    let newVariants = Util.getNoParensForEachInListsIfNoDupe(variants, this.state.variants2)[0]
    let newVariants2 = Util.getNoParensForEachInListsIfNoDupe(variants, this.state.variants2)[1]

    this.setState({ variants: newVariants,
                    variants2: newVariants2 })
    
  }

  handleVariants2Change(variants2) {
    let newVariants = Util.getNoParensForEachInListsIfNoDupe(this.state.variants, variants2)[0]
    let newVariants2 = Util.getNoParensForEachInListsIfNoDupe(this.state.variants, variants2)[1]    
    
    this.setState({ variants: newVariants,
      variants2: newVariants2 })
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
        this.sanitize(this.state.variants),
        this.sanitize(this.state.variants2),
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

  sanitize(v){

    if (v == undefined){
      return []
    }

    let prefixes = Util.copyOf(v).map(variant =>  this.getPrefix(variant))
    let duplicates = []

    let letterToCount = {}
    for (prefix of prefixes){
      if (letterToCount[prefix] == undefined){
        letterToCount[prefix] = 1
      } else {
        duplicates.push(prefix)
      }
    }

    return duplicates == undefined ? prefixes : v.map(variant => duplicates.includes(this.getPrefix(variant)) ? this.getCategoryExplanation(variant) : this.getPrefix(variant))
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
            <Text onPress={this.handleModeChange} style={allTheStyles.saveButton7}>{"Mode: " + (this.state.mode == Constants.LESSON_TYPE_TIMED ? "times" : "number of tries")}              </Text>
          <TextInput
            style={allTheStyles.goalTime}
            onBlur={Keyboard.dismiss}
            placeholder={this.state.mode == Constants.LESSON_TYPE_TIMED ? "Goal time (seconds)" : "Goal number of tries"}
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

          <Text
            style={allTheStyles.saveLessonButton}
            onPress={this.handleSubmit}
            onChangeText={this.handleNameChange}
          >
            {"save"}
          </Text>
          <Text style={allTheStyles.examplesButton}>{"Examples"}</Text>

          <View style={allTheStyles.examplesRow}>
          <Text style={allTheStyles.actualExample}>{this.state.examples == undefined ? "" : this.state.examples[0] + " "}</Text>
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

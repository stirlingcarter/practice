import * as React from "react";
import {
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    FlatList,
    Text,
    View,
    TextInput,
    Keyboard,
    TouchableHighlightBase
} from "react-native";

import { lessonRepository } from "../App";
import { allTheStyles } from "../styles/allTheStyles.js"
import InputParser from "../services/InputParser.js"
import { groupRepository } from "../App";
import Path from "../services/Path";
import Lesson from "../models/Lesson";
import TreeUtils from "../services/TreeUtils"
import Util from "../services/Util";
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { VariantBubbleComponent } from "./VariantBubbleComponent";
import { LinkChoiceComponent } from "./LinkChoiceComponent";
import { BasicListComponent } from "./BasicListComponent";
import BuiltInVariants from "../constant/BuiltInVariants";
import { VariantCategoryComponent } from "./VariantCategoryComponent";

export class AddVariantGroupComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleChosenVariantsChange = this.handleChosenVariantsChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);


  }

  handleChosenVariantsChange(chosenVariant) {

    let newChosenVariants = this.state.chosenVariants
    if (newChosenVariants != undefined && newChosenVariants.includes(chosenVariant)){
        newChosenVariants.splice(newChosenVariants.indexOf(chosenVariant),1)
    }else{
        if (newChosenVariants == undefined){
            newChosenVariants = [chosenVariant]
        }else{
            newChosenVariants.push(chosenVariant)
        }
        
    }
    this.setState({ chosenVariants: newChosenVariants });
  }

  handleFilterChange(filter) {
    this.setState({ filter });
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

  render() {
    let cstyle = allTheStyles.addVariantDone
    if (!this.props.green){
        cstyle = allTheStyles.addVariantDoneBlue
    }
  
    return (
      <View>

        <Text style={cstyle} onPress={this.handlePlus}>{"SAVE"}</Text>
        <TextInput
            style={allTheStyles.filterRow}
            onBlur={Keyboard.dismiss}
            placeholder="Filter"
            placeholderTextColor="#333333"
            multiline={true}
            value={this.state.filter}
            onChangeText={this.handleFilterChange} />
        <ScrollView keyboardShouldPersistTaps={true} style={allTheStyles.addLessonCol}>



        <FlatList
            data={Object.keys(BuiltInVariants.getAllGroups())}
            renderItem={({ item }) => (
                <VariantCategoryComponent categoryName={item} cb={this.handleChosenVariantsChange} green={this.props.green}
                variants={this.state.filter == undefined || this.state.filter.length == 0 ? BuiltInVariants.getAllGroups()[item].map(builtin => builtin.getName()) : BuiltInVariants.getAllGroups()[item].map(builtin => builtin.getName()).filter(variant => variant.toLowerCase().includes(this.state.filter.toLowerCase()))}/>
            )}
            keyExtractor={(item, index) => index.toString()} />


        <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>
        <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>
        <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>
        <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>
        <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>


        </ScrollView>
      </View>
    );
  }
}

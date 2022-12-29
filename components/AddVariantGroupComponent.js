import * as React from "react";
import {
    ScrollView,
    FlatList,
    Text,
    View,
    TextInput,
    Keyboard
} from "react-native";

import { allTheStyles } from "../styles/allTheStyles.js"
import BuiltInVariants from "../constant/BuiltInVariants";
import { VariantCategoryComponent } from "./VariantCategoryComponent";

export class AddVariantGroupComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chosenVariants: this.props.alreadyChosen
        };
        this.handleChosenVariantsChange = this.handleChosenVariantsChange.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);


    }

    handleChosenVariantsChange(chosenVariant) {
        let newChosenVariants = this.state.chosenVariants
        if (newChosenVariants != undefined && newChosenVariants.includes(chosenVariant)) {
            newChosenVariants.splice(newChosenVariants.indexOf(chosenVariant), 1)
        } else {
            if (newChosenVariants == undefined) {
                newChosenVariants = [chosenVariant]
            } else {
                newChosenVariants.push(chosenVariant)
            }

        }
        this.setState({ chosenVariants: newChosenVariants });
    }

    handleFilterChange(filter) {
        this.setState({ filter });
    }

    getPrefix(variant) {
        return variant.indexOf("$") == -1 ? variant : variant.substring(0, variant.indexOf("$"))
    }

    getPostfix(variant) {
        return variant.indexOf("$") == -1 ? "NO_CAT" : variant.substring(variant.indexOf("$"), variant.length)
    }


    hashWithCatName(v) {
        return v + "$" + this.props.categoryName
    }



    render() {
        let cstyle = allTheStyles.addVariantDone
        if (!this.props.green) {
            cstyle = allTheStyles.addVariantDoneBlue
        }

        return (
            <View>
                <Text style={allTheStyles.addVariantDoneUpper} onPress={() => {
                    this.props.cb(this.state.chosenVariants)
                    this.props.nav.goBack()
                }}>{""}</Text>
                <Text style={cstyle} onPress={() => {
                    this.props.cb(this.state.chosenVariants)
                    this.props.nav.goBack()
                }}>{"SAVE"}</Text>
                <TextInput
                    style={allTheStyles.filterRow}
                    onBlur={Keyboard.dismiss}
                    placeholder="Filter"
                    placeholderTextColor="#333333"
                    multiline={true}
                    value={this.state.filter}
                    onChangeText={this.handleFilterChange} />
                <Text onPress={()=>{BuiltInVariants.saveNewCustomVariantByCategoryAndName(BuiltInVariants.CHORDS, this.state.filter)
                this.props.nav.navigate("AddVariantGroupScreen", {cb: this.props.cb, green: this.props.green, alreadyChosen: this.props.alreadyChosen, path: this.props.path})}} style={allTheStyles.filterRowRight}>{this.state.filter != undefined && this.state.filter.length > 0 && !BuiltInVariants.getAllGroups()[item].map(builtin => builtin.getName()).toLowerCase().includes(this.state.filter.toLowerCase()) ? "Create" : ""}</Text>
                <ScrollView keyboardShouldPersistTaps={true} style={allTheStyles.addLessonCol}>
                    <FlatList
                        data={Object.keys(BuiltInVariants.getAllGroups())}
                        renderItem={({ item }) => (
                            <VariantCategoryComponent nav={this.props.nav} categoryName={item} cb={this.handleChosenVariantsChange} green={this.props.green} alreadyChosen={this.props.alreadyChosen}
                                variants={this.state.filter == undefined || this.state.filter.length == 0 ? BuiltInVariants.getAllGroups()[item].map(builtin => builtin.getName()) : BuiltInVariants.getAllGroups()[item].map(builtin => builtin.getName()).filter(variant => variant.toLowerCase().includes(this.state.filter.toLowerCase()))} />
                        )}
                        keyExtractor={(item, index) => index.toString()} />


                    <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>
                    <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>
                    <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>
                    <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>
                    <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>


                </ScrollView>
            </View>
        )
    }
}

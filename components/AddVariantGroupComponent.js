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
import Constants from "../constant/Constants.js";

export class AddVariantGroupComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chosenVariants: this.props.alreadyChosen
        };
        this.handleVariantSelect = this.handleVariantSelect.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);


    }

    handleVariantSelect(variant) {
        let newChosenVariants = this.state.chosenVariants
        newChosenVariants = newChosenVariants == undefined ? [] : newChosenVariants
        if (newChosenVariants.length != 0 && newChosenVariants.includes(variant)) {
            newChosenVariants.splice(newChosenVariants.indexOf(variant), 1)
        } else {
            if (newChosenVariants.length == 0) {
                newChosenVariants = [variant]
            } else {
                newChosenVariants.push(variant)
            }

        }
        this.setState({ chosenVariants: newChosenVariants });
        this.props.cb(newChosenVariants)
    }

    handleFilterChange(filter) {
        this.setState({ filter });
    }

    handleCategoryChange(category) {
        this.setState({ category });
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

        let init = allTheStyles.highlighteableOption
        let green = allTheStyles.highlighteableOptionGreen
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
                <TextInput
                    style={allTheStyles.filterRow}
                    onBlur={Keyboard.dismiss}
                    placeholder="Category"
                    placeholderTextColor="#333333"
                    multiline={true}
                    value={this.state.filter}
                    onChangeText={this.handleCategoryChange} />
                <Text onPress={() => {
                    BuiltInVariants.saveNewCustomVariantByCategoryAndName(BuiltInVariants.CHORDS, this.state.filter)
                    this.props.nav.navigate("AddVariantGroupScreen", { cb: this.props.cb, green: this.props.green, alreadyChosen: this.props.alreadyChosen, path: this.props.path })
                }} style={allTheStyles.filterRowRight}>{"Create"}</Text>
                <ScrollView keyboardShouldPersistTaps={true} style={allTheStyles.addLessonCol}>

                    {/* <FlatList
                        data={Object.keys(BuiltInVariants.getAllGroups())}
                        renderItem={({ item }) => (
                            <VariantCategoryComponent nav={this.props.nav} categoryName={item} cb={this.handleChosenVariantsChange} green={this.props.green} alreadyChosen={this.props.alreadyChosen}
                                variants={this.state.filter == undefined || this.state.filter.length == 0 ? BuiltInVariants.getAllGroups()[item].map(builtin => builtin.getName()) : BuiltInVariants.getAllGroups()[item].filter(variant => variant.getName().toLowerCase().includes(this.state.filter.toLowerCase()) || variant.getCategory().toLowerCase().includes(this.state.filter.toLowerCase()))} />
                        )}
                        keyExtractor={(item, index) => index.toString()} /> */}
                    {Object.keys(BuiltInVariants.getAllGroups()).map(category => (
                        <View>
                            <Text onPress={
                                () => {
                                    BuiltInVariants.getAllGroups()[category].map(biv => biv.getName()).forEach(variant => this.handleVariantSelect(variant))
                                }
                            } style={allTheStyles.filterRow}>{category}</Text>
                            <FlatList
                                data={BuiltInVariants.getAllGroups()[category].map(biv => biv.getName())}
                                renderItem={({ item }) => (
                                    <Text style={this.state.chosenVariants == undefined || this.state.chosenVariants.includes(item) ? green : init} onPress={() => this.handleVariantSelect(item)} key={item}>{item}</Text>

                                )}
                                keyExtractor={(item, index) => index.toString()} />
                        </View>))}




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

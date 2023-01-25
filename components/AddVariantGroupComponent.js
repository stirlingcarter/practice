import * as React from "react";
import {
    ScrollView,
    FlatList,
    Text,
    View,
    TextInput,
    Keyboard
} from "react-native";
import Util from "../services/Util.js";
import { allTheStyles } from "../styles/allTheStyles.js"
import BuiltInVariants from "../constant/BuiltInVariants";
import { VariantCategoryComponent } from "./VariantCategoryComponent";
import Constants from "../constant/Constants.js";
import { customVariantSetRepository } from "../App.js";

export class AddVariantGroupComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chosenVariants: this.props.alreadyChosen == undefined ? [] : this.props.alreadyChosen,
            filter: "",
            categoryFilter: ""
        };
        this.handleVariantSelect = this.handleVariantSelect.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleCategoryFilterChange = this.handleCategoryFilterChange.bind(this);
        this.handleSelectAll = this.handleSelectAll.bind(this);
        this.alreadyExists = this.alreadyExists.bind(this);


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

    handleSelectAll(category) {

        let variants = BuiltInVariants.getAllGroups()[category].map(v => v.getName())
        for (let i = 0; i < variants.length; i++) {
            if (!this.state.chosenVariants.includes(variants[i])) {
                let newVariants = this.state.chosenVariants.concat(variants.filter(v => !this.state.chosenVariants.includes(v)))
                this.setState({ chosenVariants: newVariants });
                this.props.cb(newVariants)
                return
            }

        }

        let newChosen = this.state.chosenVariants;
        variants.forEach(v => {
            const index = newChosen.indexOf(v);
            if (index > -1) {
                newChosen.splice(index, 1);
            }
        })


        this.setState({ chosenVariants: newChosen });
        this.props.cb(newChosen)
    }


    handleFilterChange(filter) {
        this.setState({ filter });
    }

    handleCategoryFilterChange(categoryFilter) {
        this.setState({ categoryFilter });
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

    alreadyExists(variant, category) {
        if (!Constants.VALID_CATEGORIES.includes(category)) {
            return false
        }

        let customCSV = customVariantSetRepository.getCustomVariantSetByCategory(category)
        let customNameSet = customCSV == undefined ? [] : customCSV.getNames()
        let BIVs = BuiltInVariants.getBIV(category)
        let BIVsNameSet = BIVs.map(v => v.getName())
        let withP = Util.toParens(variant.toLowerCase(), category)
        return BIVsNameSet.map(n => n.toLowerCase()).includes(withP) ||  customNameSet.includes(withP) 

    }



    render() {

        let init = allTheStyles.highlighteableOption
        let green = allTheStyles.highlighteableOptionGreen
        let cstyle = allTheStyles.addVariantDone
        if (!this.props.green) {
            cstyle = allTheStyles.addVariantDoneBlue
        }

        let customNamesByCategory = {}
        Constants.VALID_CATEGORIES.forEach(c => {
            customNamesByCategory[c] = customVariantSetRepository.getCustomVariantSetByCategory(c) == undefined ? [] : customVariantSetRepository.getCustomVariantSetByCategory(c).getNames()

        })


        return (
            <View>
                <View style={allTheStyles.variantAddHeading}>
                <Text style={allTheStyles.variantAddSaveHeader} onPress={() => {
                    this.props.cb(this.state.chosenVariants)
                    this.props.nav.goBack()
                }}>{""}</Text>
                <Text style={allTheStyles.variantAddSaveHeader} onPress={() => {
                    this.props.cb(this.state.chosenVariants)
                    this.props.nav.goBack()
                }}>{"SAVE"}</Text>
                <Text style={allTheStyles.filterOrCreate}>{"Filter or create"}</Text>

                
                <TextInput
                    style={allTheStyles.filterRowVA}
                    onBlur={Keyboard.dismiss}
                    placeholder="Name"
                    placeholderTextColor="#333333"
                    multiline={true}
                    value={this.state.filter}
                    onChangeText={this.handleFilterChange} />
                <TextInput
                    style={allTheStyles.filterRowVA}
                    onBlur={Keyboard.dismiss}
                    placeholder="Category"
                    placeholderTextColor="#333333"
                    multiline={true}
                    value={this.state.categoryFilter}
                    onChangeText={this.handleCategoryFilterChange} />

{<Text onPress={() => {
                    if (this.state.filter == "") {
                        alert("Please enter a name")
                        return
                    }
                    let categoryCorrected = Util.toTitleCase(this.state.categoryFilter)
                    if (this.state.categoryFilter == "" || !Constants.VALID_CATEGORIES.includes(categoryCorrected)) {
                        alert("Please enter a valid category")
                        return
                    }
                    customVariantSetRepository.appendVariant(categoryCorrected, this.state.filter)
                    this.props.nav.navigate("AddVariantGroupScreen", { cb: this.props.cb, alreadyChosen: this.state.chosenVariants, path: this.props.path })
                }} style={(this.state.filter != "" && this.state.categoryFilter != "" && !this.alreadyExists(this.state.filter, this.state.categoryFilter)) ? allTheStyles.variantAddCreateButton : allTheStyles.variantAddCreateButtonGrey}>{"Create"}</Text>}
                </View>
                <ScrollView keyboardShouldPersistTaps={true} style={allTheStyles.addLessonCol}>
                {/* TODO why we mapping just the category names here? why not the variants themselves? */}
                    {Object.keys(BuiltInVariants.getAllGroups()).map(category => (
                        (category.toLowerCase().includes(this.state.categoryFilter.toLowerCase()) || this.state.categoryFilter == "") && <View>
                            <Text onPress={
                                () => {
                                    this.handleSelectAll(category)
                                }
                            } style={allTheStyles.snazzyCategorySubHeader}>{category}</Text>
                            <FlatList
                                data={BuiltInVariants.getAllGroups()[category].map(biv => biv.getName()).filter(v => v.toLowerCase().includes(this.state.filter.toLowerCase()) || this.state.filter == "")}
                                renderItem={({ item }) => (
                                    <View style={allTheStyles.examplesRow}>
                                        <Text style={this.state.chosenVariants == undefined || this.state.chosenVariants.includes(item) ? green : init} onPress={() => this.handleVariantSelect(item)} key={item}>{Util.getNoParens(item)}</Text>
                                        {/* {customNamesByCategory[category] == undefined && <Text>{category}</Text>} */}
                                        {customNamesByCategory[category] != undefined && customNamesByCategory[category].includes(item) && <Text style={allTheStyles.trash} onPress={() => {
                                            let newChosen = this.state.chosenVariants
                                            if (newChosen.includes(item)) {
                                                newChosen.splice(newChosen.indexOf(item), 1)
                                                this.setState({ chosenVariants: newChosen });
                                                this.props.cb(newChosen)
                                            }
                                            customVariantSetRepository.removeVariant(category, item)
                                            this.props.nav.navigate("AddVariantGroupScreen", { cb: this.props.cb, alreadyChosen: this.state.chosenVariants, path: this.props.path })
                                        }}>{"🗑️"}</Text>}

                                    </View>
                                )}
                                keyExtractor={(item, index) => index.toString()} />
                        </View>))}


                        <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>
                    <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>
                    <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>
                    <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>
                    <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>

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

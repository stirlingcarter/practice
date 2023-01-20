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
import { customVariantSetRepository } from "../App.js";

export class SingleRowVariantChooserSaverComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chosenVariants: this.props.alreadyChosen,
            filter: ""
        };
        this.handleVariantSelect = this.handleVariantSelect.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    handleVariantSelect(variant) {
        let newChosenVariants = this.state.chosenVariants
        newChosenVariants = newChosenVariants == undefined ? [] : newChosenVariants
        if (newChosenVariants.length != 0 && newChosenVariants.includes(variant)) {
            newChosenVariants.splice(newChosenVariants.indexOf(variant), 1)
        } else if (newChosenVariants.length != 0 && newChosenVariants.includes(Util.getNoParens(variant))) {
            newChosenVariants.splice(newChosenVariants.indexOf(Util.getNoParens(variant)), 1)
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

    alreadyExists(variant, category) {
        if (!BuiltInVariants.VALID_CATEGORIES.includes(category)) {
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

        const { category, cb } = this.props;
        const { chosenVariants } = this.state;

        let customCSV = customVariantSetRepository.getCustomVariantSetByCategory(category)
        let customNameSet = customCSV == undefined ? [] : customCSV.getNames()
        let BIVs = BuiltInVariants.getBIV(category)

        let BIVsNameSet = BIVs.map(v => v.getName())

        

        let cstyle = allTheStyles.addVariantDone

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

{<Text onPress={() => {
                    if (this.state.filter == "") {
                        alert("Please enter a name")
                        return
                    }

                    customVariantSetRepository.appendVariant(this.props.category, this.state.filter)
                    this.props.nav.navigate("SingleRowVariantChooserSaverScreen", { cb: this.props.cb, alreadyChosen: this.state.chosenVariants, path: this.props.path, category: this.props.category })
                }} style={(this.state.filter != "" && !this.alreadyExists(this.state.filter, this.props.category)) ? allTheStyles.variantAddCreateButton : allTheStyles.variantAddCreateButtonGrey}>{"Create"}</Text>}
                </View>





            <View>

<ScrollView>


                {BIVs != undefined && BIVs.map(v => v.getName()).filter(name => this.state.filter == undefined || this.state.filter.length == 0 || name.toLowerCase().includes(this.state.filter.toLowerCase())).map(variant => (
                    <Text style={(this.state.chosenVariants.includes(variant) || this.state.chosenVariants.includes(Util.getNoParens(variant))) ?  green : init} onPress={() => {
                        this.handleVariantSelect(variant)
                        
                    }} key={variant}>{Util.getNoParens(variant)}</Text>
                ))}
                

                {customNameSet.length > 0 && customNameSet.filter(name => this.state.filter == undefined || this.state.filter.length == 0 || name.toLowerCase().includes(this.state.filter.toLowerCase())).map(variant => (
                    <View>
                    <Text style={(this.state.chosenVariants.includes(variant) || this.state.chosenVariants.includes(Util.getNoParens(variant))) ? green : init} onPress={() => this.handleVariantSelect(variant)} key={variant}>{Util.getNoParens(variant)}</Text>
                    <Text style={allTheStyles.trash} onPress={() => {
                        let newChosen = this.state.chosenVariants
                        if (newChosen != undefined && newChosen.includes(variant)) {
                            newChosen.splice(newChosen.indexOf(variant), 1)
                            this.setState({ chosenVariants: newChosen });
                            this.props.cb(this.state.chosenVariants)
                        }
                        customVariantSetRepository.removeVariant(this.props.category, variant)
                        this.props.nav.navigate("SingleRowVariantChooserSaverScreen", {cb: this.props.cb, category: this.props.category, alreadyChosen: this.state.chosenVariants, path: this.props.path})
                        }}>{"🗑️"}</Text>
                        </View>
                ))}
</ScrollView>
            </View>
            </View>
        );
    }
}

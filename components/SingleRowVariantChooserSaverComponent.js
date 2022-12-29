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

export class SingleRowVariantChooserSaverComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chosenVariants: this.props.alreadyChosen
        };
        this.handleVariantSelect = this.handleVariantSelect.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);


    }

    // handleChosenVariantsChange(chosenVariant) {
    //     let newChosenVariants = this.state.chosenVariants
    //     if (newChosenVariants != undefined && newChosenVariants.includes(chosenVariant)) {
    //         newChosenVariants.splice(newChosenVariants.indexOf(chosenVariant), 1)
    //     } else {
    //         if (newChosenVariants == undefined) {
    //             newChosenVariants = [chosenVariant]
    //         } else {
    //             newChosenVariants.push(chosenVariant)
    //         }

    //     }
    //     this.setState({ chosenVariants: newChosenVariants });
    // }

    // getPrefix(variant) {
    //     return variant.indexOf("$") == -1 ? variant : variant.substring(0, variant.indexOf("$"))
    // }

    // getPostfix(variant) {
    //     return variant.indexOf("$") == -1 ? "NO_CAT" : variant.substring(variant.indexOf("$"), variant.length)
    // }

    handleVariantSelect(variant) {
        let newChosenVariants = this.state.chosenVariants
        if (newChosenVariants != undefined && newChosenVariants.includes(variant)) {
            newChosenVariants.splice(newChosenVariants.indexOf(variant), 1)
        } else {
            if (newChosenVariants == undefined) {
                newChosenVariants = [variant]
            } else {
                newChosenVariants.push(variant)
            }

        }
        this.setState({ chosenVariants: newChosenVariants });
    }

    handleFilterChange(filter) {
        this.setState({ filter });
    }

    hashWithCatName(v) {
        return v + "$" + this.props.categoryName
    }

    render() {
        let init = allTheStyles.highlighteableOption
        let green = allTheStyles.highlighteableOptionGreen

        const { category, cb } = this.props;
        const { chosenVariants } = this.state;
        let options = BuiltInVariants.getCustomAndBIVForCategory(category)

        let cstyle = allTheStyles.addVariantDone

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

<Text onPress={()=>{BuiltInVariants.saveNewCustomVariantByCategoryAndName(this.props.category, this.state.filter)
                this.props.nav.navigate("SingleRowVariantChooserSaverScreen", {cb: this.props.cb, alreadyChosen: this.props.alreadyChosen, path: this.props.path, category: this.props.category})}} style={allTheStyles.filterRowRight}>{this.state.filter != undefined && this.state.filter.length > 0 && !options.map(option => option.getName().toLowerCase()).includes(this.state.filter.toLowerCase()) ? "Create" : ""}</Text>

              {options != undefined ? options.map(option => option.getName()).filter(name => this.state.filter == undefined || this.state.filter.length == 0 || name.toLowerCase().includes(this.state.filter.toLowerCase())).map(variant => (
                <Text style={this.state.chosenVariants.includes(variant) ? green : init } onPress={()=>this.handleVariantSelect(variant)} key={variant}>{variant}</Text>
              )) : <Text>{this.props.category}</Text>}

            </View>
          );
    }
}

import * as React from "react";
import {
    Text,
    View,
    FlatList
} from "react-native";
import { allTheStyles } from "../styles/allTheStyles";
import { BasicListComponent } from "./BasicListComponent";
export class VariantCategoryComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            greenVariants: []
          };
        this.handleGreenVariantsChange = this.handleGreenVariantsChange.bind(this);

    }

    componentDidMount() {
        this.setState({

        });
    }

    componentWillUnmount() {

    }

    //entered at mount due to state channge
    componentDidUpdate() {
    }

    handleGreenVariantsChange(v){
        let newGreenVariants = this.state.greenVariants
        if (newGreenVariants.includes(v)){
            newGreenVariants.splice(newGreenVariants.indexOf(v),1)
        }else{
            newGreenVariants.push(v)
        }
        this.setState({greenVariants: newGreenVariants})
    }


    render() {

        let left = []
        let right = []
        for (let i = 0; i < this.props.variants.length; i++){
            if (i < this.props.variants.length/2){
                left.push(this.props.variants[i])
            }else{
                right.push(this.props.variants[i])
            }
        }
        return (<View>
            <Text style={allTheStyles.variantGroupTitle} onPress={() => this.addAllVariants()}>{this.props.categoryName}</Text>

            <View style={allTheStyles.addLessonOrGroupRow}>

            <FlatList
            data={left}
            renderItem={({ item }) => (
                <Text onPress={() => {
                    this.handleGreenVariantsChange(item)
                    this.props.cb(this.hashWithCatName(item))
                }} style={this.state.greenVariants.includes(item) ? (this.props.green ? allTheStyles.basicListItemsGreen : allTheStyles.basicListItemsBlue) : allTheStyles.basicListItems}>{item}</Text>
            )}
            keyExtractor={(item, index) => index.toString()} />

            <Text>{"                "}</Text>


            <FlatList
            data={right}
            renderItem={({ item }) => (
                <Text onPress={() => {
                    this.handleGreenVariantsChange(item)
                    this.props.cb(this.hashWithCatName(item))
                }} style={this.state.greenVariants.includes(item) ? (this.props.green ? allTheStyles.basicListItemsGreen : allTheStyles.basicListItemsBlue) : allTheStyles.basicListItems}>{item}</Text>
                )}
            keyExtractor={(item, index) => index.toString()} />

            </View>
        </View>)
    }

    hashWithCatName(v) {
        return v + "$" + this.props.categoryName
    }

    addAllVariants(){
        for (v of this.props.variants){
            this.handleGreenVariantsChange(v)
            this.props.cb(this.hashWithCatName(v))
        }
    }
}

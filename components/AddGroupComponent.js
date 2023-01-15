import * as React from "react";
import {
    Keyboard,
    ScrollView,
    TextInput,
    Text,
    View
} from "react-native";
import { groupRepository } from "../App";
import { allTheStyles } from "../styles/allTheStyles.js"
import Group from "../models/Group";
import Constants from "../constant/Constants";
import Util from "../services/Util";
import Path from "../services/Path";
import TreeUtils, { HEAD_PATH } from "../services/TreeUtils";

export class AddGroupComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = { name: "", description: "" };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);

    }

    handleNameChange(name) {
        this.setState({ name });
    }

    handleDescriptionChange(description) {
        this.setState({ description });
    }

    handleSubmit() {
        TreeUtils.saveGroup(
            new Group(
                this.state.name,
                this.state.description,
                [],
                [],
                Path.plus(this.props.path, this.state.name)
            ))
        
        this.props.cb()
        if (this.props.path == HEAD_PATH){
            this.props.nav.navigate("HomeScreen")
        } else {
            this.props.nav.navigate("GroupScreen", { path: this.props.path })
        }
        
    }

    render() {

        return (
            <View style={allTheStyles.saveScreenBackground}>


                <View>
                    <View>
                        <TextInput
                            style={allTheStyles.saveButtonNew}
                            onBlur={Keyboard.dismiss}
                            placeholder="name"
                            maxLength={200}
                            value={this.state.name}
                            onChangeText={this.handleNameChange} />
                        <Text style={allTheStyles.saveScreenSpacer}>{"\n"}</Text>

                        {/* <TextInput
                            style={allTheStyles.saveButton}
                            onBlur={Keyboard.dismiss}
                            placeholder="notes"
                            maxLength={200}
                            value={this.state.description}
                            onChangeText={this.handleDescriptionChange} /> */}
                        <Text style={allTheStyles.saveScreenSpacer}>{"\n"}</Text>
                        <Text style={allTheStyles.homeScreenSpacer}>{"\n"}</Text>

                        <Text
                            style={allTheStyles.saveLessonButton}
                            onPress={this.handleSubmit}
                            onChangeText={this.handleNameChange}
                        >
                            {"save"}
                        </Text>

                    </View>
                </View>
            </View>
        );
    }
}

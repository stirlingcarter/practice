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
        let parentGroup = groupRepository.getGroupByName(this.props.groupName)
        groupRepository.save(
            new Group(
                this.state.name,
                this.state.description,
                [],
                [],
                parentGroup.getLevel() + 1
            ))
        parentGroup.addGroupName(this.state.name)
        groupRepository.save(parentGroup)
        

        this.props.cb()
        if (parentGroup.getName() == Constants.HEAD_GROUP_NAME){
            this.props.nav.navigate("HomeScreen")

        }else {
            this.props.nav.navigate("GroupScreen", { groupName: this.props.groupName })
        }
        
    }

    render() {

        return (
            <View style={allTheStyles.saveScreenBackground}>
                <ScrollView>
                    <View>
                        <TextInput
                            style={allTheStyles.saveButton}
                            onBlur={Keyboard.dismiss}
                            placeholder="Group name"
                            maxLength={200}
                            value={this.state.name}
                            onChangeText={this.handleNameChange} />
                        <Text style={allTheStyles.saveScreenSpacer}>{"\n"}</Text>

                        <TextInput
                            style={allTheStyles.saveButton}
                            onBlur={Keyboard.dismiss}
                            placeholder="Group description"
                            maxLength={200}
                            value={this.state.description}
                            onChangeText={this.handleDescriptionChange} />
                        <Text style={allTheStyles.saveScreenSpacer}>{"\n"}</Text>

                        <Text
                            style={allTheStyles.saveLessonButton}
                            onPress={this.handleSubmit}
                            onChangeText={this.handleNameChange}
                        >
                            {"save"}
                        </Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

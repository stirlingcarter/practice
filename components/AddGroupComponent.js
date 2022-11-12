import * as React from "react";
import {
    Keyboard,
    ScrollView,
    TextInput,
    Text,
    View
} from "react-native";
import LessonRepository from "../repositories/LessonRepository";
import { allTheStyles } from "../styles/allTheStyles.js"

const lessonRepository = LessonRepository.getInstance()

export class AddCustomLessonComponent extends React.Component {

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
        const save = () => {
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
        };

        save().then(
            this.props.nav.navigate("GroupScreen", { groupName: this.props.groupName })
        )
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
                            value={this.state.name}
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

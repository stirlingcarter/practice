import * as React from "react";
import {
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
  Text
} from "react-native";
import Swipeable from "react-native-swipeable-row";
import GroupRepository from "../repositories/GroupRepository";
import LessonRepository from "../repositories/LessonRepository";
import { allTheStyles } from "../styles/allTheStyles.js"
import { styles5 } from "../styles/styles5.js"

const groupRepository = GroupRepository.getInstance()
const lessonRepository = LessonRepository.getInstance()

export class GroupPreviewComponent extends React.Component {
  constructor(props) {
    super(props); 

    this.getLessonNames = this.getLessonNames.bind(this);
    this.getGroupNames = this.getGroupNames.bind(this);

    this.state = { lessonNames: [], groupNames: [], currentlyOpenSwipeable: null };
  }

  componentDidMount() {
    this.getLessonNames()
    this.getGroupNames()
  }

  getLessonNames() {
    var names = groupRepository.getGroupByName(this.props.groupName).getLessonNames();
    this.setState({
      lessonNames: names,
    });
  }

  getGroupNames() {
    var names = groupRepository.getGroupByName(this.props.groupName).getGroupNames();
    this.setState({
      groupNames: names,
    });
  }

  render() {
    const itemProps = {
      onOpen: (event, gestureState, swipeable) => {
        if (this.state.currentlyOpenSwipeable &&
          this.state.currentlyOpenSwipeable !== swipeable) {
          this.state.currentlyOpenSwipeable.recenter();
        }

        this.setState({ currentlyOpenSwipeable: swipeable });
      },
      onClose: () => this.setState({ currentlyOpenSwipeable: null }),
    };

    return (
      <>
        <SafeAreaView>
          <ScrollView snapToStart={false} style={allTheStyles.scrollStyle}>

            {/* Group Title */}

            <Text
              onPress={() => this.props.nav.navigate("GroupStatsScreen", {
                groupName: this.props.groupName,
                cb: this.getLessonNames,
              })}
              style={allTheStyles.saveButton3}
            >
              {this.props.groupName}
            </Text>
            <Text
              onPress={() => this.props.nav.navigate("GroupStatsScreen", {
                groupName: this.props.groupName,
                cb: this.getLessonNames,
              })}
              style={allTheStyles.goToStatsButton}// < color
            >
              {"tap here to go to stats for " + this.props.groupName + ".\n"}
            </Text>

            {/* Add lesson */}

            <Text
              onPress={() => this.props.nav.navigate("LessonSourceScreen", {
                groupName: this.props.groupName,
                cb: this.getLessonNames,
              })}
              style={allTheStyles.saveButton3}
            >
              {"Add lesson"}
            </Text>
            <Text
              onPress={() => this.props.nav.navigate("LessonSourceScreen", {
                groupName: this.props.groupName,
                cb: this.getLessonNames,
              })}
              style={allTheStyles.addLessonButton} // < color
            >
            </Text>

            {/* Add group */}

            <Text
              onPress={() => this.props.nav.navigate("AddGroupScreen", {
                groupName: this.props.groupName,
                cb: this.getGroupNames,
              })}
              style={allTheStyles.saveButton3}
            >
              {"Add group"}
            </Text>
            <Text
              onPress={() => this.props.nav.navigate("AddGroupScreen", {
                groupName: this.props.groupName,
                cb: this.getGroupNames,
              })}
              style={allTheStyles.addGroupButton}// < color
            >
            </Text>

            {/* GROUPS */}

            <FlatList
              data={this.state.groupNames}
              renderItem={({ item }) => (
                <Swipeable
                  rightButtons={[
                    <TouchableOpacity
                      onPress={async () => {
                        groupRepository.delete(
                          item,
                          this.props.groupName
                        );
                        this.getGroupNames()
                      }}
                      style={[
                        styles5.rightSwipeItem,
                        { backgroundColor: "red" },
                      ]}
                    >
                      <Text></Text>
                    </TouchableOpacity>,
                  ]}
                  onRightButtonsOpenRelease={itemProps.onOpen}
                  onRightButtonsCloseRelease={itemProps.onClose}
                >
                  <Text
                    onPress={() => this.props.nav.navigate("GroupScreen",
                      { groupName: item })}
                    style={allTheStyles.openGroup}
                  >
                    {item}
                  </Text>
                </Swipeable>
              )}
              keyExtractor={(item, index) => index.toString()} />

            {/* LESSONS */}

            <FlatList
              data={this.state.lessonNames}
              renderItem={({ item }) => (
                <Swipeable
                  rightButtons={[
                    <TouchableOpacity
                      onPress={async () => {
                        await lessonRepository.delete(
                          item,
                          this.props.groupName
                        );
                        this.getLessonNames()
                      }}
                      style={[
                        styles5.rightSwipeItem,
                        { backgroundColor: "red" },
                      ]}
                    >
                      <Text></Text>
                    </TouchableOpacity>,
                  ]}
                  onRightButtonsOpenRelease={itemProps.onOpen}
                  onRightButtonsCloseRelease={itemProps.onClose}
                >
                  <Text
                    onPress={() => this.props.nav.navigate("LessonLaunchScreen", {
                      lessonName: item,
                      groupName: this.props.groupName,
                    })}
                    style={allTheStyles.openLesson}
                  >
                    {item}
                  </Text>
                </Swipeable>
              )}
              keyExtractor={(item, index) => index.toString()} />


            <Text style={allTheStyles.groupScreenSpacer}>{"\n"}</Text>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

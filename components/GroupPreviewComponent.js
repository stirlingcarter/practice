import * as React from "react";
import {
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
  Text,
  View
} from "react-native";
import Swipeable from "react-native-swipeable-row";
import { groupRepository } from "../App";
import { lessonRepository } from "../App";
import { allTheStyles } from "../styles/allTheStyles.js"
import { styles5 } from "../styles/styles5.js"
import Path from "../services/Path";

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
    let group = groupRepository.getGroupByPath(this.props.path)
    var names = group.getLessonNames();
    this.setState({
      lessonNames: names,
    });
  }

  getGroupNames() {
    var names = groupRepository.getGroupByPath(this.props.path).getGroupNames();
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
              style={allTheStyles.groupScreenPathHeader}
            >
              {this.props.path}
            </Text>
            <Text
              style={allTheStyles.groupScreenTitle}
            >
              {Path.currentDir(this.props.path)}
            </Text>
            <Text
              onPress={() => this.props.nav.navigate("GroupStatsScreen", {
                path: this.props.path,
                cb: this.getLessonNames,
              })}
              style={allTheStyles.goToStatsButton}// < color
            >
              {"tap here to go to stats for " + Path.currentDir(this.props.path) + ".\n"}
            </Text>
            <View style={allTheStyles.addLessonOrGroupRow}>
            {/* Add lesson */}

            <Text
              onPress={() => this.props.nav.navigate("LessonSourceScreen", {
                path: this.props.path,
                cb: this.getLessonNames,
              })}
              style={allTheStyles.saveButton3}
            >
              {"Add lesson"}
            </Text>


            {/* Add group */}

            <Text
              onPress={() => this.props.nav.navigate("AddGroupScreen", {
                path: this.props.path,
                cb: this.getGroupNames,
              })}
              style={allTheStyles.saveButton3}
            >
              {"Add group"}
            </Text>

            </View  >

            {/* GROUPS */}

            <FlatList
              data={this.state.groupNames}
              renderItem={({ item }) => (
                <Swipeable
                  rightButtons={[
                    <TouchableOpacity
                      onPress={ () => {
                        groupRepository.deleteByPath(
                          Path.plus(this.props.path, item)
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
                      { path: item })}
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
                      onPress={ () => {
                        lessonRepository.deleteByPath(
                          Path.plus(this.props.path, item)
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
                      path: Path.plus(this.props.path, item),
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

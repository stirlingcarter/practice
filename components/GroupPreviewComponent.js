import * as React from "react";
import {
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
  Text,
  View,
  TouchableHighlightBase
} from "react-native";
import Swipeable from "react-native-swipeable-row";
import { groupRepository } from "../App";
import { lessonRepository } from "../App";
import { allTheStyles } from "../styles/allTheStyles.js"
import { styles5 } from "../styles/styles5.js"
import Path from "../services/Path";
import Constants from "../constant/Constants";
import TreeUtils from "../services/TreeUtils";

export class GroupPreviewComponent extends React.Component {
  constructor(props) {
    super(props);

    this.getLessonNames = this.getLessonNames.bind(this);
    this.getGroupNames = this.getGroupNames.bind(this);
    this.setState({
      groupNames: this.getGroupNames(),
    });
    this.state = { currentlyOpenSwipeable: null };

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
    this.setState({
      groupNames: groupRepository.getGroupByPath(this.props.path).getGroupNames(),
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
            <View style={allTheStyles.addLessonOrGroupRow}>
              <Text
                onPress={() => {

                  let prevPath = Path.up(this.props.path)
                  if (prevPath == Constants.HEAD_GROUP_PATH) {
                    this.props.nav.navigate("HomeScreen")
                  } else {
                    this.setState({
                      groupNames: groupRepository.getGroupNamesByGroupPath(prevPath),
                      lessonNames: groupRepository.getLessonNamesByGroupPath(prevPath)
                    })

                    this.props.nav.navigate("GroupScreen", {
                      path: Path.up(this.props.path)
                    })
                  }

                }
                }
                style={allTheStyles.backButton}>BACK</Text>
              <Text>                 </Text>
              <Text style={allTheStyles.groupScreenPathHeader}>{this.props.path.length < 34 ? this.props.path : "..." + this.props.path.substring(this.props.path.length-34, this.props.path.length)}</Text>
            </View  >
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
                {"ADD LESSON"}
              </Text>


              {/* Add group */}

              <Text
                onPress={() => {
                  this.props.nav.navigate("AddGroupScreen", {
                    path: this.props.path,
                    cb: this.getGroupNames,
                  })
                }}
                style={allTheStyles.saveButton3r}
              >
                {"ADD GROUP"}
              </Text>

            </View  >

            {/* GROUPS */}

            <FlatList
              data={this.state.groupNames}
              renderItem={({ item }) => (
                <Swipeable
                  rightButtons={[
                    <TouchableOpacity
                      onPress={() => {
                        TreeUtils.deleteGroupByPath(
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
                    onPress={() => {
                      let nextPath = Path.plus(this.props.path, item)

                      this.setState({
                        groupNames: groupRepository.getGroupNamesByGroupPath(nextPath),
                        lessonNames: groupRepository.getLessonNamesByGroupPath(nextPath)
                      });
                      this.props.nav.navigate("GroupScreen", {
                        path: Path.plus(this.props.path, item)
                      })
                    }
                    }


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
                      onPress={() => {
                        TreeUtils.deleteLessonByPath(
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

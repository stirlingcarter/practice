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
    this.handlePlus = this.handlePlus.bind(this);

    this.state = { 
        currentlyOpenSwipeable: null,
        groupNames: groupRepository.getGroupByPath(this.props.path).getGroupNames()
   };

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
      plusOpen: false
    });
  }

  getGroupNames() {
    this.setState({
      groupNames: groupRepository.getGroupByPath(this.props.path).getGroupNames(),
    });
  }

  handlePlus() {
    let next = !this.state.plusOpen
    this.setState({
      plusOpen: next
    })
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
        <View>
          <View snapToStart={false} style={allTheStyles.scrollStyle}>

            {/* Group Title */}
            <View style={allTheStyles.addLessonOrGroupRow}>
              {/* <Text
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
                style={allTheStyles.backButton}>BACK</Text> */}


              <Text>                                                           </Text>

              <Text>
              </Text>
            </View  >
            <Text
              style={allTheStyles.groupScreenTitle}
            >
              {Path.currentDir(this.props.path)}
            </Text>
            <Text style={allTheStyles.groupScreenPathHeader}>{this.props.path.length < 34 ? this.props.path : "..." + this.props.path.substring(this.props.path.length - 34, this.props.path.length)}</Text>

            <Text onPress={this.handlePlus}
              style={this.state.plusOpen ? allTheStyles.addStuffButtonRedBig : allTheStyles.addStuffButtonBeeg}
            >
              {this.state.plusOpen ? "-" : "+"}
            </Text>
            {this.state.plusOpen && <View>
              {/* Add lesson */}


              {this.props.path.split('/').length === 2 && //we are at instr level
                <Text
                  onPress={() => this.props.nav.navigate("FluencyRequirementsScreen", {
                    path: this.props.path,
                    cb: this.getGroupNames,
                  })}
                  style={allTheStyles.fluentButton}
                >
                  {"MAKE ME FLUENT"}
                </Text>}
              <Text
                onPress={() => this.props.nav.navigate("AddCustomLessonScreen", {
                  path: this.props.path,
                  cb: this.getLessonNames,
                  existingLessonNames: this.state.lessonNames
                })}
                style={allTheStyles.saveButton3}
              >
                {"ADD DRILL"}
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



            </View>}

            <ScrollView>
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
                            <Text style={allTheStyles.groupScreenSpacer}>{"\n\n\n\n\n\n\n"}</Text>
                            <Text style={allTheStyles.groupScreenSpacer}>{"\n\n\n\n\n\n\n"}</Text>
                            <Text style={allTheStyles.groupScreenSpacer}>{"\n\n\n\n\n\n\n"}</Text>
                            <Text style={allTheStyles.groupScreenSpacer}>{"\n\n\n\n\n\n\n"}</Text>

            </ScrollView>

            <Text style={allTheStyles.groupScreenSpacer}>{"\n"}</Text>
          </View>
        </View>
      </>
    );
  }
}

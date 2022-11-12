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
import { allTheStyles } from "../styles/allTheStyles.js"
import { styles5 } from "../styles/styles5.js"
import Util from "../services/Util"

const groupRepository = GroupRepository.getInstance()

export class HomeScreenComponent extends React.Component {
  constructor(props) {
    super(props); //this.props.num = 1;

    this.getGroupNames = this.getGroupNames.bind(this);

    this.state = { groupNames: [], currentlyOpenSwipeable: null };
  }

  componentDidMount() {
    this.getGroupNames()
  }

  getGroupNames() {
    var names = groupRepository.getGroupByName(Util.HEAD_GROUP_NAME).getGroupNames();
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
            <Text
              onPress={() => this.props.nav.navigate("AddGroupScreen", {
                groupName: Util.HEAD_GROUP_NAME,
                cb: this.getGroupNames,
              })}
              style={allTheStyles.saveButton3}
            >
              {Util.HEAD_GROUP_NAME}
            </Text>
            <Text
              onPress={() => this.props.nav.navigate("AddGroupScreen", {
                groupName: Util.HEAD_GROUP_NAME,
                cb: this.getGroupNames,
              })}
              style={allTheStyles.saveButton4}
            >
              {"tap here to add instruments.\n"}
            </Text>

            {/* INSTRUMENTS (aka any group that level=1) */}

            <FlatList
              data={this.state.groupNames}
              renderItem={({ item }) => (
                <Swipeable
                  rightButtons={[
                    <TouchableOpacity
                      onPress={() => {
                        groupRepository.delete(
                          item,
                          Util.HEAD_GROUP_NAME
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
                    style={allTheStyles.groupOption}
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

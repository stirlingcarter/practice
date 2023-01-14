import * as React from "react";
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  FlatList,
  Text
} from "react-native";
import Swipeable from "react-native-swipeable-row";
import { groupRepository }from "../App";
import { allTheStyles } from "../styles/allTheStyles.js"
import { styles5 } from "../styles/styles5.js"
import Constants from "../constant/Constants"
import Path from "../services/Path";
import TreeUtils, { HEAD_PATH } from "../services/TreeUtils";

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
    this.setState({
      groupNames: groupRepository.getGroupByPath(HEAD_PATH).getGroupNames(),
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
        <View>

          <View snapToStart={false} style={allTheStyles.scrollStyle}>
          <Text
              style={allTheStyles.groupScreenTitle}
            >
              {Path.currentDir(this.props.path)}
            </Text>

            <Text
              onPress={() => this.props.nav.navigate("AddGroupScreen", {
                path: Constants.HEAD_GROUP_PATH,
                cb: this.getGroupNames,
              })}
              style={allTheStyles.addInstrumentButton}
            >
              {"tap here to add instruments.\n"}
            </Text>

            {/* INSTRUMENTS (aka any group that level=1) */}

            <FlatList
            style = {{top: 20}}
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
                    onPress={() => this.props.nav.navigate("GroupScreen",
                      { groupName: item, path: Path.plus(this.props.path, item)})}
                    style={allTheStyles.groupOption}
                  >
                    {item}
                  </Text>
                </Swipeable>
              )}
              keyExtractor={(item, index) => index.toString()} />

            <Text style={allTheStyles.groupScreenSpacer}>{"\n"}</Text>
          </View>
        </View>
      </>
    );
  }
}

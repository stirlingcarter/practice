import * as React from "react";
import {
    View,
  Text
} from "react-native";

import { allTheStyles } from "../styles/allTheStyles";

export class LinkChoiceComponent extends React.Component {

    constructor(props) {
      super(props); 
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
  
  
    render() {
      return(        
        <View style={allTheStyles.addLessonOrGroupRow}>
        {/* Add lesson */}

        <Text
          onPress={() => this.props.nav.navigate(this.props.screen1, {
            path: this.props.path,
            cb: this.getLessonNames,
          })}
          style={allTheStyles.saveButton3}
        >
          {this.props.msg1}
        </Text>


        {/* Add group */}

        <Text
          onPress={() => {
            this.props.nav.navigate(this.props.screen2, {
              path: this.props.path,
              cb: this.getGroupNames,
            })
          }}
          style={allTheStyles.saveButton3r}
        >
          {this.props.msg2}
        </Text>

      </View  >
)
    }
  }
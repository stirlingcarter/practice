import * as React from "react";
import {
  Text,
  View
} from "react-native";
import { ChallengeService } from "../services/ChallengeService"


const DOMAIN = {y:[0,100]}
const LIMIT = 30 * 1000


export class ScanLeadSheetComponent extends React.Component {

  constructor(props) {
    super(props); 
    this.state = {
    };
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
    return (<View><Text>not impled yet hunney</Text></View>)
  }
}

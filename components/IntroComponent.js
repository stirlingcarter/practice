import * as React from "react";
import {
    Text,
    View
} from "react-native";
import { allTheStyles } from "../styles/allTheStyles";
export class IntroComponent extends React.Component {

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
        return (<View><Text style={allTheStyles.enterButton} onPress={() => this.enter()}>Practice</Text>
        <Text onPress={() => this.enter()} style={allTheStyles.enterArrow}>{"→"}</Text></View>)
    }

    enter(){
        this.props.nav.navigate("HomeScreen", {})
    }
}

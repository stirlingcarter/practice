import * as React from "react";
import {
    Text,
    View
} from "react-native";

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
        return (<View><Text onPress={() => this.props.nav.navigate("HomeScreen", {
        })}>Practice</Text></View>)
    }
}

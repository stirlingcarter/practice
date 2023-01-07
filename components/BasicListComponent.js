
import * as React from "react";
import {
    Text,
    View,
    FlatList
} from "react-native";
import { allTheStyles } from "../styles/allTheStyles";
export class BasicListComponent extends React.Component {

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
        return (<FlatList
            data={this.props.data}
            renderItem={({ item }) => (
                <Text style={allTheStyles.basicListItems}>{item}</Text>
            )}
            keyExtractor={(item, index) => index.toString()} />
        )
    }

}

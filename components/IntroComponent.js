import * as React from "react";
import {
    Text,
    View,
    ImageBackground
} from "react-native";
import { allTheStyles } from "../styles/allTheStyles";
export class IntroComponent extends React.Component {

    constructor(props) {
        super(props);
            setTimeout(() => this.enter(), 1000);


    }

    componentDidMount() {
        


    }

    componentWillUnmount() {

    }

    //entered at mount due to state channge
    componentDidUpdate() {
    }


    render() {
        return (<View style={{flex:1}}>
            <ImageBackground onPress={() => this.enter()} resizeMode={'center'} source={require('../assets/Pics/logo.png')} style={allTheStyles.logo} >
            </ImageBackground>
        </View>) 

    }

    enter(){
        this.props.nav.navigate("HomeScreen", {})
    }
}

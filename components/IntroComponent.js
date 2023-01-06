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
            setTimeout(() => this.enter(), 4000);


    }

    componentDidMount() {
        


    }

    componentWillUnmount() {

    }

    //entered at mount due to state channge
    componentDidUpdate() {
    }


    render() {
        return (<View onClick={() => this.enter()}  style={{flex:1}}>
            <ImageBackground resizeMode={'center'} source={require('../assets/Pics/logo3.png')} style={allTheStyles.logo} >
            </ImageBackground>
        </View>) 

    }

    enter(){
        this.props.nav.navigate("HomeScreen", {})
    }
}

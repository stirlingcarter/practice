import * as React from "react";
import {
    Text,
    View,
    ImageBackground,
    Image
} from "react-native";
import { allTheStyles } from "../styles/allTheStyles";

export class IntroComponent extends React.Component {
    LOGO_OPEN_SEC = 2

    WARNING_OPEN_SEC = 5
    constructor(props) {
        super(props);
        setTimeout(() => this.setState({count: this.state.count + 1}), this.LOGO_OPEN_SEC*1000);
        this.enter = this.enter.bind(this);
         this.state = {
            count: 0
         }


    }

    componentDidMount() {
        


    }

    componentWillUnmount() {

    }

    //entered at mount due to state channge
    componentDidUpdate() {
    }


    render() {
        return this.state.count == 0 ? (<View style={{flex:1}}>
            <ImageBackground  resizeMode={'center'} source={require('../assets/Pics/logo9.png')} style={allTheStyles.logo} >
            <Text style={{color: 'white'}} ></Text>
            </ImageBackground>
            <ImageBackground resizeMode={'center'} source={require('../assets/Pics/logo8.png')} style={allTheStyles.logo} >
            </ImageBackground>
            </View>) : 
            (<View >
                <Text style={allTheStyles.warningScreenHeader}>{""}</Text>
                <Text style={allTheStyles.relax}>{
"relax "            }</Text>
            <Text style={allTheStyles.warningScreen1}>{
"\n\nYour agility is equivalent to your ability to play relaxed, and practicing every day with bad form can and will cause injury.\n\n\n\n\n"
            }</Text>
            {/* <Image resizeMode={'stretch'} source={require('../assets/Pics/radialGraphExample.jpg')} style={allTheStyles.radialEx} /> */}

            {/* <Text onPress={this.enter} style={allTheStyles.warningScreen}>{
"The algorithm delivers a pure, physical mastery of the instrument, which can then be applied by an artist to support any choice of form.\n "

            }</Text> */}
<Text style={allTheStyles.warningScreen3}>{
"\n\n\n\n\nCHOPS delivers a pure, physical mastery of the instrument, which can then be applied by an artist to support any choice of form.\n \nCHOPS isn't intended for beginner instrumentalists and doesn't teach musicality, feeling, creativity, etc.\n" + 
"\n\n " 
            }</Text>

<Text onPress={this.enter} style={allTheStyles.warningScreenUnderstand}>{
"OK\n " +
"\n \n " 
            }</Text>
</View>)
    }

    enter(){
        this.props.nav.navigate("HomeScreen", {})
    }
}

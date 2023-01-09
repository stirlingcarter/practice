import React, { Component } from 'react'
import { Text, View, Slider, Button } from 'react-native';
import { Audio } from 'expo-av';
import { allTheStyles } from '../styles/allTheStyles.js'
import { sounds } from "../App.js";

export default class Metronome extends Component {

  constructor(props) {
    super(props);

  

    this.state = {
      currentlyPlaying: -1,
      // sounds: []
    }

    // this.prepareSounds = this.prepareSounds.bind(this);
    this.stopMetronome = this.stopMetronome.bind(this);
    this.getIndexAndMultiplierBasedOnBpm = this.getIndexAndMultiplierBasedOnBpm.bind(this);
    

}

  componentDidMount() {
    // this.prepareSounds()
  }

  componentWillUnmount() {
    if (this.currentlyPlaying != -1){
      // this.stopMetronome(this.state.sounds[this.state.currentlyPlaying])
      return
    }}

  // async prepareSounds() {
  //   const sound0 = new Audio.Sound();
  //   const sound1 = new Audio.Sound();
  //   const sound2 = new Audio.Sound();
  //   const sound3 = new Audio.Sound();
  //   const sound4 = new Audio.Sound();
  //   const sound5 = new Audio.Sound();
  //   const sound6 = new Audio.Sound();
  //   const sound7 = new Audio.Sound();
  //   const sound8 = new Audio.Sound();
  //   const sound9 = new Audio.Sound();

  //   try {
  //       await sound0.loadAsync(require('../assets/sounds/metronome/25bpm10m.mp3'), {shouldPlay: false});
  //       await sound1.loadAsync(require('../assets/sounds/metronome/35bpm10m.mp3'), {shouldPlay: false});
  //       await sound2.loadAsync(require('../assets/sounds/metronome/45bpm10m.mp3'), {shouldPlay: false});
  //       await sound3.loadAsync(require('../assets/sounds/metronome/55bpm10m.mp3'), {shouldPlay: false});
  //       await sound4.loadAsync(require('../assets/sounds/metronome/65bpm10m.mp3'), {shouldPlay: false});
  //       await sound5.loadAsync(require('../assets/sounds/metronome/75bpm10m.mp3'), {shouldPlay: false});
  //       await sound6.loadAsync(require('../assets/sounds/metronome/85bpm10m.mp3'), {shouldPlay: false});
  //       await sound7.loadAsync(require('../assets/sounds/metronome/95bpm10m.mp3'), {shouldPlay: false});
  //       await sound8.loadAsync(require('../assets/sounds/metronome/105bpm10m.mp3'), {shouldPlay: false});
  //       await sound9.loadAsync(require('../assets/sounds/metronome/120bpm10m.mp3'), {shouldPlay: false});

  //       this.setState({
  //           sounds: [
  //               sound0,
  //               sound1,
  //               sound2,
  //               sound3,
  //               sound4,
  //               sound5,
  //               sound6,
  //               sound7,
  //               sound8,
  //               sound9
  //           ]
  //       })
  //   } catch (error) {
  //       alert(error)
  //     }
  // }

  getIndexAndMultiplierBasedOnBpm(bpm) {
    if (bpm <= 30) {
      return [0, bpm/25]
    } else if (bpm <= 40) {
      return [1, bpm/35]
    } else if (bpm <= 50) {
      return [2, bpm/45]
    } else if (bpm <= 60) {
      return [3, bpm/55]
    } else if (bpm <= 70) {
      return [4, bpm/65]
    } else if (bpm <= 80) {
      return [5, bpm/75]
    } else if (bpm <= 90) {
      return [6, bpm/85]
    } else if (bpm <= 100) {
      return [7, bpm/95]
    } else if (bpm <= 110) {
      return [8, bpm/105]
    } else {
      return [9, bpm/120]
    }
  }


  async playSound(sounds) {

    // alert("Playing sound at bpm " + this.props.bpm +
    // " and currentlyPlaying is " + this.state.currentlyPlaying)
    if (this.state.currentlyPlaying != -1){
      await this.stopMetronome(sounds[this.state.currentlyPlaying])
      return
    }

    let indexAndMult = this.getIndexAndMultiplierBasedOnBpm(this.props.bpm)
    let i = indexAndMult[0]
    let mult = indexAndMult[1]
    // alert("Playing sound at index " + i + " and multiplier " + mult)
    let metronome = sounds[i]
        try {
          await metronome.setPositionAsync(0);
          await metronome.setRateAsync(mult, false);
          await metronome.playAsync();
          this.setState({currentlyPlaying: i})
          
        } catch (error) {
          alert(error)
        }
}


    async stopMetronome(metronome) {
      await metronome.stopAsync();
      this.setState({currentlyPlaying: -1})
    }

  render() {

    return (
      <View>
        <Text
        style={this.props.playPauseButtonTextStyle} onPress={() => {
          this.playSound(sounds)
          this.props.onPressCB()
        }}
        >{this.state.currentlyPlaying > -1 ? "◻️" : "▶"}</Text>
      </View>
    )
  }
}
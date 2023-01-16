import React, { Component } from 'react'
import { Text, View, Slider, Button } from 'react-native';
import { Audio } from 'expo-av';
import { allTheStyles } from '../styles/allTheStyles.js'
import { sounds } from "../App.js";

export default class Metronome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentlyPlaying: -1,//else, it will be the index of the sound that is currently playing
    }

    this.stopMetronome = this.stopMetronome.bind(this);
    this.getIndexAndMultiplierBasedOnBpm = this.getIndexAndMultiplierBasedOnBpm.bind(this);
    

}

  componentWillUnmount() {
    if (this.currentlyPlaying != -1){
      this.stopMetronome(sounds[this.state.currentlyPlaying])
      return
    }}

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
          await metronome.setIsLoopingAsync(true);
          await metronome.replayAsync();
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
          if (this.props.onPressCB){
            this.props.onPressCB()
          }
        }}
        >{this.state.currentlyPlaying > -1 ? "◻️" : "▶"}</Text>
      </View>
    )
  }
}
import * as React from "react";
import {
  ScrollView,
  FlatList,
  Text,
  View,
  TextInput,
  Keyboard,
  VariantCategoryComponent
} from "react-native";

import { allTheStyles } from "../styles/allTheStyles.js"
import BuiltInVariants from "../constant/BuiltInVariants";

export class FluencyRequirementsComponent extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        selectedNotes: [],
        selectedIntervals: [],
        selectedScales: [],
        selectedScalePermutations: [],
        selectedChords: '',
        selectedChordInversions: [],
        scalesBpm: 60,
        chordsBpm: 60,
        arpeggiosBpm: 60
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleNotesChange = this.handleNotesChange.bind(this);
      this.handleIntervalsChange = this.handleIntervalsChange.bind(this);
      this.handleScalesBPMChange = this.handleScalesBPMChange.bind(this);
      this.handleChordsBPMChange = this.handleChordsBPMChange.bind(this);
      this.handleArpsBPMChange = this.handleArpsBPMChange.bind(this);
    }
  
    handleSubmit() {
      // Handle form submission
    }
  
    handleNotesChange(note) {
        
      let current = this.state.selectedNotes;

      let i = current.indexOf(note);
      if (i > -1) { // only splice array when item is found
        current.splice(i, 1); // 2nd parameter means remove one item only
      }else{
        current.push(note)
      }

      this.setState({ selectedNotes: current });
    }
  
    handleIntervalsChange(interval) {
        let current = this.state.selectedIntervals;

        let i = current.indexOf(interval);
        if (i > -1) { // only splice array when item is found
          current.splice(i, 1); // 2nd parameter means remove one item only
        }else{
          current.push(interval)
        }
  
        this.setState({ selectedIntervals: current });    }
  
    handleScalesBPMChange(bpm) {
      this.setState({ scalesBpm: bpm });
    }
  
    handleChordsBPMChange(bpm) {
      this.setState({ chordsBpm: bpm });
    }
  
    handleArpsBPMChange(bpm) {
      this.setState({ arpeggiosBpm: bpm });
    }

    
  
    render() {
        let init = allTheStyles.highlighteableOption
        let green = allTheStyles.highlighteableOptionGreen


        return (
            <View>

                <ScrollView keyboardShouldPersistTaps={true} style={allTheStyles.addLessonCol}>
                    <Text style={allTheStyles.fluentHeader}>{"\nIndicate your desired level of fluency"}</Text>

                    <Text style={allTheStyles.fluentRow}>{"NOTES"}</Text>
                    <View style={allTheStyles.examplesRow}>
                    <Text onPress={() => this.handleNotesChange("A")}style={this.state.selectedNotes.includes("A") ? init : green}>{"A"}</Text>
                    <Text onPress={() => this.handleNotesChange("Bb")}style={this.state.selectedNotes.includes("Bb") ? init : green}>{"Bb"}</Text>
                    <Text onPress={() => this.handleNotesChange("B")}style={this.state.selectedNotes.includes("B") ? init : green}>{"B"}</Text>
                    <Text onPress={() => this.handleNotesChange("C")}style={this.state.selectedNotes.includes("C") ? init : green}>{"C"}</Text>
                    <Text onPress={() => this.handleNotesChange("Db")}style={this.state.selectedNotes.includes("Db") ? init : green}>{"Db"}</Text>
                    <Text onPress={() => this.handleNotesChange("D")}style={this.state.selectedNotes.includes("D") ? init : green}>{"D"}</Text>
                    </View>
                    <View style={allTheStyles.examplesRow}>
                    <Text onPress={() => this.handleNotesChange("Eb")}style={this.state.selectedNotes.includes("Eb") ? init : green}>{"Eb"}</Text>
                    <Text onPress={() => this.handleNotesChange("E")}style={this.state.selectedNotes.includes("E") ? init : green}>{"E"}</Text>
                    <Text onPress={() => this.handleNotesChange("F")}style={this.state.selectedNotes.includes("F") ? init : green}>{"F"}</Text>
                    <Text onPress={() => this.handleNotesChange("Gb")}style={this.state.selectedNotes.includes("Gb") ? init : green}>{"Gb"}</Text>
                    <Text onPress={() => this.handleNotesChange("G")}style={this.state.selectedNotes.includes("G") ? init : green}>{"G"}</Text>
                    <Text onPress={() => this.handleNotesChange("Ab")}style={this.state.selectedNotes.includes("Ab") ? init : green}>{"Ab"}</Text>
                    </View>
                    <Text style={allTheStyles.fluentRow}>{"INTERVALS"}</Text>
                    <View style={allTheStyles.examplesRow}>
                    <Text onPress={() => this.handleIntervalsChange("octave")}style={this.state.selectedIntervals.includes("octave") ? init : green}>{"octave"}</Text>
                    <Text onPress={() => this.handleIntervalsChange("2nd")}style={this.state.selectedIntervals.includes("2nd") ? init : green}>{"2nd"}</Text>
                    <Text onPress={() => this.handleIntervalsChange("-2nd")}style={this.state.selectedIntervals.includes("-2nd") ? init : green}>{"-2nd"}</Text>
                    <Text onPress={() => this.handleIntervalsChange("3rd")}style={this.state.selectedIntervals.includes("3rd") ? init : green}>{"3rd"}</Text>
                    <Text onPress={() => this.handleIntervalsChange("-3rd")}style={this.state.selectedIntervals.includes("-3rd") ? init : green}>{"-3rd"}</Text>
                    <Text onPress={() => this.handleIntervalsChange("4th")}style={this.state.selectedIntervals.includes("4th") ? init : green}>{"4th"}</Text>
                    </View>
                    <View style={allTheStyles.examplesRow}>
                    <Text onPress={() => this.handleIntervalsChange("tritone")}style={this.state.selectedIntervals.includes("tritone") ? init : green}>{"tritone"}</Text>
                    <Text onPress={() => this.handleIntervalsChange("5th")}style={this.state.selectedIntervals.includes("5th") ? init : green}>{"5th"}</Text>
                    <Text onPress={() => this.handleIntervalsChange("6th")}style={this.state.selectedIntervals.includes("6th") ? init : green}>{"6th"}</Text>
                    <Text onPress={() => this.handleIntervalsChange("-6th")}style={this.state.selectedIntervals.includes("-6th") ? init : green}>{"-6th"}</Text>
                    <Text onPress={() => this.handleIntervalsChange("7th")}style={this.state.selectedIntervals.includes("7th") ? init : green}>{"7th"}</Text>
                    <Text onPress={() => this.handleIntervalsChange("-7th")}style={this.state.selectedIntervals.includes("-7th") ? init : green}>{"-7th"}</Text>
                    </View>
                    <Text style={allTheStyles.fluentRow}>{"SCALES"}</Text>
                    <View style={allTheStyles.examplesRow}>
                    <Text style={allTheStyles.highlighteableOption}>{"BPM"}</Text>
                    <TextInput onChangeText={this.handleScalesBPMChange} defaultValue={"120"} style={allTheStyles.bpmOption}></TextInput>
                    <Text style={allTheStyles.highlighteableOption}>{"Audition"}</Text>
                    </View>
                    <Text style={allTheStyles.highlighteableOption}>{"Type"}</Text>
                    <Text onPress={() => this.props.nav.navigate("SingleRowVariantChooserSaverScreen", {category: BuiltInVariants.SCALES, cb: this.props.handleScalesChange, alreadyChosen: this.state.selectedScales, path: this.props.path})} style={allTheStyles.highlighteableOption}>{this.state.selectedScales.length > 0 ? this.state.selectedScales.length + " scales chosen" : "tap to choose scales"}</Text>

                    <Text style={allTheStyles.highlighteableOption}>{"Permutations ->"}</Text>

                    <Text style={allTheStyles.fluentRow}>{"CHORDS"}</Text>
                    <View style={allTheStyles.examplesRow}>
                    <Text style={allTheStyles.highlighteableOption}>{"BPM"}</Text>
                    <TextInput onChangeText={this.handleChordsBPMChange} defaultValue={"120"} style={allTheStyles.bpmOption}></TextInput>
                    <Text style={allTheStyles.highlighteableOption}>{"Audition"}</Text>
                    </View>                    
                    <Text style={allTheStyles.highlighteableOption}>{"Qualities"}</Text>
                    <Text style={allTheStyles.highlighteableOption}>{"Inversions"}</Text>
                    <Text style={allTheStyles.fluentRow}>{"ARPS"}</Text>
                    <View style={allTheStyles.examplesRow}>
                    <Text style={allTheStyles.highlighteableOption}>{"BPM"}</Text>
                    <TextInput onChangeText={this.handleArpsBPMChange} defaultValue={"120"} style={allTheStyles.bpmOption}></TextInput>
                    <Text style={allTheStyles.highlighteableOption}>{"Audition"}</Text>
                    </View>

                </ScrollView>
            </View>
        )
                        }
}
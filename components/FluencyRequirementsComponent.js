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
import { Audio } from 'expo-av';
import { allTheStyles } from "../styles/allTheStyles.js"
import TreeUtils from "../services/TreeUtils"
import Constants from "../constant/Constants";
import FluencyGen from "../models/FluencyGen.js";
import FgInput from "../models/FgInput.js";
import Path from "../services/Path.js";

const fileA = require('../assets/sounds/test.wav');

export class FluencyRequirementsComponent extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            selectedNotes: ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"],
            selectedIntervals: ["octave", "2nd", "-2nd", "3rd", "-3rd", "4th", "tritone", "5th", "6th", "-6th", "7th", "-7th"],
            selectedScales: [],
            selectedScalePermutations: [],
            selectedChords: '',
            selectedChordInversions: [],
            scalesBpm: 120,
            chordsBpm: 120,
            arpsBpm: 120
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNotesChange = this.handleNotesChange.bind(this);
        this.handleScalesChange = this.handleScalesChange.bind(this);
        this.handleScalePermutationsChange = this.handleScalePermutationsChange.bind(this);
        this.handleChordsChange = this.handleChordsChange.bind(this);
        this.handleChordInversionsChange = this.handleChordInversionsChange.bind(this);
        this.generate = this.generate.bind(this);

        this.handleIntervalsChange = this.handleIntervalsChange.bind(this);
        this.handleScalesBPMChange = this.handleScalesBPMChange.bind(this);
        this.handleChordsBPMChange = this.handleChordsBPMChange.bind(this);
        this.handleArpsBPMChange = this.handleArpsBPMChange.bind(this);
    }

    handleSubmit() {
        // Handle form submission
    }

    handleScalesChange(scales) {
        this.setState({ selectedScales: scales });
    }

    handleScalePermutationsChange(permutations) {
        this.setState({ selectedScalePermutations: permutations });
        
    }

    handleChordInversionsChange(inversions) {
        this.setState({ selectedChordInversions: inversions });
    }

    handleChordsChange(chords) {
        this.setState({ selectedChords: chords });
    }

    handleNotesChange(note) {

        let current = this.state.selectedNotes;

        let i = current.indexOf(note);
        if (i > -1) { // only splice array when item is found
            current.splice(i, 1); // 2nd parameter means remove one item only
        } else {
            current.push(note)
        }

        this.setState({ selectedNotes: current });
    }

    handleIntervalsChange(interval) {
        let current = this.state.selectedIntervals;

        let i = current.indexOf(interval);
        if (i > -1) { // only splice array when item is found
            current.splice(i, 1); // 2nd parameter means remove one item only
        } else {
            current.push(interval)
        }

        this.setState({ selectedIntervals: current });
    }

    handleScalesBPMChange(bpm) {
        this.setState({ scalesBpm: bpm });
    }

    handleChordsBPMChange(bpm) {
        this.setState({ chordsBpm: bpm });
    }

    handleArpsBPMChange(bpm) {
        this.setState({ arpsBpm: bpm });
    }

    _onPlaybackStatusUpdate = status => {

        if (status.error) {
            console.log(`FATAL PLAYER ERROR: ${status.error}`);
        }

    };

    generate(isChordal) {
        let fgInput = new FgInput(
            this.state.selectedNotes,
            this.state.selectedIntervals,
            this.state.selectedScales,
            this.state.selectedScalePermutations,
            this.state.selectedChords,
            this.state.selectedChordInversions,
            this.state.scalesBpm,
            this.state.chordsBpm,
            this.state.arpsBpm,
            isChordal,
            TreeUtils.getInstrumentFromPath(this.props.path)
        )
        let gen = new FluencyGen(fgInput)
        
        gen.generateGroups()
    }

    async playSound(path) {
        alert("loading")
        try {
            const playbackObject = await Audio.Sound.createAsync(
                require('../assets/sounds/test.wav'),
                { shouldPlay: true }
              );
              
              playbackObject.playAsync();
              

        } catch (error) {
            alert(error);
            // An error occurred!
        }
    }


    render() {
        let init = allTheStyles.highlighteableOption
        let green = allTheStyles.highlighteableOptionGreen
        let isChordal = Constants.CHORDAL_INSTRUMENTS.includes(TreeUtils.getInstrumentFromPath(this.props.path).toLowerCase())

        return (
            <View>

                <ScrollView keyboardShouldPersistTaps={true} style={allTheStyles.addLessonCol}>
                    <Text style={allTheStyles.fluentHeader}>{"\nIndicate your desired level of fluency"}</Text>
                    <Text style={allTheStyles.fluentRow}>{"NOTES"}</Text>
                    <View style={allTheStyles.examplesRow}>
                        <Text onPress={() => this.handleNotesChange("A")} style={this.state.selectedNotes.includes("A") ? green : init}>{"A"}</Text>
                        <Text onPress={() => this.handleNotesChange("Bb")} style={this.state.selectedNotes.includes("Bb") ? green : init}>{"Bb"}</Text>
                        <Text onPress={() => this.handleNotesChange("B")} style={this.state.selectedNotes.includes("B") ? green : init}>{"B"}</Text>
                        <Text onPress={() => this.handleNotesChange("C")} style={this.state.selectedNotes.includes("C") ? green : init}>{"C"}</Text>
                        <Text onPress={() => this.handleNotesChange("Db")} style={this.state.selectedNotes.includes("Db") ? green : init}>{"Db"}</Text>
                        <Text onPress={() => this.handleNotesChange("D")} style={this.state.selectedNotes.includes("D") ? green : init}>{"D"}</Text>
                    </View>
                    <View style={allTheStyles.examplesRow}>
                        <Text onPress={() => this.handleNotesChange("Eb")} style={this.state.selectedNotes.includes("Eb") ? green : init}>{"Eb"}</Text>
                        <Text onPress={() => this.handleNotesChange("E")} style={this.state.selectedNotes.includes("E") ? green : init}>{"E"}</Text>
                        <Text onPress={() => this.handleNotesChange("F")} style={this.state.selectedNotes.includes("F") ? green : init}>{"F"}</Text>
                        <Text onPress={() => this.handleNotesChange("Gb")} style={this.state.selectedNotes.includes("Gb") ? green : init}>{"Gb"}</Text>
                        <Text onPress={() => this.handleNotesChange("G")} style={this.state.selectedNotes.includes("G") ? green : init}>{"G"}</Text>
                        <Text onPress={() => this.handleNotesChange("Ab")} style={this.state.selectedNotes.includes("Ab") ? green : init}>{"Ab"}</Text>
                    </View>

                    <Text style={allTheStyles.fluentRow}>{"INTERVALS"}</Text>
                    <View style={allTheStyles.examplesRow}>
                        <Text onPress={() => this.handleIntervalsChange("octave")} style={this.state.selectedIntervals.includes("octave") ? green : init}>{"octave"}</Text>
                        <Text onPress={() => this.handleIntervalsChange("2nd")} style={this.state.selectedIntervals.includes("2nd") ? green : init}>{"2nd"}</Text>
                        <Text onPress={() => this.handleIntervalsChange("-2nd")} style={this.state.selectedIntervals.includes("-2nd") ? green : init}>{"-2nd"}</Text>
                        <Text onPress={() => this.handleIntervalsChange("3rd")} style={this.state.selectedIntervals.includes("3rd") ? green : init}>{"3rd"}</Text>
                        <Text onPress={() => this.handleIntervalsChange("-3rd")} style={this.state.selectedIntervals.includes("-3rd") ? green : init}>{"-3rd"}</Text>
                        <Text onPress={() => this.handleIntervalsChange("4th")} style={this.state.selectedIntervals.includes("4th") ? green : init}>{"4th"}</Text>
                    </View>
                    <View style={allTheStyles.examplesRow}>
                        <Text onPress={() => this.handleIntervalsChange("tritone")} style={this.state.selectedIntervals.includes("tritone") ? green : init}>{"tritone"}</Text>
                        <Text onPress={() => this.handleIntervalsChange("5th")} style={this.state.selectedIntervals.includes("5th") ? green : init}>{"5th"}</Text>
                        <Text onPress={() => this.handleIntervalsChange("6th")} style={this.state.selectedIntervals.includes("6th") ? green : init}>{"6th"}</Text>
                        <Text onPress={() => this.handleIntervalsChange("-6th")} style={this.state.selectedIntervals.includes("-6th") ? green : init}>{"-6th"}</Text>
                        <Text onPress={() => this.handleIntervalsChange("7th")} style={this.state.selectedIntervals.includes("7th") ? green : init}>{"7th"}</Text>
                        <Text onPress={() => this.handleIntervalsChange("-7th")} style={this.state.selectedIntervals.includes("-7th") ? green : init}>{"-7th"}</Text>
                    </View>
                    <Text style={allTheStyles.fluentRow}>{"SCALES"}</Text>
                    <View style={allTheStyles.examplesRow}>
                        <Text style={allTheStyles.highlighteableOption}>{"BPM (quarter notes)"}</Text>
                        <TextInput onChangeText={this.handleScalesBPMChange} defaultValue={"120"} style={allTheStyles.bpmOption}></TextInput>
                    </View>
                    <Text onPress={() => this.props.nav.navigate("SingleRowVariantChooserSaverScreen", { category: Constants.SCALES, cb: this.handleScalesChange, alreadyChosen: this.state.selectedScales, path: this.props.path })} style={allTheStyles.highlighteableOption}>{this.state.selectedScales.length > 0 ? this.state.selectedScales.length + " scale" + (this.state.selectedScales.length > 1 ? "s" : "") + " chosen" : "tap to choose scales"}</Text>
                    <Text onPress={() => this.props.nav.navigate("SingleRowVariantChooserSaverScreen", { category: Constants.PERMUTATIONS, cb: this.handleScalePermutationsChange, alreadyChosen: this.state.selectedScalePermutations, path: this.props.path })} style={allTheStyles.highlighteableOption}>{this.state.selectedScalePermutations.length > 0 ? this.state.selectedScalePermutations.length + " permutation" + (this.state.selectedScalePermutations.length > 1 ? "s" : "") + " chosen" : "tap to choose permutations"}</Text>
                    {isChordal && <View>
                    <Text style={allTheStyles.fluentRow}>{"CHORDS"}</Text>
                    <View style={allTheStyles.examplesRow}>
                    <Text style={allTheStyles.highlighteableOption}>{"BPM (quarter notes)"}</Text>
                        <TextInput onChangeText={this.handleChordsBPMChange} defaultValue={"120"} style={allTheStyles.bpmOption}></TextInput>
                    </View>
                    <Text onPress={() => this.props.nav.navigate("SingleRowVariantChooserSaverScreen", { category: Constants.CHORDS, cb: this.handleChordsChange, alreadyChosen: this.state.selectedChords, path: this.props.path })} style={allTheStyles.highlighteableOption}>{this.state.selectedChords.length > 0 ? this.state.selectedChords.length + " chord" + (this.state.selectedChords.length > 1 ? "s" : "") + " chosen" : "tap to choose chords"}</Text>
                    <Text onPress={() => this.props.nav.navigate("SingleRowVariantChooserSaverScreen", { category: Constants.INVERSIONS, cb: this.handleChordInversionsChange, alreadyChosen: this.state.selectedChordInversions, path: this.props.path })} style={allTheStyles.highlighteableOption}>{this.state.selectedChordInversions.length > 0 ? this.state.selectedChordInversions.length + " inversion" + (this.state.selectedChordInversions.length > 1 ? "s" : "") + " chosen" : "tap to choose inversions"}</Text>
                    </View>}
                    <Text style={allTheStyles.fluentRow}>{"ARPS"}</Text>
                    <View style={allTheStyles.examplesRow}>
                    <Text style={allTheStyles.highlighteableOption}>{"BPM (quarter notes)"}</Text>
                        <TextInput onChangeText={this.handleArpsBPMChange} defaultValue={"120"} style={allTheStyles.bpmOption}></TextInput>
                        {/* <Text onPress={() => this.playSound('./assets/sounds/test.wav')} style={allTheStyles.highlighteableOption}>{"Audition"}</Text> */}
                    </View>
                    {!isChordal && <Text onPress={() => this.props.nav.navigate("SingleRowVariantChooserSaverScreen", { category: Constants.CHORDS, cb: this.handleChordsChange, alreadyChosen: this.state.selectedChords, path: this.props.path })} style={allTheStyles.highlighteableOption}>{this.state.selectedChords.length > 0 ? this.state.selectedChords.length + " arp" + (this.state.selectedChords.length > 1 ? "s" : "") + " chosen" : "tap to choose arpeggios"}</Text>}

                    <Text style={allTheStyles.addVariantDone} onPress={() => {
                        if (this.state.selectedScales.length != 0 && this.state.selectedScalePermutations.length == 0) {
                            alert("You must choose at least one scale permutation")
                        }else{
                            if (this.state.selectedChords.length == 0){
                                alert("No chords chosen, no arp or chord exercises will be generated")
                            }
                            this.generate(isChordal)
                            this.props.cb()
                            this.props.nav.navigate("GroupScreen", { path: Path.plus("Instruments",TreeUtils.getInstrumentFromPath(this.props.path))})
                        }
                    }}>{"GEN"}</Text>

                </ScrollView>
            </View>
        )
    }
}
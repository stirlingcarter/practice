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
import Metronome from "./Metronome.js";

export class FluencyRequirementsComponent extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            selectedNotes: Constants.ALL_NOTES,
            selectedIntervals: ["octave", "2nd", "-2nd", "3rd", "-3rd", "4th", "tritone", "5th", "6th", "-6th", "7th", "-7th"],
            selectedScales: [],
            selectedScalePermutations: [],
            selectedChords: '',
            selectedChordInversions: [],
            scalesBpm: "120",
            chordsBpm: "120",
            arpsBpm: "120",
            notesOpen : false,
            intervalsOpen : false,
            scalesOpen : false,
            chordsOpen : false,
            arpsOpen : false,
            metronome: new Audio.Sound(),
            metronomeIsPlaying: false,
            fineTuneIsOpen: false,
            currentlySelectedPreset: undefined
        };
        this.handleNotesChange = this.handleNotesChange.bind(this);
        this.handleScalesChange = this.handleScalesChange.bind(this);
        this.handleScalePermutationsChange = this.handleScalePermutationsChange.bind(this);
        this.handleChordsChange = this.handleChordsChange.bind(this);
        this.handleChordInversionsChange = this.handleChordInversionsChange.bind(this);
        this.generate = this.generate.bind(this);
        this.handleFineTuneOpen = this.handleFineTuneOpen.bind(this);
        this.handlePresetChoose = this.handlePresetChoose.bind(this);

        this.handleNotesOpen = this.handleNotesOpen.bind(this);
        this.handleIntervalsOpen = this.handleIntervalsOpen.bind(this);
        this.handleScalesOpen = this.handleScalesOpen.bind(this);
        this.handleChordsOpen = this.handleChordsOpen.bind(this);
        this.handleArpsOpen = this.handleArpsOpen.bind(this);
        
        this.handleIntervalsChange = this.handleIntervalsChange.bind(this);
        this.handleScalesBpmChange = this.handleScalesBpmChange.bind(this);
        this.handleChordsBpmChange = this.handleChordsBpmChange.bind(this);
        this.handleArpsBpmChange = this.handleArpsBpmChange.bind(this);
    }

    handleScalesChange(scales) {
        this.setState({ selectedScales: scales });
    }

    handleFineTuneOpen() {
        this.setState({ fineTuneIsOpen: !this.state.fineTuneIsOpen });
    }

    handleScalePermutationsChange(permutations) {
        this.setState({ selectedScalePermutations: permutations });
        
    }

    handleChordInversionsChange() {
        this.setState({ selectedChordInversions: !this.state.selectedChordInversions });
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

    handleNotesOpen() {
        this.setState({ notesOpen: !this.state.notesOpen });
    }

    handleIntervalsOpen() {
        this.setState({ intervalsOpen: !this.state.intervalsOpen });
    }

    handleScalesOpen() {
        this.setState({ scalesOpen: !this.state.scalesOpen });
    }

    handleChordsOpen() {
        this.setState({ chordsOpen: !this.state.chordsOpen });
    }

    handleArpsOpen() {
        this.setState({ arpsOpen: !this.state.arpsOpen });
    }


    handleScalesBpmChange(bpm) {
        this.setState({ scalesBpm: bpm });
    }

    handleChordsBpmChange(bpm) {
        this.setState({ chordsBpm: bpm });
    }

    handleArpsBpmChange(bpm) {
        this.setState({ arpsBpm: bpm });
    }

    _onPlaybackStatusUpdate = status => {

        if (status.error) {
            console.log(`FATAL PLAYER ERROR: ${status.error}`);
        }

    };

    handlePresetChoose(preset) {
        if (preset === "LO") {
            this.setState({
                selectedScales: Constants.PRESET_FOUNDATIONS.selectedScales, 
                selectedScalePermutations: Constants.PRESET_FOUNDATIONS.selectedScalePermutations,
                selectedChords: Constants.PRESET_FOUNDATIONS.selectedChords,
                selectedChordInversions: Constants.PRESET_FOUNDATIONS.selectedChordInversions,
                scalesBpm: Constants.PRESET_FOUNDATIONS.scalesBpm,
                chordsBpm: Constants.PRESET_FOUNDATIONS.chordsBpm,
                arpsBpm: Constants.PRESET_FOUNDATIONS.arpsBpm,
                currentlySelectedPreset: "LO"
            })
        } else if (preset === "MID") {
            this.setState({
                selectedScales: Constants.PRESET_FAMILIARITY.selectedScales,
                selectedScalePermutations: Constants.PRESET_FAMILIARITY.selectedScalePermutations,
                selectedChords: Constants.PRESET_FAMILIARITY.selectedChords,
                selectedChordInversions: Constants.PRESET_FAMILIARITY.selectedChordInversions,
                scalesBpm: Constants.PRESET_FAMILIARITY.scalesBpm,
                chordsBpm: Constants.PRESET_FAMILIARITY.chordsBpm,
                arpsBpm: Constants.PRESET_FAMILIARITY.arpsBpm,
                currentlySelectedPreset: "MID"
            })
        } else if (preset === "PRO") {
            this.setState({
                selectedScales: Constants.PRESET_NUANCE.selectedScales,
                selectedScalePermutations: Constants.PRESET_NUANCE.selectedScalePermutations,
                selectedChords: Constants.PRESET_NUANCE.selectedChords,
                selectedChordInversions: Constants.PRESET_NUANCE.selectedChordInversions,
                scalesBpm: Constants.PRESET_NUANCE.scalesBpm,
                chordsBpm: Constants.PRESET_NUANCE.chordsBpm,
                arpsBpm: Constants.PRESET_NUANCE.arpsBpm,
                currentlySelectedPreset: "PRO"
            })
        }
    }


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

    render() {
        let init = allTheStyles.highlighteableOption
        let green = allTheStyles.highlighteableOptionGreen
        let isChordal = Constants.CHORDAL_INSTRUMENTS.includes(TreeUtils.getInstrumentFromPath(this.props.path).toLowerCase())

        return (
            <View>

                <ScrollView keyboardShouldPersistTaps={true} style={allTheStyles.addLessonCol}>
                    <Text style={allTheStyles.fluentHeader}>{"\nIndicate your desired level of fluency"}</Text>

                    <View style={allTheStyles.examplesRow}>
                    <Text onPress={()=>{this.handlePresetChoose("LO")}} style={this.state.currentlySelectedPreset == "LO" ? allTheStyles.presetPickerP : allTheStyles.presetPicker}>{"LO"}</Text>
                    <Text onPress={()=>{this.handlePresetChoose("MID")}} style={this.state.currentlySelectedPreset == "MID" ? allTheStyles.presetPickerP : allTheStyles.presetPicker}>{"MID"}</Text>
                    <Text onPress={()=>{this.handlePresetChoose("PRO")}} style={this.state.currentlySelectedPreset == "PRO" ? allTheStyles.presetPickerP : allTheStyles.presetPicker}>{"PRO"}</Text>
                    </View>
                    <View style={allTheStyles.examplesRow}>
                    <Text onPress={this.handleFineTuneOpen} style={allTheStyles.fineTunePresser}>{this.state.fineTuneIsOpen ? "🤙" : "✍️ fine tune"}</Text>
                    </View>








{this.state.fineTuneIsOpen && <View>


                    <View style={allTheStyles.examplesRow}>
                    <Text style={allTheStyles.fluentRow}>{"NOTES"}</Text><Text onPress={this.handleNotesOpen} style={this.state.notesOpen ? allTheStyles.smallerAddStuffButtonRed : allTheStyles.smallerAddStuffButton}>{this.state.notesOpen ? "-" : "+"}</Text><Text style={allTheStyles.smallerAddStuffButton}>{"        "}</Text>
                    </View>

                    {this.state.notesOpen && <View>
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
                    </View>}


                    <View style={allTheStyles.examplesRow}>
                    <Text style={allTheStyles.fluentRow}>{"INTERVALS"}</Text><Text onPress={this.handleIntervalsOpen} style={this.state.intervalsOpen ? allTheStyles.smallerAddStuffButtonRed : allTheStyles.smallerAddStuffButton}>{this.state.intervalsOpen ? "-" : "+"}</Text><Text style={allTheStyles.smallerAddStuffButton}>{"        "}</Text>
                    </View>

                    {this.state.intervalsOpen && <View>
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
                    </View>}


                    <View style={allTheStyles.examplesRow}>
                    <Text style={allTheStyles.fluentRow}>{"SCALES"}</Text><Text onPress={this.handleScalesOpen} style={this.state.scalesOpen ? allTheStyles.smallerAddStuffButtonRed : allTheStyles.smallerAddStuffButton}>{this.state.scalesOpen ? "-" : "+"}</Text><Text style={allTheStyles.smallerAddStuffButton}>{"        "}</Text>
                    </View>

                    {this.state.scalesOpen && <View>
                    <View style={allTheStyles.examplesRow}>
                    <Text style={allTheStyles.bpmHeading}>{"BPM"}</Text>
                    <TextInput onChangeText={this.handleScalesBpmChange} defaultValue={this.state.scalesBpm} style={allTheStyles.bpmOption}></TextInput>

                    <Metronome playPauseButtonTextStyle={allTheStyles.metronomePlayPauseButton} bpm={this.state.scalesBpm} />
                    </View>
                    <Text onPress={() => this.props.nav.navigate("SingleRowVariantChooserSaverScreen", { category: Constants.SCALES, cb: this.handleScalesChange, alreadyChosen: this.state.selectedScales, path: this.props.path })} style={allTheStyles.highlighteableOption}>{this.state.selectedScales.length > 0 ? this.state.selectedScales.length + " scale" + (this.state.selectedScales.length > 1 ? "s" : "") + " chosen" : "tap to choose scales"}</Text>
                    <Text onPress={() => this.props.nav.navigate("SingleRowVariantChooserSaverScreen", { category: Constants.PERMUTATIONS, cb: this.handleScalePermutationsChange, alreadyChosen: this.state.selectedScalePermutations, path: this.props.path })} style={allTheStyles.highlighteableOption}>{this.state.selectedScalePermutations.length > 0 ? this.state.selectedScalePermutations.length + " permutation" + (this.state.selectedScalePermutations.length > 1 ? "s" : "") + " chosen" : "tap to choose permutations"}</Text>
                    </View>}

                    {isChordal && <View>
                    {<View style={allTheStyles.examplesRow}><Text style={allTheStyles.fluentRow}>{"CHORDS"}</Text><Text onPress={this.handleChordsOpen} style={this.state.chordsOpen ? allTheStyles.smallerAddStuffButtonRed : allTheStyles.smallerAddStuffButton}>{this.state.chordsOpen ? "-" : "+"}</Text><Text style={allTheStyles.smallerAddStuffButton}>{"        "}</Text></View>}
                    {this.state.chordsOpen && <View>
                    <View style={allTheStyles.examplesRow}>
                    <Text style={allTheStyles.bpmHeading}>{"BPM"}</Text>
                    
                        <TextInput onChangeText={this.handleChordsBpmChange} defaultValue={this.state.chordsBpm} style={allTheStyles.bpmOption}></TextInput>
                        <Metronome playPauseButtonTextStyle={allTheStyles.metronomePlayPauseButton} bpm={this.state.chordsBpm} />
                    </View>
                    <Text onPress={() => this.props.nav.navigate("SingleRowVariantChooserSaverScreen", { category: Constants.CHORDS, cb: this.handleChordsChange, alreadyChosen: this.state.selectedChords, path: this.props.path })} style={allTheStyles.highlighteableOption}>{this.state.selectedChords.length > 0 ? this.state.selectedChords.length + " chord" + (this.state.selectedChords.length > 1 ? "s" : "") + " chosen" : "tap to choose chords"}</Text>
                    <View style={allTheStyles.examplesRow}>
                    <Text style={allTheStyles.highlighteableOption}>{"Inversions?"}</Text>
                    <Text onPress={()=>{this.handleChordInversionsChange()}} style={allTheStyles.thumbo}>{this.state.selectedChordInversions ? "👍" : "👎"}</Text>
                    </View>
                    </View>}
                    </View>}


                    {<View>
                        {<View style={allTheStyles.examplesRow}>
                            <Text style={allTheStyles.fluentRow}>{"ARPS"}</Text>
                            <Text onPress={this.handleArpsOpen} style={this.state.arpsOpen ? allTheStyles.smallerAddStuffButtonRed : allTheStyles.smallerAddStuffButton}>{this.state.arpsOpen ? "-" : "+"}</Text>
                            <Text style={allTheStyles.smallerAddStuffButton}>{"        "}</Text>
                        </View>}
                        {this.state.arpsOpen && 
                        <View> 
                            <View style={allTheStyles.examplesRow}>
                                <Text style={allTheStyles.bpmHeading}>{"BPM"}</Text>
                                <TextInput onChangeText={this.handleArpsBpmChange } defaultValue={this.state.arpsBpm} style={allTheStyles.bpmOption}></TextInput>
                                <Metronome playPauseButtonTextStyle={allTheStyles.metronomePlayPauseButton} bpm={this.state.arpsBpm} />
                            </View>
                            <View>
                        {!isChordal && <Text onPress={() => this.props.nav.navigate("SingleRowVariantChooserSaverScreen", { category: Constants.CHORDS, cb: this.handleChordsChange, alreadyChosen: this.state.selectedChords, path: this.props.path })} style={allTheStyles.highlighteableOption}>{this.state.selectedChords.length > 0 ? this.state.selectedChords.length + " arp" + (this.state.selectedChords.length > 1 ? "s" : "") + " chosen" : "tap to choose arpeggios"}</Text>}
</View>
                        </View>
                        
                        
                        }
                    </View>}
                        {/* <Text style={allTheStyles.highlighteableOption}>{"Audition"}</Text> */}
                    


</View>}






                    <Text style={allTheStyles.generateButton} onPress={() => {
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
                    }}>{"GENERATE"}</Text>


                </ScrollView>
            </View>
        )
    }
}
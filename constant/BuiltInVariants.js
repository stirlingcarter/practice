import BuiltInVariant from "../models/BuiltInVariant";
import { MMKV } from "react-native-mmkv";
import { elementsThatOverlapOffsets } from "react-native/Libraries/Lists/VirtualizeUtils";
import { customVariantSetRepository } from "../App";
import Constants from "./Constants";


export default class BuiltInVariants {

    static CHORD_VARIANTS = [
        new BuiltInVariant("min triad(" + Constants.CHORDS + ")", Constants.CHORDS),
        new BuiltInVariant("maj triad(" + Constants.CHORDS + ")", Constants.CHORDS),
        new BuiltInVariant("dom triad(" + Constants.CHORDS + ")", Constants.CHORDS),
        new BuiltInVariant("min6(" + Constants.CHORDS + ")", Constants.CHORDS),
        new BuiltInVariant("maj6(" + Constants.CHORDS + ")", Constants.CHORDS),
        new BuiltInVariant("min7(" + Constants.CHORDS + ")", Constants.CHORDS),
        new BuiltInVariant("maj7(" + Constants.CHORDS + ")", Constants.CHORDS), 
        new BuiltInVariant("7(" + Constants.CHORDS + ")", Constants.CHORDS),
        new BuiltInVariant("dim(" + Constants.CHORDS + ")", Constants.CHORDS),
        new BuiltInVariant("half dim(" + Constants.CHORDS + ")", Constants.CHORDS),
        new BuiltInVariant("7#5#9(" + Constants.CHORDS + ")", Constants.CHORDS),
        new BuiltInVariant("7#9(" + Constants.CHORDS + ")", Constants.CHORDS),
        new BuiltInVariant("7#5(" + Constants.CHORDS + ")", Constants.CHORDS),//thelonious chord lol
        new BuiltInVariant("7#11(" + Constants.CHORDS + ")", Constants.CHORDS)

    ]

    static PERMUTATION_VARIANTS = [
        new BuiltInVariant("1234567/normal/ionian(" + Constants.PERMUTATIONS + ")", Constants.PERMUTATIONS),
        new BuiltInVariant("2345671/dorian(" + Constants.PERMUTATIONS + ")", Constants.PERMUTATIONS),
        new BuiltInVariant("3456712/phrygian(" + Constants.PERMUTATIONS + ")", Constants.PERMUTATIONS),
        new BuiltInVariant("4567123/lydian(" + Constants.PERMUTATIONS + ")", Constants.PERMUTATIONS),
        new BuiltInVariant("5671234/mixolydian(" + Constants.PERMUTATIONS + ")", Constants.PERMUTATIONS),
        new BuiltInVariant("6712345/aeolian(" + Constants.PERMUTATIONS + ")", Constants.PERMUTATIONS),
        new BuiltInVariant("7123456/locrian(" + Constants.PERMUTATIONS + ")", Constants.PERMUTATIONS),
        new BuiltInVariant("13243546576....(" + Constants.PERMUTATIONS + ")", Constants.PERMUTATIONS)
    ]

    static INTERVAL_VARIANTS = [
        new BuiltInVariant("2nd(" + Constants.INTERVALS + ")", Constants.INTERVALS),
        new BuiltInVariant("minor 3rd(" + Constants.INTERVALS + ")", Constants.INTERVALS),
        new BuiltInVariant("major 3rd(" + Constants.INTERVALS + ")", Constants.INTERVALS),
        new BuiltInVariant("4th(" + Constants.INTERVALS + ")", Constants.INTERVALS),
        new BuiltInVariant("5th(" + Constants.INTERVALS + ")", Constants.INTERVALS),
        new BuiltInVariant("minor 6th(" + Constants.INTERVALS + ")", Constants.INTERVALS),
        new BuiltInVariant("major 6th(" + Constants.INTERVALS + ")", Constants.INTERVALS),
        new BuiltInVariant("minor 7th(" + Constants.INTERVALS + ")", Constants.INTERVALS),
        new BuiltInVariant("major 7th(" + Constants.INTERVALS + ")", Constants.INTERVALS),
        new BuiltInVariant("9th(" + Constants.INTERVALS + ")", Constants.INTERVALS),
        new BuiltInVariant("minor 10th(" + Constants.INTERVALS + ")", Constants.INTERVALS),
        new BuiltInVariant("major 10th(" + Constants.INTERVALS + ")", Constants.INTERVALS),
        new BuiltInVariant("11th(" + Constants.INTERVALS + ")", Constants.INTERVALS),
        new BuiltInVariant("12th(" + Constants.INTERVALS + ")", Constants.INTERVALS),
        new BuiltInVariant("minor 13th(" + Constants.INTERVALS + ")", Constants.INTERVALS),
        new BuiltInVariant("major 13th(" + Constants.INTERVALS + ")", Constants.INTERVALS),
        new BuiltInVariant("octave(" + Constants.INTERVALS + ")", Constants.INTERVALS)

    ]

    static SCALE_VARIANTS = [
        new BuiltInVariant("major(" + Constants.SCALES + ")", Constants.SCALES),
        new BuiltInVariant("minor(" + Constants.SCALES + ")", Constants.SCALES),
        new BuiltInVariant("harmonic minor(" + Constants.SCALES + ")", Constants.SCALES),
        new BuiltInVariant("melodic minor(" + Constants.SCALES + ")", Constants.SCALES),
        new BuiltInVariant("diminished(" + Constants.SCALES + ")", Constants.SCALES),
        new BuiltInVariant("half diminished(" + Constants.SCALES + ")", Constants.SCALES),
        new BuiltInVariant("chromatic(" + Constants.SCALES + ")", Constants.SCALES),
        new BuiltInVariant("pentatonic(" + Constants.SCALES + ")", Constants.SCALES),
        new BuiltInVariant("major bebop(" + Constants.SCALES + ")", Constants.SCALES),
        new BuiltInVariant("minor bebop(" + Constants.SCALES + ")", Constants.SCALES)

    ]

    static INVERSION_VARIANTS = [
        new BuiltInVariant("root(" + Constants.INVERSIONS + ")", Constants.INVERSIONS),
        new BuiltInVariant("1st(" + Constants.INVERSIONS + ")", Constants.INVERSIONS),
        new BuiltInVariant("2nd(" + Constants.INVERSIONS + ")", Constants.INVERSIONS),
        new BuiltInVariant("3rd(" + Constants.INVERSIONS + ")", Constants.INVERSIONS),
        new BuiltInVariant("4th(" + Constants.INVERSIONS + ")", Constants.INVERSIONS),
        new BuiltInVariant("5th(" + Constants.INVERSIONS + ")", Constants.INVERSIONS),
        new BuiltInVariant("root sub 9(" + Constants.INVERSIONS + ")", Constants.INVERSIONS),
        new BuiltInVariant("1st sub 9(" + Constants.INVERSIONS + ")", Constants.INVERSIONS),
        new BuiltInVariant("2nd sub 9(" + Constants.INVERSIONS + ")", Constants.INVERSIONS),
        new BuiltInVariant("3rd sub 9(" + Constants.INVERSIONS + ")", Constants.INVERSIONS),
        new BuiltInVariant("4th sub 9(" + Constants.INVERSIONS + ")", Constants.INVERSIONS),
        new BuiltInVariant("5th sub 9(" + Constants.INVERSIONS + ")", Constants.INVERSIONS)

    ]

    static TRAVERSAL_VARIANTS = [
        new BuiltInVariant("ascending(" + Constants.TRAVERSALS + ")", Constants.TRAVERSALS),
        new BuiltInVariant("descending(" + Constants.TRAVERSALS + ")", Constants.TRAVERSALS),
        new BuiltInVariant("asc/desc(" + Constants.TRAVERSALS + ")", Constants.TRAVERSALS),
        new BuiltInVariant("diatonic 2nds(" + Constants.TRAVERSALS + ")", Constants.TRAVERSALS),
        new BuiltInVariant("diatonic 3rds(" + Constants.TRAVERSALS + ")", Constants.TRAVERSALS),
        new BuiltInVariant("diatonic 4ths(" + Constants.TRAVERSALS + ")", Constants.TRAVERSALS),
        new BuiltInVariant("diatonic 5ths(" + Constants.TRAVERSALS + ")", Constants.TRAVERSALS),
        new BuiltInVariant("diatonic 6ths(" + Constants.TRAVERSALS + ")", Constants.TRAVERSALS),
        new BuiltInVariant("diatonic 7ths(" + Constants.TRAVERSALS + ")", Constants.TRAVERSALS),
        new BuiltInVariant("octaves(" + Constants.TRAVERSALS + ")", Constants.TRAVERSALS)

    ]

    static STRING_VARIANTS = [
        new BuiltInVariant("1st/highest(" + Constants.STRINGS + ")", Constants.STRINGS),
        new BuiltInVariant("2nd(" + Constants.STRINGS + ")", Constants.STRINGS),
        new BuiltInVariant("3rd(" + Constants.STRINGS + ")", Constants.STRINGS),
        new BuiltInVariant("4th(" + Constants.STRINGS + ")", Constants.STRINGS),
        new BuiltInVariant("5th(" + Constants.STRINGS + ")", Constants.STRINGS),
        new BuiltInVariant("6th(" + Constants.STRINGS + ")", Constants.STRINGS),
        new BuiltInVariant("7th(" + Constants.STRINGS + ")", Constants.STRINGS),
        new BuiltInVariant("8th(" + Constants.STRINGS + ")", Constants.STRINGS)
    ]

    static getBIV(category){
        switch(category){
            case Constants.CHORDS:
                return this.CHORD_VARIANTS;
            case Constants.INTERVALS:
                return this.INTERVAL_VARIANTS;
            case Constants.PERMUTATIONS:
                return this.PERMUTATION_VARIANTS;
            case Constants.SCALES:
                return this.SCALE_VARIANTS;
            case Constants.INVERSIONS:
                return this.INVERSION_VARIANTS;
            case Constants.TRAVERSALS:
                return this.TRAVERSAL_VARIANTS;  
            case Constants.STRINGS:  
                return this.STRING_VARIANTS;
            default:
                return null;
        }
    }


    static getAllGroups(){
        let chords = customVariantSetRepository.getCustomVariantSetByCategory(Constants.CHORDS);
        let intervals = customVariantSetRepository.getCustomVariantSetByCategory(Constants.INTERVALS);
        let permutations = customVariantSetRepository.getCustomVariantSetByCategory(Constants.PERMUTATIONS);
        let scales = customVariantSetRepository.getCustomVariantSetByCategory(Constants.SCALES);
        let inversions = customVariantSetRepository.getCustomVariantSetByCategory(Constants.INVERSIONS);
        let traversals = customVariantSetRepository.getCustomVariantSetByCategory(Constants.TRAVERSALS);
        let strings = customVariantSetRepository.getCustomVariantSetByCategory(Constants.STRINGS);
        
        chords = chords == undefined ? [] : chords.getNames().map(name => new BuiltInVariant(name, Constants.CHORDS));
        intervals = intervals == undefined ? [] : intervals.getNames().map(name => new BuiltInVariant(name, Constants.INTERVALS));
        permutations = permutations == undefined ? [] : permutations.getNames().map(name => new BuiltInVariant(name, Constants.PERMUTATIONS));
        scales = scales == undefined ? [] : scales.getNames().map(name => new BuiltInVariant(name, Constants.SCALES));
        inversions = inversions == undefined ? [] : inversions.getNames().map(name => new BuiltInVariant(name, Constants.INVERSIONS));
        traversals = traversals == undefined ? [] : traversals.getNames().map(name => new BuiltInVariant(name, Constants.TRAVERSALS));
        strings = strings == undefined ? [] : strings.getNames().map(name => new BuiltInVariant(name, Constants.STRINGS));

        chords = chords.concat(this.CHORD_VARIANTS);
        intervals = intervals.concat(this.INTERVAL_VARIANTS);
        permutations = permutations.concat(this.PERMUTATION_VARIANTS);
        scales = scales.concat(this.SCALE_VARIANTS);
        inversions = inversions.concat(this.INVERSION_VARIANTS);
        traversals = traversals.concat(this.TRAVERSAL_VARIANTS);
        strings = strings.concat(this.STRING_VARIANTS);

        // //TODO above are 7 lists of BuiltInVariants. For each list, for each BuiltInVariant that shares the same name with any other BuiltInVariant in any of the 7 lists, change the name to the current name plus the category name. For example, if there is a chord variant named "major" and a scale variant named "major", change the chord variant name to "major (chord)" and the scale variant name to "major (scale)".

        const variantLists = [chords, intervals, permutations, scales, inversions, traversals, strings];
        const categoryNames = ["Chords", "Intervals", "Permutations", "Scales", "Inversions", "Traversals", "Strings"];

        let ans = {}
        for (let i = 0; i < variantLists.length; i++) {
            ans[categoryNames[i]] = variantLists[i]
        }

        return ans;

        // return {
        //     CHORDS : chords.map(v => new BuiltInVariant(v.name + "(" + v.category + ")", v.category)),
        //     INTERVALS : intervals.map(v => new BuiltInVariant(v.name + "(" + v.category + ")", v.category)),
        //     PERMUTATIONS : permutations.map(v => new BuiltInVariant(v.name + "(" + v.category + ")", v.category)),
        //     SCALES : scales.map(v => new BuiltInVariant(v.name + "(" + v.category + ")", v.category)),
        //     INVERSIONS : inversions.map(v => new BuiltInVariant(v.name + "(" + v.category + ")", v.category)),
        //     TRAVERSALS : traversals.map(v => new BuiltInVariant(v.name + "(" + v.category + ")", v.category)),
        //     STRINGS : strings.map(v => new BuiltInVariant(v.name + "(" + v.category + ")", v.category))
        // }


    }


}


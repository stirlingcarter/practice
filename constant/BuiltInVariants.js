import BuiltInVariant from "../models/BuiltInVariant";
import { MMKV } from "react-native-mmkv";
import { customVariantSetRepository } from "../App";


export default class BuiltInVariants {

    static MIN_TRIAD = "min triad";
    static MAJ_TRIAD = "maj triad";
    static DOM_TRIAD = "dom triad";
    static MIN6 = "min6";
    static MAJ6 = "maj6";
    static MIN7 = "min7";
    static MAJ7 = "maj7";
    static DOM7 = "7";
    static DIM = "dim";
    static HALF_DIM = "half dim";
    static AUG = "aug";
    static DOM7_SHARP_5_SHARP_9 = "7#5#9";
    static DOM7_SHARP_9 = "7#9";
    static DOM7_SHARP_5 = "7#5";
    static DOM7_SHARP_11 = "7#11";

    static INTERVALS = "Intervals"
    static CHORDS = "Chords"
    static PERMUTATIONS = "Permutations"
    static SCALES = "Scales"
    static INVERSIONS = "Inversions"
    static TRAVERSALS = "Traversals"
    static STRINGS = "Strings"
    static NOTES = "Notes"
    static ARPEGGIOS = "Arpeggios"
    static VALID_CATEGORIES = [this.INTERVALS, this.CHORDS, this.PERMUTATIONS, this.SCALES, this.INVERSIONS, this.TRAVERSALS, this.STRINGS]

    static CHORD_VARIANT_NAMES = [
        BuiltInVariants.MIN_TRIAD,
        BuiltInVariants.MAJ_TRIAD,
        BuiltInVariants.DOM_TRIAD,
        BuiltInVariants.MIN6,
        BuiltInVariants.MAJ6,
        BuiltInVariants.MIN7,
        BuiltInVariants.MAJ7,
        BuiltInVariants.DOM7,
        BuiltInVariants.DIM,
        BuiltInVariants.HALF_DIM,
        BuiltInVariants.AUG,
        BuiltInVariants.DOM7_SHARP_5_SHARP_9,
        BuiltInVariants.DOM7_SHARP_9,
        BuiltInVariants.DOM7_SHARP_5,
        BuiltInVariants.DOM7_SHARP_11
    ]

    static CHORD_VARIANTS = BuiltInVariants.CHORD_VARIANT_NAMES.map((name) => {
        return new BuiltInVariant(name + "(" + this.CHORDS + ")", this.CHORDS)}
    )

    static IONIAN = "1234567/ionian";
    static DORIAN = "2345671/dorian";
    static PHRYGIAN = "3456712/phrygian";
    static LYDIAN = "4567123/lydian";
    static MIXOLYDIAN = "5671234/mixolydian";
    static AEOLIAN = "6712345/aeolian";
    static LOCRIAN = "7123456/locrian";
    static BASIC_PERM = "1324354..."

    static PERMUTATION_VARIANT_NAMES = [
        BuiltInVariants.IONIAN,
        BuiltInVariants.DORIAN,
        BuiltInVariants.PHRYGIAN,
        BuiltInVariants.LYDIAN,
        BuiltInVariants.MIXOLYDIAN,
        BuiltInVariants.AEOLIAN,
        BuiltInVariants.LOCRIAN,
        BuiltInVariants.BASIC_PERM
    ]

    static PERMUTATION_VARIANTS = BuiltInVariants.PERMUTATION_VARIANT_NAMES.map((name) => {
        return new BuiltInVariant(name + "(" + this.PERMUTATIONS + ")", this.PERMUTATIONS)
    })

    static SECOND = "2nd";
    static MINOR_THIRD = "minor 3rd";
    static MAJOR_THIRD = "major 3rd";
    static FOURTH = "4th";
    static FIFTH = "5th";
    static MINOR_SIXTH = "minor 6th";
    static MAJOR_SIXTH = "major 6th";
    static MINOR_SEVENTH = "minor 7th";
    static MAJOR_SEVENTH = "major 7th";
    static NINTH = "9th";
    static MINOR_TENTH = "minor 10th";
    static MAJOR_TENTH = "major 10th";
    static ELEVENTH = "11th";
    static TWELFTH = "12th";
    static MINOR_THIRTEENTH = "minor 13th";
    static MAJOR_THIRTEENTH = "major 13th";
    static OCTAVE = "octave";

    static INTERVAL_VARIANT_NAMES = [
        BuiltInVariants.SECOND,
        BuiltInVariants.MINOR_THIRD,
        BuiltInVariants.MAJOR_THIRD,
        BuiltInVariants.FOURTH,
        BuiltInVariants.FIFTH,
        BuiltInVariants.MINOR_SIXTH,
        BuiltInVariants.MAJOR_SIXTH,
        BuiltInVariants.MINOR_SEVENTH,
        BuiltInVariants.MAJOR_SEVENTH,
        BuiltInVariants.NINTH,
        BuiltInVariants.MINOR_TENTH,
        BuiltInVariants.MAJOR_TENTH,
        BuiltInVariants.ELEVENTH,
        BuiltInVariants.TWELFTH,
        BuiltInVariants.MINOR_THIRTEENTH,
        BuiltInVariants.MAJOR_THIRTEENTH,
        BuiltInVariants.OCTAVE
    ]

    static INTERVAL_VARIANTS = BuiltInVariants.INTERVAL_VARIANT_NAMES.map((name) => {
        return new BuiltInVariant(name + "(" + this.INTERVALS + ")", this.INTERVALS)
    })


    static MAJOR = "major";
    static MINOR = "minor";
    static DIMINISHED = "diminished";
    static HARMONIC_MINOR = "harmonic minor";
    static MELODIC_MINOR = "melodic minor";
    static HALF_DIMINISHED = "half diminished";
    static CHROMATIC = "chromatic";
    static PENTATONIC = "pentatonic";
    static MAJOR_BEBOP = "major bebop";
    static MINOR_BEBOP = "minor bebop";

    static SCALE_VARIANT_NAMES = [
        BuiltInVariants.MAJOR,
        BuiltInVariants.MINOR,
        BuiltInVariants.DIMINISHED,
        BuiltInVariants.HARMONIC_MINOR,
        BuiltInVariants.MELODIC_MINOR,
        BuiltInVariants.HALF_DIMINISHED,
        BuiltInVariants.CHROMATIC,
        BuiltInVariants.PENTATONIC,
        BuiltInVariants.MAJOR_BEBOP,
        BuiltInVariants.MINOR_BEBOP
    ]

    static SCALE_VARIANTS = BuiltInVariants.SCALE_VARIANT_NAMES.map((name) => {
        return new BuiltInVariant(name + "(" + this.SCALES + ")", this.SCALES)
    })

    static ONE_TWO_THREE = "123";
    static TWO_THREE_ONE = "231";
    static THREE_ONE_TWO = "312";
    static ONE_TWO_THREE_FOUR = "1234";
    static TWO_THREE_ONE_FOUR = "2341";
    static THREE_ONE_TWO_FOUR = "3412";
    static FOUR_ONE_TWO_THREE = "4123";
    static ONE_FIVE_SEVEN_THREE = "1573";
    static THREE_SEVEN_ONE_FIVE = "3715";
    static FIVE_ONE_SEVEN_THREE = "5173";
    static SEVEN_THREE_ONE_FIVE = "7315";

    static INVERSION_VARIANT_NAMES = [
        BuiltInVariants.ONE_TWO_THREE,
        BuiltInVariants.TWO_THREE_ONE,
        BuiltInVariants.THREE_ONE_TWO,
        BuiltInVariants.ONE_TWO_THREE_FOUR,
        BuiltInVariants.TWO_THREE_ONE_FOUR,
        BuiltInVariants.THREE_ONE_TWO_FOUR,
        BuiltInVariants.FOUR_ONE_TWO_THREE,
        BuiltInVariants.ONE_FIVE_SEVEN_THREE,
        BuiltInVariants.THREE_SEVEN_ONE_FIVE,
        BuiltInVariants.FIVE_ONE_SEVEN_THREE,
        BuiltInVariants.SEVEN_THREE_ONE_FIVE
    ]

    static INVERSION_VARIANTS = BuiltInVariants.INVERSION_VARIANT_NAMES.map((name) => {
        return new BuiltInVariant(name + "(" + this.INVERSIONS + ")", this.INVERSIONS)
    })


    static ASCENDING = "ascending";
    static DESCENDING = "descending";
    static ASC_DESC = "asc/desc";
    static DIATONIC_2NDS = "diatonic 2nds";
    static DIATONIC_3RDS = "diatonic 3rds";
    static DIATONIC_4THS = "diatonic 4ths";
    static DIATONIC_5THS = "diatonic 5ths";
    static DIATONIC_6THS = "diatonic 6ths";
    static DIATONIC_7THS = "diatonic 7ths";
    static OCTAVES = "octaves";

    static TRAVERSAL_VARIANT_NAMES = [
        BuiltInVariants.ASCENDING,
        BuiltInVariants.DESCENDING,
        BuiltInVariants.ASC_DESC,
        BuiltInVariants.DIATONIC_2NDS,
        BuiltInVariants.DIATONIC_3RDS,
        BuiltInVariants.DIATONIC_4THS,
        BuiltInVariants.DIATONIC_5THS,
        BuiltInVariants.DIATONIC_6THS,
        BuiltInVariants.DIATONIC_7THS,
        BuiltInVariants.OCTAVES
    ]

    static TRAVERSAL_VARIANTS = BuiltInVariants.TRAVERSAL_VARIANT_NAMES.map((name) => {
        return new BuiltInVariant(name + "(" + this.TRAVERSALS + ")", this.TRAVERSALS)
    })

    static ONE_ST_HIGHEST = "1st/highest";
    static TWO_ND = "2nd";
    static THREE_RD = "3rd";
    static FOUR_TH = "4th";
    static FIVE_TH = "5th";
    static SIX_TH = "6th";
    static SEVEN_TH = "7th";
    static EIGHT_TH = "8th";

    static STRING_VARIANT_NAMES = [
        BuiltInVariants.ONE_ST_HIGHEST,
        BuiltInVariants.TWO_ND,
        BuiltInVariants.THREE_RD,
        BuiltInVariants.FOUR_TH,
        BuiltInVariants.FIVE_TH,
        BuiltInVariants.SIX_TH,
        BuiltInVariants.SEVEN_TH,
        BuiltInVariants.EIGHT_TH
    ]

    static STRING_VARIANTS = BuiltInVariants.STRING_VARIANT_NAMES.map((name) => {
        return new BuiltInVariant(name + "(" + this.STRINGS + ")", this.STRINGS)
    })

    static getBIV(category){


        switch(category){
            case this.CHORDS:
                return this.CHORD_VARIANTS;
            case this.INTERVALS:
                return this.INTERVAL_VARIANTS;
            case this.PERMUTATIONS:
                return this.PERMUTATION_VARIANTS;
            case this.SCALES:
                return this.SCALE_VARIANTS;
            case this.INVERSIONS:
                return this.INVERSION_VARIANTS;
            case this.TRAVERSALS:
                return this.TRAVERSAL_VARIANTS;  
            case this.STRINGS:  
                return this.STRING_VARIANTS;
            default:
                
                return null;
        }
    }


    static getAllGroups(){
        let chords = customVariantSetRepository.getCustomVariantSetByCategory(this.CHORDS);
        let intervals = customVariantSetRepository.getCustomVariantSetByCategory(this.INTERVALS);
        let permutations = customVariantSetRepository.getCustomVariantSetByCategory(this.PERMUTATIONS);
        let scales = customVariantSetRepository.getCustomVariantSetByCategory(this.SCALES);
        let inversions = customVariantSetRepository.getCustomVariantSetByCategory(this.INVERSIONS);
        let traversals = customVariantSetRepository.getCustomVariantSetByCategory(this.TRAVERSALS);
        let strings = customVariantSetRepository.getCustomVariantSetByCategory(this.STRINGS);
        
        chords = chords == undefined ? [] : chords.getNames().map(name => new BuiltInVariant(name, this.CHORDS));
        intervals = intervals == undefined ? [] : intervals.getNames().map(name => new BuiltInVariant(name, this.INTERVALS));
        permutations = permutations == undefined ? [] : permutations.getNames().map(name => new BuiltInVariant(name, this.PERMUTATIONS));
        scales = scales == undefined ? [] : scales.getNames().map(name => new BuiltInVariant(name, this.SCALES));
        inversions = inversions == undefined ? [] : inversions.getNames().map(name => new BuiltInVariant(name, this.INVERSIONS));
        traversals = traversals == undefined ? [] : traversals.getNames().map(name => new BuiltInVariant(name, this.TRAVERSALS));
        strings = strings == undefined ? [] : strings.getNames().map(name => new BuiltInVariant(name, this.STRINGS));

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


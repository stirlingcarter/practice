import { StyleSheet } from "react-native";
import { shadow } from "react-native-paper";

const themeColor = '#FFC0CB'
const vsrs = "#222222"
const understandMargin = 200
export const allTheStyles = StyleSheet.create({
  saveButton: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 100,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 190,
  },
  leTitleButton: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 100,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 190,
    color: 'white'
  },
  logo: {
  
    width: '130%',
    height: 1000,
    position: 'absolute',
    top: -400,
    right: 17
  },
  radialEx: {
    width: 450,
    height: 300,
    position: 'absolute',
    top: -50,
    right: -10
  },
  gpt : {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  hite: {
    height: 200
  },
  basicListItems : {
    textAlignVertical: "center",
    textAlign: "left",
    fontSize: 30,
    color: "black",
    fontStyle: "italic",
    fontWeight: "bold",
    height: 50,
  },
  chartTheme : {
    axis: {
      style: {
        tickLabels: {
          // this changed the color of my numbers to white
          fill: 'white',
        },
      },
    },
  },
  basicListItemsGreen : {
    textAlignVertical: "center",
    textAlign: "left",
    fontSize: 30,
    color: "green",
    fontStyle: "italic",
    fontWeight: "bold",
    height: 50,
  },
  basicListItemsBlue : {
    textAlignVertical: "center",
    textAlign: "left",
    fontSize: 30,
    color: "blue",
    fontStyle: "italic",
    fontWeight: "bold",
    height: 50,
  },
  addVariant : {
    textAlignVertical: "center",
    textAlign: "left",
    fontSize: 40,
    color: "",
    fontStyle: "italic",
    fontWeight: "bold",
    height: 40,
  },
  addVariantPlus : {
    textAlign: "right",
    fontSize: 50,
    color: "green",
    fontStyle: "italic",
    fontWeight: "bold",
    height: 60
  },
  addVariantPlusLeft : {
    textAlign: "left",
    fontSize: 50,
    color: "green",
    fontStyle: "italic",
    fontWeight: "bold",
    height: 60
  },
  addVariantDone : {
    textAlignVertical: "bottom",
    textAlign: "right",
    fontSize: 100,
    color: "green",
    backgroundColor: "#98FB98",
    fontStyle: "italic",
    fontWeight: "bold",
    height: 100
  },
  trash : {
    flexShrink: 1,
    textAlignVertical: "top",
    textAlign: "right",
    fontSize: 40,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 50,
    color: themeColor,
    flexDirection: "column",
    position: 'absolute',
    top: 5,
    left: 375,
    zIndex: 999
  },
  addVariantDoneUpper : {
    textAlignVertical: "bottom",
    textAlign: "right",
    fontSize: 100,
    color: "green",
    backgroundColor: "#98FB98",
    fontStyle: "italic",
    fontWeight: "bold",
    height: 20
  },
  addVariantDoneBlue : {
    textAlignVertical: "bottom",
    textAlign: "right",
    fontSize: 100,
    color: "black",
    backgroundColor: "blue",
    fontStyle: "italic",
    fontWeight: "bold",
    height: 100
  },
  addVariantPlus2 : {
    textAlign: "left",
    fontSize: 50,
    color: "blue",
    fontStyle: "italic",
    fontWeight: "bold",
    height: 50
  },
  addVariantPlus2Right : {
    textAlign: "right",
    fontSize: 50,
    color: "blue",
    fontStyle: "italic",
    fontWeight: "bold",
    height: 50
  },
  startButton: {
    textAlignVertical: "center",
    textAlign: "center",
    color: themeColor,
    fontSize: 80,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 100,
  },
  saveButton2: {
    textAlignVertical: "top",
    textAlign: "center",
    backgroundColor: "#98FB98",
    fontSize: 25,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  saveButton3: {
    textAlignVertical: "top",
    textAlign: "center",
    color: "white",
    backgroundColor: "black",
    fontSize: 30,
    fontStyle: "italic",
    fontWeight: "bold",
    flexGrow: 1
  },
  fluentButton: {
    textAlignVertical: "top",
    textAlign: "center",
    color: "black",
    backgroundColor: themeColor,
    fontSize: 30,
    fontStyle: "italic",
    fontWeight: "bold",
    flexGrow: 1
  },
  fluentRow: {
    textAlignVertical: "top",
    textAlign: "center",
    color: "#222222",
    backgroundColor: "black",
    fontSize: 50,
    fontStyle: "italic",
    fontWeight: "bold",
    flexGrow: 1
  },
  notesHeader: {
    textAlignVertical: "top",
    textAlign: "center",
    color: "black",
    backgroundColor: "#222222",
    fontSize: 30,
    fontStyle: "italic",
    fontWeight: "bold",
    flexGrow: 1
  },
  highlighteableOption: {
    textAlignVertical: "top",
    textAlign: "center",
    color: "white",
    backgroundColor: vsrs,
    fontSize: 30,
    fontStyle: "italic",
    fontWeight: "bold",
    flexGrow: 1
  },
  bpmHeading: {
    textAlignVertical: "top",
    textAlign: "center",
    color: themeColor,
    backgroundColor: vsrs,
    fontSize: 30,
    fontStyle: "italic",
    fontWeight: "bold",
    flexGrow: 1
  },
  bpmOption: {
    textAlignVertical: "top",
    textAlign: "center",
    color: "white",
    backgroundColor: "green",
    fontSize: 30,
    fontStyle: "italic",
    fontWeight: "bold",
    flexGrow: 1
  },
  highlighteableOptionGreen: {
    textAlignVertical: "top",
    textAlign: "center",
    color: "green",
    backgroundColor: vsrs,
    fontSize: 30,
    fontStyle: "italic",
    fontWeight: "bold",
    flexGrow: 1
  },
  fluentHeader: {
    textAlignVertical: "top",
    textAlign: "center",
    color: "white",
    backgroundColor: vsrs,
    fontSize: 50,
    marginBottom: 25,
    fontStyle: "italic",
    fontWeight: "bold",
    flexGrow: 1
  },
  variantAddSaveHeader: {
    textAlignVertical: "top",
    textAlign: "center",
    color: themeColor,
    backgroundColor: vsrs,
    fontSize: 50,
    marginBottom: 25,
    fontStyle: "italic",
    fontWeight: "bold",
    flexGrow: 1,
    marginTop: 25
  },
  variantAddCreateButton: {
    textAlignVertical: "top",
    textAlign: "center",
    color: "green",
    backgroundColor: vsrs,
    fontSize: 25,
    marginBottom: 25,
    fontStyle: "italic",
    fontWeight: "bold",
    flexGrow: 1,
    marginTop: 25
  },
  saveButton3r: {
    textAlignVertical: "top",
    textAlign: "center",
    color: "#333333",
    backgroundColor: "white",
    fontSize: 30,
    fontStyle: "italic",
    fontWeight: "bold",
    flexGrow: 1
  },
  linkChoiceButton3: {
    textAlignVertical: "top",
    textAlign: "center",
    backgroundColor: "#98FB98",
    fontSize: 30,
    fontStyle: "italic",
    fontWeight: "bold",
    flexGrow: 1
  },
  linkButton3r: {
    textAlignVertical: "top",
    textAlign: "center",
    backgroundColor: "#000000",
    fontSize: 30,
    fontStyle: "italic",
    fontWeight: "bold",
    flexGrow: 1
  },
  goToStatsButton: {
    textAlignVertical: "top",
    textAlign: "center",
    color: themeColor,
    fontSize: 12,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  groupScreenPathHeader: {
    textAlignVertical: "top",
    textAlign: "center",
    color: themeColor,
    fontSize: 15,
    fontStyle: "italic",
    fontWeight: "bold",
    marginBottom: 0
  },
  backButton: {
    textAlignVertical: "top",
    textAlign: "left",
    color: themeColor,
    fontSize: 33,
    height: 39,
    fontStyle: "italic",
    fontWeight: "bold"
  },
  backButtonButItsStats: {
    textAlignVertical: "top",
    textAlign: "right",
    color: themeColor,
    fontSize: 33,
    height: 39,
    fontStyle: "italic",
    fontWeight: "bold"
  },
  rightColumnOVariants: {
    textAlignVertical: "top",
    textAlign: "right",
    color: "black",
    fontSize: 33,
    height: 39,
    fontStyle: "italic",
    fontWeight: "bold"
  },
  addGroupButton: {
    textAlignVertical: "top",
    textAlign: "center",
    backgroundColor: "#1ca3ec",
    fontSize: 12,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  addLessonButton: {
    textAlignVertical: "top",
    textAlign: "center",
    backgroundColor: "#2389da",
    fontSize: 89,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  groupScreenTitle: {
    textAlignVertical: "top",
    textAlign: "center",
    color: "white",
    fontSize: 74,
    fontStyle: "italic",
    fontWeight: "bold",
    fontFamily: "optima"
  },
  enterButton: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 74,
    color: "#333333",
    fontStyle: "italic",
    fontWeight: "bold"
  },
  variantGroupTitle: {
    textAlignVertical: "center",
    textAlign: "left",
    fontSize: 30,
    color: "#333333",
    fontStyle: "italic",
    fontWeight: "bold"
  },
  addLessonOrGroupRow: {
    flexDirection:"row"
  },
  examplesRow: {
    flexDirection:"row",
    textAlign: "center",
    justifyContent: 'center',
    alignItems: 'center'
  },
  addLessonCol: {//unnerlated^
    flexDirection:"column",
    textAlign: "left"
  },
  saveButton4: {
    textAlignVertical: "top",
    textAlign: "center",
    backgroundColor: "#98FB98",
    fontSize: 12,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  saveButton5: {
    flexShrink: 1,
    textAlignVertical: "top",
    textAlign: "center",
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 200,
    color: "#000000",
    flexDirection: "column",
  },
  saveButton6: {
    flexShrink: 1,
    textAlignVertical: "top",
    textAlign: "left",
    fontSize: 30,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 40,
    color: "#000000",
    flexDirection: "column",
  },
  saveButton7: {
    flexShrink: 1,
    textAlignVertical: "top",
    textAlign: "left",
    fontSize: 40,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 100,
    color: "#000000",
    flexDirection: "column",
    
  },
  criteriaTextInput: {
    flexShrink: 1,
    textAlignVertical: "top",
    textAlign: "left",
    fontSize: 40,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 60,
    color: "white",
    flexDirection: "column",
    
  },
  goalTime: {
    flexShrink: 1,
    textAlignVertical: "top",
    textAlign: "left",
    fontSize: 40,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 75,
    color: "#000000",
    flexDirection: "column",
    color: "white",
    
  },
  filterRow: {
    flexShrink: 1,
    textAlignVertical: "top",
    textAlign: "left",
    fontSize: 40,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 65,
    color: "white",
    backgroundColor: "black",
    flexDirection: "column"
  },
  snazzyCategorySubHeader: {
    flexShrink: 1,
    textAlignVertical: "top",
    textAlign: "left",
    fontSize: 40,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 65,
    color: "white",
    backgroundColor: "#222222",
    flexDirection: "column",
    color: themeColor

  },
  filterRowRight: {
    flexShrink: 1,
    textAlignVertical: "top",
    textAlign: "right",
    fontSize: 40,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 50,
    color: themeColor,
    backgroundColor: "black",
    flexDirection: "column",
    position: 'absolute',
    top: 130,
    left: 285
  },
  saveButton7NewKnown : {
    flexShrink: 1,
    textAlign: "left",
    fontSize: 30,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 40,
    color: "#000000",
    flexDirection: "row",
  },
  saveButton8NewKnown : {
    flexShrink: 1,
    textAlign: "right",
    fontSize: 30,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 40,
    color: "#000000",
    flexDirection: "row",
  },
  saveButton8: {
    flexShrink: 1,
    textAlignVertical: "top",
    textAlign: "center",
    fontSize: 28,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 40,
    color: "#000000",
    flexDirection: "column",
  },

  saveScreenSpacer: {
    textAlignVertical: "top",
    textAlign: "center",
    fontSize: 25,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  lessonInfoScreenSpacer: {
    textAlignVertical: "top",
    textAlign: "center",
    fontSize: 25,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 300,
  },

  groupNames: {
    textAlignVertical: "top",
    textAlign: "center",
    fontSize: 89,
    fontStyle: "italic",
    fontWeight: "bold",
  },

  homescreenSpacer2: {
    textAlignVertical: "top",
    textAlign: "center",
    fontSize: 12,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 80,
  },

  groupOption: {
    textAlignVertical: "top",
    textAlign: "center",
    fontSize: 89,
    color: "#333333",
    fontStyle: "italic",
    fontWeight: "bold",
    height: 110,
  },
  openLesson: {
    textAlignVertical: "top",
    textAlign: "center",
    fontSize: 89,
    color: "#333333",
    fontStyle: "italic",
    fontWeight: "bold",
    height: 110,
  },
  openGroup: {
    textAlignVertical: "top",
    textAlign: "center",
    fontSize: 89,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#333333",
    backgroundColor: "black",
    height: 110,
  },
  homeScreenSpacer: {
    textAlignVertical: "top",
    textAlign: "center",
    fontSize: 25,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 90,
  },
  enterArrow: {
    textAlignVertical: "top",
    textAlign: "center",
    fontSize: 100,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 90,
  },
  saveLessonButton: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 100,
    color: themeColor,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 120,
  },
  examplesButton: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 30,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 50,
  },
  actualExample: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 100,
    color: themeColor,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 100,
    marginLeft: -230,
  },
  actualExampleB: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 50,
    color: "blue",
    fontStyle: "italic",
    fontWeight: "bold",
    height: 70,
    marginLeft: 40,
  },
    actualExampleG: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 50,
    color: "green",
    fontStyle: "italic",
    fontWeight: "bold",
    height: 70,
  },
  actualExampleO: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 30,
    color: themeColor,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 70,

  },
  actualExampleBO: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 30,
    color: "blue",
    fontStyle: "italic",
    fontWeight: "bold",
    height: 70,

  },
    actualExampleGO: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 30,
    color: "green",
    fontStyle: "italic",
    fontWeight: "bold",
    height: 70,
  },
  addVariantGroupButton: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 29,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 180,
  },

  groupScreenSpacer: {
    textAlignVertical: "center",
    textAlign: "center",
  
    fontSize: 100,
    fontStyle: "italic",
    fontWeight: "bold",
    height: 500,
  },
  groupScreenBackground: {
   
  },
  homeScreenBackground: {
    
  },
  saveScreenBackground: {
  },
  lessonInfoScreenBackground: {
    height: 5000,
  },
  challengeScreenBackground: {
    height: 2000
  },
  challengeButton: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 100,
    color: "#333333",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  challengePlusButton: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 100,
    color: themeColor,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  challengeMinusButton: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 100,
    color: themeColor,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  generateButton: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 75,
    color: "green",
    fontStyle: "italic",
    fontWeight: "bold",
    marginTop: 25
  },
  addStuffButton: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 100,
    color: "green",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  smallerAddStuffButton: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 50,
    color: "green",
    fontStyle: "italic",
    fontWeight: "bold",
    backgroundColor: "black",
    flexDirection: "column",
  },
  smallerAddStuffButtonRed: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 50,
    color: "red",
    fontStyle: "italic",
    fontWeight: "bold",
    backgroundColor: "black",
    flexDirection: "column",
  },
  addStuffButtonRed: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 100,
    color: "red",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  challengeButtonGreen: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 100,
    color: "green",
    fontStyle: "italic",
    fontWeight: "bold",
  },

  cri: {
    textAlignVertical: "center",
    textAlign: "auto",
    fontSize: 60,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  criWhite: {
    textAlignVertical: "center",
    textAlign: "auto",
    fontSize: 60,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "white"
  },
  warningScreen: {
    textAlignVertical: "center",
    textAlign: "auto",
    fontSize: 11,
    fontWeight: "bold",
    color: "white",
    marginLeft: 25,
    marginRight: 10,
    marginTop: 400
  },
  warningScreen3: {
    textAlignVertical: "center",
    textAlign: "auto",
    fontSize: 11,
    fontWeight: "bold",
    color: "white",
    marginLeft: 25,
    marginRight: 10,
    marginTop: 20
  },
  warningScreenHeader: {
    textAlignVertical: "center",
    textAlign: "auto",
    fontSize: 33,
    fontWeight: "bold",
    color: "white",
    marginLeft: 25,
    marginRight: 10,
    marginTop: -300
  },
  warningScreen1: {
    textAlignVertical: "center",
    textAlign: "auto",
    fontSize: 11,
    fontWeight: "bold",
    color: "white",
    marginLeft: 25,
    marginRight: 10,
    marginTop: 40
  },
  warningScreenUnderstand: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 33,
    fontWeight: "bold",
    color: "black",
    marginTop: 30,
    marginBottom: 120,
    width: 430,
    backgroundColor: themeColor
  },
  scrollStyle: {
  },
});

// import * as React from "react";
// import {
//   FlatList,
//   Button
// } from "react-native";
// import { HQI } from "./App";

// class LessonPreviewsContainer extends React.Component {
//   constructor(props) {
//     super(props);
//     this.getLessonNames = this.getLessonNames.bind(this);

//     this.state = { lessons: [] };
//   }

//   componentDidMount() {
//     this.getLessonNames();
//   }

//   async getLessonNames() {
//     var lessons = await HQI.getLessonNamesByInstrument(this.props.instrument);

//     this.setState({
//       lessons: lessons,
//     });
//   }

//   render() {
//     return (
//       <>
//         <Button
//           title={"Add Lesson"}
//           onPress={() => this.props.nav.navigate("AddLessonScreen", {
//             instrument: this.props.instrument,
//             cb: this.getLessonNames,
//           })} />

//         <FlatList
//           data={this.state.lessons}
//           renderItem={({ item }) => (
//             <Button
//               title={item}
//               onPress={() => this.props.nav.navigate("LessonLaunchScreen", {
//                 lesson: item,
//                 instrument: this.props.instrument,
//               })} />
//           )} />
//       </>
//     );
//   }
// }

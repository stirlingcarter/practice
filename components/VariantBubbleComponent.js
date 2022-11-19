import * as React from "react";
import {
  Text
} from "react-native";

import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { allTheStyles } from "../styles/allTheStyles";

export class VariantBubbleComponent extends React.Component {

    constructor(props) {
      super(props); 
      this.state = {
      };
    }
  
    componentDidMount() {
      this.setState({
  
      });
    }
  
    componentWillUnmount() {
  
    }
  
    //entered at mount due to state channge
    componentDidUpdate() {
    }
  
  
    render() {
      return(        
        <AutocompleteDropdown
clearOnFocus={false}
closeOnBlur={true}
closeOnSubmit={false}
initialValue={{ id: '2' }} // or just '2'
dataSet={[
  { id: '1', title: 'Maj7' },
  { id: '2', title: 'Min7' },
  { id: '3', title: '7' },
]}
/>)
    }
  }
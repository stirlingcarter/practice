
import * as React from "react";
import {
  Text,
  View
} from "react-native";
import { VictoryChart, VictoryScatter, VictoryPolarAxis, VictoryLabel } from "victory-native";
import * as V from 'victory';



  

export class LessonCategoryScatterPlotComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render () {


        let coordinateToCount = {}
        for (let i = 0; i < this.props.coordinates.length; i++) {
            let s = JSON.stringify(this.props.coordinates[i])
            if (coordinateToCount[s] == undefined) {
                coordinateToCount[s] = 1
            } else {
                coordinateToCount[s] += 1
            }
        }


        return (
            <VictoryChart>
        <VictoryScatter
          data={this.props.coordinates}
          labels={({ datum }) => ` ${coordinateToCount[JSON.stringify({x : datum.x, y : datum.y})]}`}


        />
      </VictoryChart>
        )


    }

    getCoordinates(xs, ys) {
        let res = []
        let coordinateToCount = {}

        for (let i = 0; i < xs.length; i++) {
            let coordinate = { x: xs[i], y: ys[i] }
            let s = JSON.stringify(coordinate)
            if (coordinateToCount[s] == undefined) {
                coordinateToCount[s] = 1
                res.push({ x: xs[i], y: ys[i] }) // we just need to add ALL of them incl dupes if we switch to continuous times vs discrete tries
            } else {
                coordinateToCount[s] += 1
            }
          res.push({ x: xs[i], y: ys[i] })
        }

        return [res, coordinateToCount]
    }
}



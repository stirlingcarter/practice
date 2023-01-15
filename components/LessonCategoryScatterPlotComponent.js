
import * as React from "react";
import {
  Text,
  View
} from "react-native";
import { VictoryChart, VictoryScatter, VictoryAxis, VictoryLabel } from "victory-native";
import * as V from 'victory';



  

export class LessonCategoryScatterPlotComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render () {
        let maxy = 5
        let minx = 60
        let maxx = 63
        for (let i = 0; i < this.props.coordinates.length; i++) {
            if (this.props.coordinates[i].y > maxy) {
                maxy = this.props.coordinates[i].y
            }
            if (this.props.coordinates[i].x < minx) {
                minx = this.props.coordinates[i].x
            }
            if (this.props.coordinates[i].x > maxx) {
                maxx = this.props.coordinates[i].x
            }
        }
        minx -= 1
        maxx += 1


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
            <VictoryChart style={{

              }}>

<VictoryAxis
      label="bpm"
      tickFormat={(tick) => tick.toFixed(0)}
      domain={ {x: [minx, maxx]} }
      style={{

        axisLabel: { fontSize: 20, fill: "pink" },
        tickLabels: { fill: "white" }      }}
    />
    <VictoryAxis
      dependentAxis
      label="tries"
      domain={ {y: [0, maxy]} }
      tickFormat={(tick) => tick.toFixed(0)}
      style={{
        axisLabel: { fontSize: 20, fill: "pink" },
                tickLabels: { fill: "white" }      

      }}
    />
        <VictoryScatter
            style={{ data: { fill: "pink" },
                    labels: { fontSize: 10, fill: "pink" } }}
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



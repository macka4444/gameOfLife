import React, { Component } from 'react';
import "./Grid.css";
import Cell from './Cell.js';
import Dimensions from 'react-dimensions'

class Grid extends Component {
    render() {
        // eslint-disable-next-line
        // let grid = generateGrid(300);

        // Generate grid display
        let colCount = Math.ceil(this.props.containerWidth / 20);
        let rowCount = Math.ceil(this.props.containerHeight / 20);

        let renderGrid = [];
        for (var i = 0; i < colCount; i++) {
            var temp = [];
            for (var j = 0; j < rowCount; j++) {
                temp.push(<Cell/>);
            }
            renderGrid.push( <div className="column">{temp}</div> )
        }
        // ---

        return (
            <div className="gridContainer">
                {renderGrid}
            </div>
        );
    }
}

// function generateGrid(dimension) {
//     var ret = [];
//     for (var i = 0; i < dimension; i++) {
//         var temp = [];
//         for (var j = 0; j < dimension; j++) {
//             temp.push(0);
//         }
//         ret.push(temp)
//     }
//     return ret;
// }

export default Dimensions()(Grid);

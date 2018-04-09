import React, { Component } from 'react';
import "./Grid.css";
import Cell from './Cell.js';
import Dimensions from 'react-dimensions'

class Grid extends Component {
    constructor(props) {
        super(props);

        // Generate grid display
        let colCount = Math.ceil(this.props.containerWidth / 20);
        let rowCount = Math.ceil(this.props.containerHeight / 20);

        this.state = { grid: generateGrid(colCount + 200, rowCount + 200) };
        this.getGridCell = this.getGridCell.bind(this);

        this.handleClick = this.handleClick.bind(this);
        this.render = this.render.bind(this);
        
    }
    getGridCell(i, j) {
        let that = this;
        return function () {
            return that.state.grid[i][j];
        }
    }

    handleClick(e) {
        let x = Math.floor(e.clientX / 20);
        let y = Math.floor(e.clientY / 20);

        this.state.grid[x][y] = !this.state.grid[x][y];
        this.forceUpdate();
        
    }


    render() {
        let colCount = Math.ceil(this.props.containerWidth / 20);
        let rowCount = Math.ceil(this.props.containerHeight / 20);

        let renderGrid = [];
        for (var i = 0; i < colCount; i++) {
            var temp = [];
            for (var j = 0; j < rowCount; j++) {
                temp.push(<Cell getToggle={this.getGridCell(i,j)} />);
            }
            renderGrid.push( <div className="column">{temp}</div> )
        }

        return (
            <div className="gridContainer" onClick={this.handleClick}>
                {renderGrid}
            </div>
        );
    }
}


function generateGrid(width,height) {
    var ret = [];
    for (var i = 0; i < width; i++) {
        var temp = [];
        for (var j = 0; j < height; j++) {
            temp.push(0);
        }
        ret.push(temp)
    }
    return ret;
}


export default Dimensions()(Grid);

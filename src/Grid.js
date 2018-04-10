import React, { Component } from 'react';
import "./Grid.css";
import Cell from './Cell.js';
import Dimensions from 'react-dimensions'

class Grid extends Component {
    constructor(props) {
        super(props);
        // Get Grid Dimensions
        let colCount = Math.ceil(this.props.containerWidth / 20);
        let rowCount = Math.ceil(this.props.containerHeight / 20);

        this.state = {
            grid: this.generateGrid(colCount + 200, rowCount + 200),
            running: false
        };
        
        //bindings
        this.getCellState = this.getCellState.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        
    }
    
    render() {
        //get grid dimensions
        let colCount = Math.ceil(this.props.containerWidth / 20);
        let rowCount = Math.ceil(this.props.containerHeight / 20);

        //generate cells
        let renderGrid = [];
        for (var i = 100; i < colCount+100; i++) {
            var temp = [];
            for (var j = 100; j < rowCount+100; j++) {
                temp.push(<Cell getState={this.getCellState(i,j)} />);
            }
            renderGrid.push( <div className="column">{temp}</div> )
        }

        return (
            <div className="gridContainer"
                onClick={this.handleClick}
                onKeyDown={this.handleKeyPress}
                tabIndex="0">
                {renderGrid}
            </div>
        );
    }

    // generates callback to be passed to a Cell
    getCellState(i, j) {
        let that = this;
        return function () {
            return that.state.grid[i][j];
        }
    }
    generateGrid(width, height) {
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
    
    // Event Handlers
    handleClick(e) {
        // get cursor coordinates
        let x = Math.floor(e.clientX / 20);
        let y = Math.floor(e.clientY / 20);
        
        // change state of relevant cell
        // TODO: rewrite this with setState
        this.state.grid[x + 100][y + 100] = !this.state.grid[x + 100][y + 100];
        
        //rerender
        this.forceUpdate();
    }
    
    handleKeyPress(e){
        if (e.keyCode === 32) {
            this.state.running = !this.state.running;
        }
    }

    evolve(grid) {
        
    }

}

export default Dimensions()(Grid);

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
        this.evolve = this.evolve.bind(this);
        
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
                <p className="titleBlue">CONWAY'S GAME OF LIFE</p>
                <p className="titlePink">CONWAY'S GAME OF LIFE</p>
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
            if (this.state.running === false) {
                var that = this;
                var intervalID = setInterval(function () {
                    that.state.grid = that.evolve(that.state.grid);
                    that.forceUpdate();
                }, 100);
                this.state.interval = intervalID;
                console.log("set");
            } else {
                clearInterval(this.state.interval);
            }

            this.state.running = !this.state.running;
            this.forceUpdate();
        }
    }

    nCount(grid, x, y) {
        var score = 0;
        for (var j = y - 1; j <= y + 1; j++) {
            for (var i = x - 1; i <= x + 1; i++) {
                if (x === i && y === j) {
                    // skip if checking own cell
                } else if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length) {
                    //skip if outside grid
                } else if (grid[i][j] == 1) {
                    // for some reason grid[i][j] is being casted as a bool
                    // type coersion seems like its fine to do in this situation... I hope
                    score++;
                }
            }
        }
        return score;
    }

    evolve(grid) {
        let width = grid.length;
        let height = grid[0].length
        var newGrid = this.generateGrid(width, height);

        for (var i = 0; i < width; i++) {
            for (var j = 0; j < height; j++) {
                //live cell
                if (grid[i][j] == 1) {
                    //as before, using type coersion
                    if (this.nCount(grid, i, j) < 2) {
                        newGrid[i][j] = 0; //dies from underpopulation
                    } else if (this.nCount(grid, i, j) <= 3) {
                        newGrid[i][j] = 1; //lives
                    } else {
                        newGrid[i][j] = 0; //dies from overpopulation
                    }
                    //dead cell
                } else if (grid[i][j] === 0) {
                    if (this.nCount(grid, i, j) === 3) {
                        newGrid[i][j] = 1; //lives from reproduction
                    } else {
                        newGrid[i][j] = 0; //remains dead
                    }
                }
            }            
        }
        return newGrid;
    }
}

export default Dimensions()(Grid);

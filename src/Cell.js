import React, { Component } from 'react';
import './Cell.css'

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = { on: false };

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            on: !prevState.on
        }));
    }

    render() { 
        let cellColor = this.state.on ? "blue" : "red";
        return (
            <div className="cell"
                style={{ backgroundColor: cellColor }}
                onClick={this.handleClick}>
            </div>
        );
    }
}

export default Cell;
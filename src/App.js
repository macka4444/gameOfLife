import React, { Component } from 'react';
import './App.css';
import Grid from './Grid.js';


class App extends Component {
  render() {
    return (
      <div className='container' style={{ backgroundColor: "pink" }}>
        <Grid/>  
      </div>
    );
  }
}

export default App;

import React from 'react';
import logo from './logo.png';
import './App.css';
import CpuUsage from './components/CircularUsage/CpuUsage';
import RamUsage from './components/CircularUsage/RamUsage';
import SwapUsage from './components/CircularUsage/SwapUsage';

function App() {
  return (
    <div id="app" className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Projeto construido usando <span className="Header-span">wails/react</span>.
        </p>
      </header>

      <div className="GridContainer">
        <div className="GridItem">
          <CpuUsage />
        </div>
        <div className="GridItem">
          <RamUsage />
        </div>
        <div className="GridItem">
          <SwapUsage />
        </div>
      </div>

    </div>
  );
}

export default App;

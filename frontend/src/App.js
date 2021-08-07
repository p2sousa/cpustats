import React from 'react';
import logo from './logo.png';
import './App.css';
import CpuUsage from './components/CpuUsage';
import HelloWorld from './components/HelloWorld';

function App() {
  return (
    <div id="app" className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to your new <code>wails/react</code> project.
        </p>

        <HelloWorld />
        <CpuUsage />
      </header>
    </div>
  );
}

export default App;

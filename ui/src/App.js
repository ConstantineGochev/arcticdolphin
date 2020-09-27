import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './components/Toolbar/Navigation';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation/>
      </div>
    </BrowserRouter>
  );
}

export default App;

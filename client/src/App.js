import React from 'react';
import { BrowserRouter } from "react-router-dom";

import './app.css';
import { Router } from './components/router';

const App = () => {
  return (
    <BrowserRouter>
      <div className='app'>
        <Router />
      </div>
    </BrowserRouter>
  );
};

export default App;

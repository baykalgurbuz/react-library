import React from 'react';

import './App.css';
import { Navbar } from './layout/NavbarAndFooter/Navbar';
import { ExploreTopBooks } from './layout/HomePage/ExploreTopBooks';

function App() {
  return (
    <div>
    <Navbar/>
    <ExploreTopBooks/>
    </div>
  );
}

export default App;

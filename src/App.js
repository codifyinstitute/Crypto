import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';

import Home from './components/Home';
import { theme } from './styles/theme';
import HomeConatiner from './components/HomeConatiner';
import Sell1 from './components/Sell1';
import Sell2 from './components/Sell2';
import Sell3 from './components/Sell3';
import Sell4 from './components/Sell4';
import Sell5 from './components/Sell5';
import Profile from './components/Profile';
import Bank from './components/Bank';
import Transaction from './components/Transaction';




function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
 

        <Routes>
          <Route path="/" element={<HomeConatiner />} />
          <Route path="/Sell1" element={<Sell1 />} />
          <Route path="/Sell2" element={<Sell2 />} />
          <Route path="/Sell3" element={<Sell3 />} />
          <Route path="/Sell4" element={<Sell4 />} />
          <Route path="/Sell5" element={<Sell5 />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Bank" element={<Bank />} />
          <Route path="/Transaction" element={<Transaction />} />
   
      
      
        </Routes>
 
    </ThemeProvider>
  );
}

export default App;

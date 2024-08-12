import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';

import Home from './components/Home';
import { theme } from './styles/theme';
import HomeConatiner from './components/HomeConatiner';



function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
 

        <Routes>
          <Route path="/" element={<HomeConatiner />} />
   
      
      
        </Routes>
 
    </ThemeProvider>
  );
}

export default App;

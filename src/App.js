import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';

import Home from './components/Home';
import { theme } from './styles/theme';
import HomeConatiner from './components/HomeConatiner';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminTransactionFee from './components/Admin/AdminTransactionFee';
import AdminUsers from './components/Admin/AdminUsers';
import AdminTransaction from './components/Admin/AdminTransaction';
import AdminAddCurrency from './components/Admin/AdminAddCurrency';



function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<HomeConatiner />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/addCurrency" element={<AdminAddCurrency />} />
        <Route path="/admin/transactions" element={<AdminTransaction />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/transactionFee" element={<AdminTransactionFee />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;

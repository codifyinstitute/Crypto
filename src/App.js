import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminTransactionFee from './components/Admin/AdminTransactionFee';
import AdminUsers from './components/Admin/AdminUsers';
import AdminTransaction from './components/Admin/AdminTransaction';
import AdminAddCurrency from './components/Admin/AdminAddCurrency';
import OTPPage from './components/OTP';
import QRCodeCard from './components/QRCode';
import Refer from './components/Refer';



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
        <Route path="/qrcode" element={<QRCodeCard />} />
        <Route path="/Sell5" element={<Sell5 />} />
        <Route path="/otp" element={<OTPPage />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Refer" element={<Refer />} />
        <Route path="/Bank" element={<Bank />} />
        <Route path="/Transaction" element={<Transaction />} />
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

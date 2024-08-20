import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import HomeContact from './HomeContact';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #1a1a1a;
  padding: 20px;

`;

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #f7a600;
  margin-top: 0;
  margin-bottom: 20px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Label = styled.span`
  color: #666;
`;

const Value = styled.span`
  font-weight: bold;
`;

const QRCodeContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const QRCode = styled.div`
  width: 150px;
  height: 150px;
  background-color: #f0f0f0;
  border: 2px solid #f7a600;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TransactionLabel = styled.p`
  text-align: center;
  margin: 10px 0;
`;

const Button = styled.button`
  background-color: #f7a600;
  color: white;
  border: none;
  padding: 12px;
  width: 100%;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #e69500;
  }
`;



const Sell4 = () => {
  return (
    <>
    <PageContainer>
    <Navbar/>
      <Card>
        <Title>Sell USDT</Title>
        <InfoRow>
          <Label>Order ID</Label>
          <Value>00008575257</Value>
        </InfoRow>
        <InfoRow>
          <Label>Transaction</Label>
          <Value>Paytm</Value>
        </InfoRow>
        <InfoRow>
          <Label>Your Sell</Label>
          <Value>456</Value>
        </InfoRow>
        <InfoRow>
          <Label>Process Fees</Label>
          <Value>54</Value>
        </InfoRow>
        <InfoRow>
          <Label>You Receive</Label>
          <Value>2554</Value>
        </InfoRow>
        <InfoRow>
          <Label>Total:-</Label>
          <Value>2500</Value>
        </InfoRow>
        <InfoRow>
          <Label>Address</Label>
          <Value>xyzname</Value>
        </InfoRow>
        <QRCodeContainer>
          <QRCode>QR Code</QRCode>
        </QRCodeContainer>
        <TransactionLabel>Transaction ID</TransactionLabel>
        <Link to='/Sell5'><Button>Proceed - Buy ACH →</Button></Link>
     
      </Card>

    </PageContainer>
    <HomeContact/>
    <Footer/>
    </>
  );
};

export default Sell4;
import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';

const Container = styled.div`
  background-color: #121212;
  min-height: 100vh;
  padding: 20px;
  color: white;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const TabContainer = styled.div`
  display: flex;
  background-color: #1E1E1E;
  border-radius: 25px;
  overflow: hidden;
  margin-bottom: 20px;
  margin-top: 4%;
`;

const Tab = styled.button`
  background-color: ${props => props.active ? '#121212' : 'transparent'};
  color: ${props => props.active ? '#FFA500' : 'white'};
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.active ? '#121212' : '#2A2A2A'};
  }
`;

const TransactionList = styled.div`
  width: 100%;
  max-width: 600px;
`;

const TransactionCard = styled.div`
  background-color: #1E1E1E;
  border: 1px solid #FFA500;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
`;

const TransactionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const TransactionDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TransactionColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  color: #FFA500;
  font-size: 12px;
  margin-bottom: 5px;
`;

const Value = styled.span`
  font-size: 14px;
`;

const StatusValue = styled(Value)`
  color: ${props => props.status === 'Successfully' ? '#4CAF50' : '#FF6347'};
`;

const Transaction = () => {
  const [activeTab, setActiveTab] = useState('Pending');

  const transactions = [
    { id: 'Transaction ID', date: '30/10/2019', status: 'Unsuccessfully', company: 'Capi Telecom', amount: '$50' },
    { id: 'Transaction ID', date: '30/10/2019', status: 'Successfully', company: 'Capi Telecom', amount: '$50' },
    { id: 'Transaction ID', date: '30/10/2019', status: 'Successfully', company: 'Capi Telecom', amount: '$50' },
    { id: 'Transaction ID', date: '30/10/2019', status: 'Successfully', company: 'Capi Telecom', amount: '$50' },
    { id: 'Transaction ID', date: '30/10/2019', status: 'Successfully', company: 'Capi Telecom', amount: '$50' },
  ];

  return (
    <>
    <Navbar/>
    <Container>
      <Title>Transactions</Title>
      <TabContainer>
        <Tab active={activeTab === 'Pending'} onClick={() => setActiveTab('Pending')}>Pending</Tab>
        <Tab active={activeTab === 'Completed'} onClick={() => setActiveTab('Completed')}>Completed</Tab>
      </TabContainer>
      <TransactionList>
        {transactions.map((transaction, index) => (
          <TransactionCard key={index}>
            <TransactionHeader>
              <Value>{transaction.id}</Value>
              <Value>{transaction.date}</Value>
            </TransactionHeader>
            <TransactionDetails>
              <TransactionColumn>
                <Label>Status</Label>
                <StatusValue status={transaction.status}>{transaction.status}</StatusValue>
              </TransactionColumn>
              <TransactionColumn>
                <Label>Company</Label>
                <Value>{transaction.company}</Value>
              </TransactionColumn>
              <TransactionColumn>
                <Label>Amount</Label>
                <Value>{transaction.amount}</Value>
              </TransactionColumn>
            </TransactionDetails>
          </TransactionCard>
        ))}
      </TransactionList>
    </Container>
    <Footer/>
    </>
  );
};

export default Transaction;
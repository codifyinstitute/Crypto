import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';
import { toast } from 'react-toastify'; // For toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

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
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      const email = localStorage.getItem('token'); // Get email from local storage
      if (email) {
        try {
          const response = await fetch(`https://crypto-anl6.onrender.com/transactions/get/email/${email}`);
          if (!response.ok) throw new Error('Failed to fetch transactions');
          const data = await response.json();
          setTransactions(data);
        } catch (error) {
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        toast.error('No email found in local storage');
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <Container><Title>Loading...</Title></Container>;

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
          {transactions
            .filter(transaction => transaction.Status === activeTab)
            .map((transaction, index) => (
              <TransactionCard key={index}>
                <TransactionHeader>
                  <Value>{transaction.OrderId}</Value>
                  <Value>{transaction.Date}</Value>
                </TransactionHeader>
                <TransactionDetails>
                  <TransactionColumn>
                    <Label>Status</Label>
                    <StatusValue status={transaction.Status}>{transaction.Status}</StatusValue>
                  </TransactionColumn>
                  <TransactionColumn>
                    <Label>Bank Name</Label>
                    <Value>{transaction.BankName}</Value>
                  </TransactionColumn>
                  <TransactionColumn>
                    <Label>Account Number</Label>
                    <Value>{transaction.AccountNumber}</Value>
                  </TransactionColumn>
                  <TransactionColumn>
                    <Label>Amount</Label>
                    <Value>${transaction.ReceivedAmount}</Value>
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

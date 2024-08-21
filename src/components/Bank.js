import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Navbar from './Navbar';
import axios from 'axios'; // Import axios for making API requests
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toastify

const Container = styled.div`
  background-color: #121212;
  min-height: 100vh;
  padding: 20px;
  color: white;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
`;

const AddButton = styled.button`
  background-color: #FFA500;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  color:black;
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormTitle = styled.h2`
  font-size: 18px;
  margin-top: 0;
  margin-bottom: 20px;
  color: #FFA500;
`;

const FormSection = styled.div`
  margin-bottom: 20px;
`;

const FormSectionTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #333;
  background-color: white;
  color: black;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  background-color: #FFA500;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
`;

const AccountCard = styled.div`
  background-color: #1E1E1E;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
`;

const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AccountName = styled.span`
  font-weight: bold;
  margin-bottom: 5px;
`;

const AccountDetails = styled.span`
  color: #888;
  font-size: 14px;
`;

const AccountNumber = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const AccountNumberValue = styled.span`
  font-weight: bold;
  margin-bottom: 5px;
`;

const AccountBalance = styled.span`
  color: #4CAF50;
`;

const DeleteButton = styled.button`
  background-color: #FF4C4C;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
`;

const Bank = () => {
  const [showForm, setShowForm] = useState(false);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://crypto-anl6.onrender.com/users/get/${token}`);
        setAccounts(response.data.Accounts);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  const handleDelete = async (accountNumber) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://crypto-anl6.onrender.com/users/del/${token}/accounts/${accountNumber}`);
      
      // Update local state
      setAccounts((prevAccounts) =>
        prevAccounts.filter((account) => account.AccountNumber !== accountNumber)
      );
      
      // Show success toast
      toast.success('Account deleted successfully!');
      
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('Failed to delete account.');
    }
  };

  return (
    <>
      <Navbar/>
      <Container>
        <Header>
          <Title>Payment Methods</Title>
          <AddButton onClick={() => setShowForm(!showForm)}>Add new +</AddButton>
        </Header>

        {showForm && (
          <Card>
            <Form>
              <FormTitle>Add Payment method</FormTitle>
              <FormSection>
                <FormSectionTitle>Personal Information</FormSectionTitle>
                <Input placeholder="Please enter your full name" />
                <Input placeholder="Choose your country" />
              </FormSection>
              <FormSection>
                <FormSectionTitle>Account Information</FormSectionTitle>
                <Input placeholder="Please enter your full name" />
                <Input placeholder="Please enter your full name" />
                <Input placeholder="Choose your country" />
              </FormSection>
              <SubmitButton>Submit</SubmitButton>
            </Form>
          </Card>
        )}

        {accounts.map((account) => (
          <AccountCard key={account.AccountNumber}>
            <AccountInfo>
              <AccountName>{account.BankName}</AccountName>
              <AccountDetails>{account.Name}</AccountDetails>
              <AccountDetails>{account.Country}</AccountDetails>
            </AccountInfo>
            <AccountNumber>
              <AccountNumberValue>Account No: {account.AccountNumber}</AccountNumberValue>
              <AccountDetails>IFSC: {account.IFSC}</AccountDetails>
            </AccountNumber>
            <DeleteButton onClick={() => handleDelete(account.AccountNumber)}>
              Delete
            </DeleteButton>
          </AccountCard>
        ))}
      </Container>
      <Footer/>
      <ToastContainer /> {/* Add ToastContainer to your component */}
    </>
  );
};

export default Bank;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Navbar from './Navbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { X } from 'lucide-react';

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
  margin-top: 5%;
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
  font-size: 18px;
  font-weight: bold;
  @media (max-width: 430px) {
    font-size: 14px;
  }
`;
const BackButton = styled.button`
  background-color: #FFA500;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  margin: 1rem;
  /* position: fixed; */
  /* top: 20px; */
  /* left: 20px; */
  z-index: 1001;
  display: none; // Hidden by default

  @media (max-width: 1024px) { // Show on tablet and mobile
    display: block;
  }

  @media (max-width: 430px) {
    font-size: 14px;
    top: 10px;
    left: 10px;
  }
`;

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  color: black;
  width: 100%;
  max-width: 400px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  @media (max-width: 375px) {
    max-width: 340px;
  }
  @media (max-width: 320px) {
    max-width: 300px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #333;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  align-items: center;
  justify-content: space-between;
`;

const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 10%;
  
  @media (max-width: 1024px) {
    width: 30%;
  }
  @media (max-width: 430px) {
    width: 55%;
  }
`;

const AccountName = styled.span`
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 430px) {
    font-size: 14px;
  }
`;

const AccountDetails = styled.span`
  color: white;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 430px) {
    font-size: 14px;
  }
`;

const AccountNumberValue = styled.span`
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 430px) {
    font-size: 14px;
  }
`;

const AccountBalance = styled.span`
  color: #4CAF50;
  font-weight: bold;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 430px) {
    font-size: 14px;
  }
`;

const DeleteButton = styled.button`
  background-color: #FF4C4C;
  color: white;
  border: none;
  font-size: 18px;
  padding: 5px 10px;
  border-radius: 5px;
  width: 4rem;
  height: 2rem;
  cursor: pointer;
  font-weight: bold;
  @media (max-width: 430px) {
    font-size: 14px;
  }
`;

const Label = styled.p`
  color: white;
  font-size: 14px;
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

      setAccounts((prevAccounts) =>
        prevAccounts.filter((account) => account.AccountNumber !== accountNumber)
      );

      toast.success('Account deleted successfully!');

    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('Failed to delete account.');
    }
  };

  return (
    <>
      <Navbar />

      <Container>
        <Header>
          <BackButton onClick={() => window.history.back()}>Back</BackButton>
          <Title>Payment Methods</Title>
          <AddButton onClick={() => setShowForm(true)}>Add new +</AddButton>
        </Header>

        {showForm && (
          <>
            <Overlay onClick={() => setShowForm(false)} />
            <Card>
              <CloseButton onClick={() => setShowForm(false)}>
                <X size={24} />
              </CloseButton>
              <Form>
                <FormTitle>Add Payment Method</FormTitle>
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
          </>
        )}

        {accounts.map((account) => (
          <AccountCard key={account.AccountNumber}>
            <AccountInfo>
              <AccountName><Label>Bank Name:</Label> {account.BankName}</AccountName>
              <AccountDetails><Label>Account Name:</Label> {account.Name}</AccountDetails>
              <AccountDetails><Label>Country:</Label> {account.Country}</AccountDetails>
              <AccountNumberValue><Label>Account No:</Label> {account.AccountNumber}</AccountNumberValue>
              <AccountDetails><Label>IFSC:</Label> {account.IFSC}</AccountDetails>
            </AccountInfo>
            <DeleteButton onClick={() => handleDelete(account.AccountNumber)}>
              Delete
            </DeleteButton>
          </AccountCard>
        ))}
      </Container>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Bank;
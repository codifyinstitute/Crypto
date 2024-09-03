import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';
import HomeContact from './HomeContact';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: black;
  @media (max-width: 480px) {

     display: flex;
     align-items: center;
     justify-content: center;
    }
`;

const FormWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const FormContainer = styled.div`
    background-color: white;
    color: white;
    padding: 2rem;
    border-radius: 0.5rem;
    width: 380px;
    height: 610px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 480px) {
        padding: 1rem;
        width: auto;
        height: auto;
    }
`;


const FormTitle = styled.h2`
  color: #f7a600;
  margin-top: 0;
  font-size: 1.9rem;
  text-align: center;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  
`;

const Tab = styled.div`
  padding: 0.5rem 0;
  margin-right: 1rem;
  color: orange;
  border-bottom: 2px solid orange;
  cursor: pointer;
  font-size: 18px;
`;

const FormSection = styled.div`
  /* margin-bottom: 1.5rem; */

  h3 {
    color: orange;
    margin-bottom: 0.5rem;
    font-size: 18px;
    font-size: medium;
    font-weight: 100;
    margin: 8px auto;
  }
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
  color: #666;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
`;

const FormButton = styled.button`
  background-color: #f7a600;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  &:hover {
    background-color: #e69500;
  }
`;

const FormWarning = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 1rem;
`;

const CardsContainer = styled.div`
  margin-top: 7%;
  display: flex;
  flex-direction: column;
  align-items:center;
  @media (max-width: 480px) {
     width: 90%;
    }
`;
const CardsSection = styled.div`
  width:90%;
  border: .2rem #f7a600 solid;
  border-radius: 1rem;
  margin-top: 1rem;
  display: flex;
  gap:1rem;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Card = styled.div`
  width: 480px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin: 1rem;
  font-family: Arial, sans-serif;
  color: #333;
  cursor: pointer;
`;

const CardTitle = styled.h4`
  color: #f7a600;
  margin-top: 0;
  text-align: center;

  
`;

const Crosss = styled.p`
display: flex;
width: 100%;
justify-content: space-between;

  
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
  z-index: 1001;
  display: none;

  @media (max-width: 1024px) { // Show on tablet and mobile
    display: block;
  }

  @media (max-width: 430px) {
    font-size: 14px;
    top: 10px;
    left: 10px;
  }
`;

const Sell3 = () => {
  const navigate = useNavigate();
  const [accountHolder, setAccountHolder] = useState('');
  const [country, setCountry] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    validateForm();
  }, [accountHolder, country, bankName, accountNumber, ifsc]);

  const fetchData = async () => {
    const email = localStorage.getItem('token');

    if (!email) {
      console.error('No email found in local storage');
      return;
    }

    try {
      const response = await axios.get(`https://crypto-anl6.onrender.com/users/get/${email}`);
      const user = response.data;

      if (user.Accounts.length > 0) {
        setAccounts(user.Accounts);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const validateForm = () => {
    const isValid =
      accountHolder.trim() !== '' &&
      country.trim() !== '' &&
      bankName.trim() !== '' &&
      accountNumber.trim() !== '' &&
      ifsc.trim() !== '';
    setIsFormValid(isValid);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const email = localStorage.getItem('token');

    if (!email) {
      console.error('No email found in local storage');
      return;
    }

    const accountData = {
      Name: accountHolder,
      Country: country,
      BankName: bankName,
      AccountNumber: accountNumber,
      IFSC: ifsc,
    };

    try {
      await axios.put(`http://localhost:8000/users/put/${email}/accounts`, accountData);
      toast.success('Account data successfully submitted');
      setAccountHolder('');  // Clear input fields
      setCountry('');
      setBankName('');
      setAccountNumber('');
      setIfsc('');
      fetchData();
    } catch (error) {
      toast.error('Error submitting account data');
      console.error('Error submitting account data:', error);
    }
  };

  const handleCardClick = (account) => {
    const existingTransactionDetails = JSON.parse(localStorage.getItem('transactionDetails')) || {};

    const updatedTransactionDetails = {
      ...existingTransactionDetails,
      Name: account.Name,
      Country: account.Country,
      BankName: account.BankName,
      AccountNumber: account.AccountNumber,
      IFSC: account.IFSC
    };

    localStorage.setItem('transactionDetails', JSON.stringify(updatedTransactionDetails));
    navigate('/qr-code');
  };

  return (
    <>
    <PageContainer>
    <div style={{ width: "100%" }}>
    <BackButton onClick={() => window.history.back()}>Back</BackButton>
</div>
      <Navbar />
      <ToastContainer />
      <CardsContainer>
        <FormTitle>Choose Account</FormTitle>
        <CardsSection>
          {accounts.map((account, index) => (
            <Card key={index} onClick={() => handleCardClick(account)}>
              <CardTitle>Account {index + 1}</CardTitle>
              <Crosss><strong>Account Holder:</strong> {account.Name}</Crosss>
              <Crosss><strong>Country:</strong> {account.Country}</Crosss>
              <Crosss><strong>Bank Name:</strong> {account.BankName}</Crosss>
              <Crosss><strong>Account Number:</strong> {account.AccountNumber}</Crosss>
              <Crosss><strong>IFSC:</strong> {account.IFSC}</Crosss>
            </Card>
          ))}
        </CardsSection>
        {/* <FormButton style={{width:"20%"}}>
          Add Account
        </FormButton> */}
      </CardsContainer>
      <FormWrapper>
        <FormContainer>
          <TabContainer>
            <Tab active>Add Account</Tab>
          </TabContainer>

          <form onSubmit={handleFormSubmit}>
            <FormSection>
              <h3>Personal Information</h3>
              <FormLabel>Account Holder</FormLabel>
              <FormInput
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value)}
                placeholder="Please enter your full name"
              />

              <FormLabel>Country</FormLabel>
              <FormInput
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Choose your country"
              />
            </FormSection>

            <FormSection>
              <h3>Account Information</h3>
              <FormLabel>Bank Name</FormLabel>
              <FormInput
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="Enter Your Bank Name"
              />

              <FormLabel>Account Number</FormLabel>
              <FormInput
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Enter Your Account Number"
              />

              <FormLabel>IFSC</FormLabel>
              <FormInput
                value={ifsc}
                onChange={(e) => setIfsc(e.target.value)}
                placeholder="Enter Your IFSC"
              />
            </FormSection>

            <FormWarning>
              Attention: Please ensure the bank account belongs to you and the information is accurate.
            </FormWarning>

            <FormButton type="submit" disabled={!isFormValid}>
              Proceed To Pay
            </FormButton>
          </form>
        </FormContainer>
      </FormWrapper>
    </PageContainer>
      <HomeContact />
      <Footer />
      </>
  );
};

export default Sell3;

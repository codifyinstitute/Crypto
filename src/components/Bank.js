import React, { useState } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Navbar from './Navbar';

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
  color: white;
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

const Bank = () => {
  const [showForm, setShowForm] = useState(false);

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

      <AccountCard>
        <AccountInfo>
          <AccountName>Bank Name</AccountName>
          <AccountDetails>Holder Name</AccountDetails>
          <AccountDetails>Branch</AccountDetails>
        </AccountInfo>
        <AccountNumber>
          <AccountNumberValue>Account Number</AccountNumberValue>
          <AccountBalance>$20,000</AccountBalance>
          <AccountDetails>New York</AccountDetails>
        </AccountNumber>
      </AccountCard>

      <AccountCard>
        <AccountInfo>
          <AccountName>Account 2</AccountName>
          <AccountDetails>Available balance</AccountDetails>
          <AccountDetails>Branch</AccountDetails>
        </AccountInfo>
        <AccountNumber>
          <AccountNumberValue>8988 1234</AccountNumberValue>
          <AccountBalance>$12,000</AccountBalance>
          <AccountDetails>New York</AccountDetails>
        </AccountNumber>
      </AccountCard>

      <AccountCard>
        <AccountInfo>
          <AccountName>Account 3</AccountName>
          <AccountDetails>Available balance</AccountDetails>
        </AccountInfo>
        <AccountNumber>
          <AccountNumberValue>1900 1234 2222</AccountNumberValue>
          <AccountBalance>$230,000</AccountBalance>
        </AccountNumber>
      </AccountCard>
    </Container>
    <Footer/>
      </>
  );
};

export default Bank;
import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import HomeContact from './HomeContact';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #1a1a1a;
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
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  margin-top: 5%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  color: #333;

  @media (max-width: 450px) {
    padding: 1.5rem;
  }
`;

const FormTitle = styled.h2`
  color: #f7a600;
  margin-top: 0;
`;

const FormSection = styled.div`
  margin-bottom: 1.5rem;

  h3 {
    margin-bottom: 0.5rem;
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

  &:hover {
    background-color: #e69500;
  }
`;

const FormWarning = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 1rem;
`;



const Sell3 = () => {
  return (
    <PageContainer>
    <Navbar/>
      <FormWrapper>
        <FormContainer>
          <FormTitle>Choose Paymet method</FormTitle>
          
          <FormSection>
            <h3>Personal Information</h3>
            <FormLabel>Account Holder</FormLabel>
            <FormInput placeholder="Please enter your full name" />
            
            <FormLabel>Country</FormLabel>
            <FormInput placeholder="Choose your country" />
          </FormSection>
          
          <FormSection>
            <h3>Account Information</h3>
            <FormLabel>Account Number</FormLabel>
            <FormInput placeholder="Please enter your full name" />
            
            <FormLabel>IFSC</FormLabel>
            <FormInput placeholder="Choose your country" />
          </FormSection>
          
          <FormWarning>
            Attention : Please ensure the bank accounts belongs to you and the information is accurate.
          </FormWarning>
          
          <Link to='/Sell4'><FormButton>Proceed - Buy ACH →</FormButton></Link>
        </FormContainer>
      
      </FormWrapper>
      <HomeContact/>
      <Footer/>
    </PageContainer>
  );
};

export default Sell3;
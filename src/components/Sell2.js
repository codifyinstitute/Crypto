import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import HomeContact from './HomeContact';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: fit-content;
  justify-content: space-between;
  gap: 10rem;
  background-color: #1c1c1c;
  color: white;
  padding: 20px;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  max-width: 400px;
  color: black;
  margin-top: 4%;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  color: #ffa500;
  font-size: 18px;
  margin-bottom: 20px;
`;

const Logo = styled.div`
  color: #ffa500;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  font-size: 16px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-bottom: 20px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const Button = styled.button`
  background-color: #ffa500;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  cursor: pointer;
`;

const PoweredBy = styled.p`
  font-size: 12px;
  color: #666;
`;

const ContactSection = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const ContactTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ContactText = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
`;

const ContactButton = styled(Button)`
  max-width: 200px;
`;

const Sell2 = () => {
  return (
    <>
      <Navbar />
      <PageContainer>
        <Card>
          <Title>Login To Moon Pay</Title>
          <Logo>LOGO</Logo>
          <Subtitle>Checkout with Moon Pay</Subtitle>
          <form>
            <label>What is your email address?</label>
            <Input type="email" placeholder="Enter your mail" />
            <CheckboxLabel>
              <Checkbox type="checkbox" />
              I have read and agree to Moon Pay's Terms Of Services and privacy policy.
            </CheckboxLabel>
            <Link to='/Sell3'>
              <Button>Proceed - Buy ACH →</Button>
            </Link>
          </form>
          <PoweredBy>Powered by Moon Pay</PoweredBy>
        </Card>
<HomeContact/>
      </PageContainer>
      <Footer />
    </>
  );
};

export default Sell2;

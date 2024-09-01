import React from 'react';
import Footer from './Footer';
import HomeContact from './HomeContact';
import Navbar from './Navbar';
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #121212;
  min-height: 100vh;
  padding: 20px;
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
            <Title>Coming Soon!!</Title>
        </Container>
        <HomeContact />
        <Footer />
        </>
    )
}

export default Refer
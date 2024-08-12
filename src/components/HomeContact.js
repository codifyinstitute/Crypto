import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  /* background-color: #1a1a1a; */
  color: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const MainText = styled.h2`
  font-size: 2rem;
  margin: 0;
  max-width: 60%;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    max-width: 100%;
  }
`;

const SubText = styled.p`
  font-size: 0.9rem;
  margin: 0;
  max-width: 80%;
  opacity: 0.7;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    max-width: 100%;
  }
`;

const Button = styled.button`
  background-color: #ffa500;
  color: black;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  align-self: flex-end;
  margin-top: -2.5rem;

  @media (max-width: 768px) {
    align-self: flex-start;
    margin-top: 1rem;
  }
`;

const ContactSection = () => {
  return (
    <Container>
      <MainText>
        Contact us today for more information and the best option for your project.
      </MainText>
      <SubText>
        Your dream property is just a click away. Whether you're looking for a new home, a strategic investment, or expert real estate advice, Estatum is here to
      </SubText>
      <Button>Contact Us</Button>
    </Container>
  );
};

export default ContactSection;
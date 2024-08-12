import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Marquee from 'react-fast-marquee';
import WorldMap from './WorldMap';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: #000;
    color: #fff;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2.5em;
  span {
    color: #ffa500;
  }
`;

const Description = styled.p`
  margin-bottom: 20px;
`;

const TalkButton = styled.button`
  background-color: #ffa500;
  color: #000;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  margin: 20px ;
  position: relative;

  @media (max-width: 768px) {
width: 80%;
  }
  @media (max-width: 430px) {
width: 90%;
height: 500px;
overflow: scroll;
  }
`;

const TooltipContainer = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  pointer-events: none;
  z-index: 1000;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StatBox = styled.div`
  background-color: #222;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  flex: 1;
  margin: 0 10px;
  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

const PaymentMethods = styled.div`
  margin-top: 20px;
`;

const PaymentLogo = styled.img`
  height: 30px;
  margin: 0 10px;
`;

const App = () => {
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>Peerless <span>global</span> coverage</Title>
        <Description>
          Alchemy Pay supports fiat-crypto purchases from 173 countries, using methods such as Visa, Mastercard, regional
          mobile wallets, and domestic transfers. Comprehensive coverage in Europe, Northern & Latin America, and Southeast
          Asia, with a focus on access to emerging markets.
        </Description>
        <TalkButton>Talk to us</TalkButton>
        <MapContainer onMouseMove={handleMouseMove}>
          <WorldMap setTooltipContent={setTooltipContent} />
          {tooltipContent && (
            <TooltipContainer x={tooltipPosition.x} y={tooltipPosition.y}>
              {tooltipContent}
            </TooltipContainer>
          )}
        </MapContainer>
        <StatsContainer>
          <StatBox>
            <h3>170+</h3>
            <p>Supported countries</p>
          </StatBox>
          <StatBox>
            <h3>50+</h3>
            <p>Fiat currencies</p>
          </StatBox>
          <StatBox>
            <h3>300+</h3>
            <p>Fiat payment channels</p>
          </StatBox>
          <StatBox>
            <h3>ALL</h3>
            <p>Cryptocurrencies supported</p>
          </StatBox>
        </StatsContainer>
        <PaymentMethods>
          <Marquee gradient={false} speed={50}>
            {/* Replace with actual logo URLs */}
            <PaymentLogo src="path/to/visa-logo.png" alt="Visa" />
            <PaymentLogo src="path/to/mastercard-logo.png" alt="Mastercard" />
            {/* Add more payment logos here */}
          </Marquee>
        </PaymentMethods>
      </Container>
    </>
  );
};

export default App;
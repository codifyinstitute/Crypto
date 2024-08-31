import React from 'react';
import styled from 'styled-components';
import image1 from '../assets/image1.png'
import image2 from '../assets/image2.png'
import image3 from '../assets/image3.png'
import image4 from '../assets/image4.png'
import image5 from '../assets/exchange5.png'
import image6 from '../assets/image6.png'
import image7 from '../assets/image7.png'
import image8 from '../assets/image8.png'
import image9 from '../assets/image9.png'
import image10 from '../assets/image10.png'
import image11 from '../assets/image11.png'
import image12 from '../assets/image12.png'
import image13 from '../assets/image13.png'
import image14 from '../assets/image14.png'
import image15 from '../assets/image15.png'
import image16 from '../assets/image16.png'
import image17 from '../assets/image17.png'
import image18 from '../assets/image18.png'
import image19 from '../assets/image19.png'
import image20 from '../assets/image20.png'


const logos = [
  { name: 'OKX', url:image1, link: '#' },
  { name: 'Bitget', url: image2, link: '#' },
  { name: 'NEAR', url: image3, link: '#' },
  { name: 'Polygon', url: image4, link: '#' },
  { name: 'Arbitrum', url: image5, link: '#' },
  { name: 'ChainUP', url: image6, link: '#' },
  { name: 'Sui', url: image7, link: '#' },
  { name: 'Token Pocket', url: image8, link: '#' },
  { name: 'Bitget Wallet', url: image9, link: '#' },
  { name: 'Bitrue', url: image10, link: '#' },
  { name: 'CELO', url: image11, link: '#' },
  { name: 'Pionex', url: image12, link: '#' },
  { name: 'DODO', url: image13, link: '#' },
  { name: 'BingX', url: image14, link: '#' },
  { name: 'LBANK', url: image15, link: '#' },
  { name: 'MEXC', url: image16, link: '#' },
  { name: 'CoinTR', url: image17, link: '#' },
  { name: 'SaaSGo', url: image18, link: '#' },
  { name: 'BEFI WALLET', url: image19, link: '#' },
  { name: 'Bit.Store', url: image20, link: '#' },
];

const Container = styled.div`
  color: #fff;
  padding: 2rem;
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
`;

const LogoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  justify-items: center;
  align-items: center;
  width: 60%;
  @media (max-width: 375px) {
    grid-template-columns: repeat(auto-fit, minmax(88px, 1fr));
  }
  @media (max-width: 430px) {
    grid-template-columns: repeat(auto-fit, minmax(88px, 1fr));
    width: 100%;
    gap:3rem;
    
  }
`;

const LogoWrapper = styled.a`
  background-color: #fff;
  border-radius: 8px;
  width: 150px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  @media (max-width: 430px) {
    
    width: 100px;
    height: 40px;
    
  }
`;

const Logo = styled.img`
  width: 175px;
  height: 100px;
  /* object-fit: contain; */
  /* padding: 5px; // Add some padding to prevent the image from touching the edges */
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
`;

const Button = styled.button`
  background-color: ${props => props.primary ? '#FFA500' : 'transparent'};
  color: #fff;
  border: 1px solid ${props => props.primary ? '#FFA500' : '#fff'};
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  cursor: pointer;
  border-radius: 4px;
`;

const Web3Projects = () => {
  return (
    <Container>
      <Title>
        Powering the leading <span style={{ color: '#FFA500' }}>Web3 projects</span>
      </Title>
      <LogoGrid>
        {logos.map((logo, index) => (
          <LogoWrapper key={index} href={logo.link} target="_blank" rel="noopener noreferrer">
            <Logo src={logo.url} alt={logo.name} />
          </LogoWrapper>
        ))}
      </LogoGrid>
      <ButtonContainer>
        <Button primary>See list of partners</Button>
        <Button>Talk to us</Button>
      </ButtonContainer>
    </Container>
  );
};

export default Web3Projects;
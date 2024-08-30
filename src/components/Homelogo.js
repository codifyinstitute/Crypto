import React from 'react';
import styled from 'styled-components';
import image1 from '../assets/image1.png'
import image2 from '../assets/image2.png'

const logos = [
  { name: 'OKX', url:image1, link: '#' },
  { name: 'Bitget', url: image2, link: '#' },
  { name: 'NEAR', url: 'path_to_near_logo.png', link: '#' },
  { name: 'Polygon', url: 'path_to_polygon_logo.png', link: '#' },
  { name: 'Arbitrum', url: 'path_to_arbitrum_logo.png', link: '#' },
  { name: 'ChainUP', url: 'path_to_chainup_logo.png', link: '#' },
  { name: 'Sui', url: 'path_to_sui_logo.png', link: '#' },
  { name: 'Token Pocket', url: 'path_to_tokenpocket_logo.png', link: '#' },
  { name: 'Bitget Wallet', url: 'path_to_bitget_wallet_logo.png', link: '#' },
  { name: 'Bitrue', url: 'path_to_bitrue_logo.png', link: '#' },
  { name: 'CELO', url: 'path_to_celo_logo.png', link: '#' },
  { name: 'Pionex', url: 'path_to_pionex_logo.png', link: '#' },
  { name: 'DODO', url: 'path_to_dodo_logo.png', link: '#' },
  { name: 'BingX', url: 'path_to_bingx_logo.png', link: '#' },
  { name: 'LBANK', url: 'path_to_lbank_logo.png', link: '#' },
  { name: 'MEXC', url: 'path_to_mexc_logo.png', link: '#' },
  { name: 'CoinTR', url: 'path_to_cointr_logo.png', link: '#' },
  { name: 'SaaSGo', url: 'path_to_saasgo_logo.png', link: '#' },
  { name: 'BEFI WALLET', url: 'path_to_befi_wallet_logo.png', link: '#' },
  { name: 'Bit.Store', url: 'path_to_bitstore_logo.png', link: '#' },
];

const Container = styled.div`
  color: #fff;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3;
  margin-bottom: 2rem;
`;

const LogoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  justify-items: center;
  align-items: center;
  @media (max-width: 375px) {
    grid-template-columns: repeat(auto-fit, minmax(88px, 1fr));
  }
`;

const LogoWrapper = styled.a`
  background-color: #fff;
  border-radius: 8px;
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 5px; // Add some padding to prevent the image from touching the edges
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
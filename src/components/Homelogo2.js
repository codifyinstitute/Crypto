import React from 'react';
import styled from 'styled-components';

const logos = [
  { name: 'OKX', url: 'path_to_okx_logo.png', link: '#' },
  { name: 'Bitget', url: 'path_to_bitget_logo.png', link: '#' },
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
 
];

const Container = styled.div`
  color: #fff;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
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
  padding: 0.5rem;
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;

const Logo = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
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
        Unleash limitless trades with our <span style={{ color: '#FFA500' }}>trusted <br></br> liquidity from top exchanges</span>
      </Title>
      <LogoGrid>
        {logos.map((logo, index) => (
          <LogoWrapper key={index} href={logo.link} target="_blank" rel="noopener noreferrer">
            <Logo src={logo.url} alt={logo.name} />
          </LogoWrapper>
        ))}
      </LogoGrid>
    
    </Container>
  );
};

export default Web3Projects;
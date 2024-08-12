import React from 'react';
import styled from 'styled-components';

const logos = [
  { name: 'OKX', url: 'path_to_okx_logo.png' },
  { name: 'Bitget', url: 'path_to_bitget_logo.png' },
  { name: 'NEAR', url: 'path_to_near_logo.png' },
  { name: 'Polygon', url: 'path_to_polygon_logo.png' },
  { name: 'Arbitrum', url: 'path_to_arbitrum_logo.png' },
  { name: 'ChainUP', url: 'path_to_chainup_logo.png' },
  { name: 'Sui', url: 'path_to_sui_logo.png' },
  { name: 'Token Pocket', url: 'path_to_tokenpocket_logo.png' },
  { name: 'Bitget Wallet', url: 'path_to_bitget_wallet_logo.png' },
  { name: 'Bitrue', url: 'path_to_bitrue_logo.png' },
  { name: 'CELO', url: 'path_to_celo_logo.png' },
  { name: 'Pionex', url: 'path_to_pionex_logo.png' },
  { name: 'DODO', url: 'path_to_dodo_logo.png' },
  { name: 'BingX', url: 'path_to_bingx_logo.png' },
  { name: 'LBANK', url: 'path_to_lbank_logo.png' },
  { name: 'MEXC', url: 'path_to_mexc_logo.png' },
  { name: 'CoinTR', url: 'path_to_cointr_logo.png' },
  { name: 'SaaSGo', url: 'path_to_saasgo_logo.png' },
  { name: 'BEFI WALLET', url: 'path_to_befi_wallet_logo.png' },
  { name: 'Bit.Store', url: 'path_to_bitstore_logo.png' },
];

const Container = styled.div`
  /* background-color: #000; */
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
`;

const LogoWrapper = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 0.5rem;
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
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
        Powering the leading <span style={{ color: '#FFA500' }}>Web3 projects</span>
      </Title>
      <LogoGrid>
        {logos.map((logo, index) => (
          <LogoWrapper key={index}>
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
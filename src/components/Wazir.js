import React from 'react';
import styled from 'styled-components';
import { Bitcoin } from 'lucide-react';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: 1rem;
  width: 80%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled.div`
  background-color: black;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;;
  border: 1px #1e1e1e solid;

  @media (max-width: 430px) {
    width: fit-content;
  }
`;

const CoinIcon = styled.div`
  background-color: #e6f7ff;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 0.5rem;
  width: 70%;
`;

const ExchangeName = styled.div`
  background-color: #ffa500;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  position: relative;
  top: -20px;
  @media (max-width: 430px) {
    font-size: 0.8rem;
  }
`;

const Price = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
`;

const SubText = styled.div`
  font-size: 0.8rem;
  color: #888;
`;

const MinMaxPrice = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 0.5rem;
  background-color: #2a2a2a;
  border-radius: 20px;
`;

const PriceInfo = styled.div`

  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.8rem;
  color: #aaa;
`;

const CryptoPriceCard = ({ exchange, avgPrice, usdtPrice, minPrice }) => (
  <Card>
    <CoinIcon>
      <Bitcoin size={48} color="#ffd700" />
    </CoinIcon>
    <ExchangeName>{exchange}</ExchangeName>
    <Price>Avg {avgPrice} ₹</Price>
    <SubText>1 USDT = {usdtPrice}</SubText>
    <MinMaxPrice>
      <PriceInfo>Min {minPrice}$</PriceInfo>
      <PriceInfo>Min {minPrice}$</PriceInfo>
    </MinMaxPrice>
  </Card>
);

const CryptoPriceGrid = () => (
  <Grid>
    <CryptoPriceCard
      exchange="wazirx"
      avgPrice="95.26"
      usdtPrice="₹95.26"
      minPrice="94.5"
    />
    <CryptoPriceCard
      exchange="binance"
      avgPrice="95.30"
      usdtPrice="₹95.30"
      minPrice="94.6"
    />
    <CryptoPriceCard
      exchange="coinbase"
      avgPrice="95.28"
      usdtPrice="₹95.28"
      minPrice="94.4"
    />
    <CryptoPriceCard
      exchange="kraken"
      avgPrice="95.32"
      usdtPrice="₹95.32"
      minPrice="94.7"
    />
  </Grid>
);

export default CryptoPriceGrid;
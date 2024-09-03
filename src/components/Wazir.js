import React, { useEffect, useState } from 'react';
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
    width: 95%;
    justify-items: center;

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
    width: 100%;
    justify-content: center;
    align-items: center;
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
  margin: 5px;
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
const Title = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
  font-size: 3rem;
  color: white;
margin-top: 2%;
  @media (max-width: 480px) {
    font-size: 1.87rem;
    text-align: center;
    width: auto;
    /* padding-right: 15px; */
  }`;
const CryptoPriceCard = ({ exchange, avgPrice, usdtPrice, minPrice,maxPrice }) => (
  <Card>
    <CoinIcon>
      <Bitcoin size={48} color="#ffd700" />
    </CoinIcon>
    <ExchangeName>{exchange}</ExchangeName>
    <Price>Avg {avgPrice} ₹</Price>
    <SubText>1 USDT = {usdtPrice}</SubText>
    <MinMaxPrice>
      <PriceInfo>Min {minPrice}$</PriceInfo>
      <PriceInfo>Max {maxPrice}$</PriceInfo>
    </MinMaxPrice>
  </Card>
);

const CryptoPriceGrid = () => {
  const [data, setData] = useState({})

  const fetchTransactionFee = async () => {
    try {
      const response = await fetch('https://crypto-anl6.onrender.com/static/get/66c445a358802d46d5d70dd4');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setData(data)
      console.log(data)
      
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchTransactionFee();
  }, []);

  return(
  <>
  <Title>Prices onother Exchanges</Title>
  <Grid>
  
    <CryptoPriceCard
      exchange="Binance"
      avgPrice={data?.Binance?.Average || null}
      usdtPrice={data?.Binance?.Average || null}
      minPrice={data?.Binance?.Min || null}
      maxPrice = {data?.Binance?.Max || null}
    />
    <CryptoPriceCard
      exchange="Coinbase"
      avgPrice={data?.Coinbase?.Average || null}
      usdtPrice={data?.Coinbase?.Average || null}
      minPrice={data?.Coinbase?.Min || null}
      maxPrice = {data?.Coinbase?.Max || null}
    />
    <CryptoPriceCard
      exchange="Kraken"
      avgPrice={data?.Kraken?.Average || null}
      usdtPrice={data?.Kraken?.Average || null}
      minPrice={data?.Kraken?.Min || null}
      maxPrice = {data?.Kraken?.Max || null}
    />
    <CryptoPriceCard
      exchange="Wazirx"
      avgPrice={data?.Wazirx?.Average || null}
      usdtPrice={data?.Wazirx?.Average || null}
      minPrice={data?.Wazirx?.Min || null}
      maxPrice = {data?.Wazirx?.Max || null}
    />
  </Grid>
  </>
)};

export default CryptoPriceGrid;
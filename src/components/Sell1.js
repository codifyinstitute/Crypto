import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate ,useLocation} from 'react-router-dom';
import axios from 'axios';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ind from './../assets/ind.jpeg'
import usdtt from './../assets/usdtt.jpeg'

import Footer from './Footer';
import HomeContact from './HomeContact';
import Navbar from './Navbar';


const TradingEnvironment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background-color: #0a0a0a;
  color: #f0f0f0;
  font-family: 'Roboto', sans-serif;
 
`;

const TradingInterface = styled.div`
    background-color: #1a1a1a;
    color: #f0f0f0;
    padding: 2rem;
    border-radius: 1rem;
    width: 480px;
    height: 520px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 5%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    @media (max-width: 480px) {
        padding: 1rem;
        width: auto;
        height: auto;
    }
`;







const ExchangeCard = styled.div`
    background-color: white;
    color: white;
    padding: 2rem;
    border-radius: 1rem;
    width: 480px;
    height: 520px;
    max-width: 100%;
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 480px) {
        padding: 1rem;
        width: auto;
        height: auto;
    }
`;

const InputContainer = styled.div`
    margin-bottom: 1rem;
    position: relative;
`;

const InputWrapper = styled.div`
    display: flex;
    background-color: white;
    border-radius: 0.5rem;
    overflow: hidden;
    border: 1px solid #ccc;
`;

const Input = styled.input`
    flex: 1;
    padding: 1rem;
    border: none;
    background-color: transparent;
    color: black;
    font-size: 1.2rem;
    width: 20%;

    &:focus {
        outline: none;
    }
`;

const CurrencyToggle = styled.div`
    padding: 1rem;
    background-color: #f0f0f0;
    color: black;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    min-width: 80px;
    justify-content: space-between;
`;

const ArrowIcon = styled.span`
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const DropdownList = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 0.5rem 0.5rem;
    max-height: 200px;
    overflow-y: auto;
    z-index: 10;
`;

const DropdownItem = styled.div`
    padding: 0.75rem 1rem;
    color: black;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
        background-color: #f0f0f0;
    }

    svg {
        margin-right: 0.5rem;
    }
`;

const DetailsContainer = styled.div`
    background-color: white;
    border-radius: 0.5rem;
    margin-top: 1rem;
    border: 1px solid #ccc;
    color: white;
    overflow: hidden;
`;

const DetailsHeader = styled.div`
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f0f0f0;
    color: black;
    cursor: pointer;
`;

const DetailsContent = styled.div`
    padding: 1rem;
`;

const DetailRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
`;

const DetailLabel = styled.span`
    color: black;

    font-size: 0.9rem;
`;

const DetailValue = styled.span`
    color: black;
    font-size: 0.9rem;
`;

const ContinueButton = styled.button`
    width: 100%;
    padding: 1rem;
    background-color: orange;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    margin-top: 1rem;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #e69500;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const PolicyText = styled.p`
    color: #888;
    font-size: 0.8rem;
    text-align: center;
`;
const ActionButton = styled.button`
  background-color: #ffd700;
  color: #0a0a0a;
  padding: 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  width: 100%;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ffec8b;
  }
`;

const MarketDataPanel = styled(TradingInterface)`
  background: linear-gradient(113deg, rgba(42, 42, 42, 0.8) -0.92%, rgba(255, 215, 0, 0.2) 103.89%);
  color: #f0f0f0;
  margin-bottom: 2%;
`;

const RefreshIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  font-size: 0.8rem;
`;

const RefreshTrigger = styled.button`
  background: none;
  border: none;
  color: #ffd700;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 2%;
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(180deg);
  }
`;

const ExchangeRate = styled.h1`
  font-size: 3rem;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BaseIndicator = styled.span`
  font-size: 0.8rem;
  background-color: #ffd700;
  color: #0a0a0a;
  padding: 2px 5px;
  border-radius: 3px;
  margin-left: 10px;
`;

const RateDescription = styled.p`
  font-size: 1rem;
  margin: 5px 0 20px;
  text-align: center;
`;

const TierTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: white;
  color: black;
  text-align: center;
  border-radius: 15px;
  overflow: hidden;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #3a3a3a;
`;

const TableCell = styled.td`
  padding: 10px 0;
  font-size: 0.9rem;
`;

const HeaderCell = styled(TableCell)`
  background-color: orange;
  color: white;
  font-weight: bold;
`;



const PolicyLink = styled.a`
  display: block;
  text-align: center;
  color: #ffd700;
  text-decoration: none;
  margin-top: 10px;
  font-size: 0.8rem;
  transition: color 0.3s ease;

  &:hover {
    color: #ffec8b;
  }
`;

const DigitalAssetExchange = () => {
  
  const location = useLocation();
  const [availableAssets, setAvailableAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [offerAmount, setOfferAmount] = useState(location.state?.amount || '');
  const [receiveEstimate, setReceiveEstimate] = useState('');
  const [refreshCountdown, setRefreshCountdown] = useState(30);

  useEffect(() => {
    const fetchAssetData = async () => {
      try {
        const response = await fetch('https://crypto-anl6.onrender.com/currencies/all');
        const data = await response.json();
        setAvailableAssets(data);
        const initialAsset = data.find(c => c.Symbol === location.state?.symbol);
        setSelectedAsset(initialAsset);
        if (initialAsset && offerAmount) {
          setReceiveEstimate(offerAmount * initialAsset.Rate);
        }
      } catch (error) {
        console.error('Error fetching asset data:', error);
      }
    };

    fetchAssetData();
  }, [offerAmount, location.state]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshCountdown(prevCount => {
        if (prevCount === 1) {
          // Refresh logic here (e.g., refetch exchange rates)
          return 30;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOfferAmountChange = (e) => {
    const value = e.target.value;
    setOfferAmount(value);

    if (selectedAsset) {
      setReceiveEstimate(value * selectedAsset.Rate);
    }
  };

  const handleAssetSelection = (e) => {
    const chosenSymbol = e.target.value;
    const asset = availableAssets.find(c => c.Symbol === chosenSymbol);
    setSelectedAsset(asset);
    if (asset && offerAmount) {
      setReceiveEstimate(offerAmount * asset.Rate);
    }
  };

  const [usdt, setUsdt] = useState(1);
    const [isValid, setIsValid] = useState(true);
    const [currencies, setCurrencies] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://crypto-anl6.onrender.com/currencies/all')
            .then(response => {
                setCurrencies(response.data);
                setSelectedCurrency(response.data[0] || null);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching currencies:', error);
                setLoading(false);
            });
    }, []);

    const handleUsdtChange = (e) => {
        const value = e.target.value;
        setUsdt(value);
        setIsValid(value && !isNaN(value) && Number(value) > 0);
    };

    const handleCurrencySelect = (currency) => {
        setSelectedCurrency(currency);
        setIsDropdownOpen(false);
    };

    const inr = selectedCurrency ? usdt * selectedCurrency.Rate : 0;

    const handleSellNowClick = () => {
        if (isValid && selectedCurrency) {
            const token = localStorage.getItem('token');
            if (token) {
                navigate('/Sell1', { state: { amount: usdt, symbol: selectedCurrency.Symbol } });
            } else {
                navigate('/Sell2');
            }
        }
    };

    const toggleDetailsExpanded = () => {
        setIsDetailsExpanded(!isDetailsExpanded);
    };

  return (
    <>

<Navbar/>
      <TradingEnvironment>
      <ExchangeCard>
      <InputContainer>
          <InputWrapper>
              <Input
                  type="number"
                  value={usdt}
                  onChange={handleUsdtChange}
                  placeholder="500"
              />
              <CurrencyToggle onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img src={usdtt} alt="USDT" style={{ width: '16px', height: '16px' }} />
                  {selectedCurrency ? selectedCurrency.Symbol : 'Select'}
                  <ArrowIcon isOpen={isDropdownOpen}>▼</ArrowIcon>
              </CurrencyToggle>
          </InputWrapper>
          {isDropdownOpen && (
              <DropdownList>
                  {currencies.map(currency => (
                      <DropdownItem
                          key={currency._id}
                          onClick={() => handleCurrencySelect(currency)}
                      >
                          <img src={usdtt} alt="USDT" style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
                          {currency.Symbol}
                      </DropdownItem>
                  ))}
              </DropdownList>
          )}
      </InputContainer>
      <InputContainer>
          <InputWrapper>
              <Input
                  type="text"
                  value={inr.toFixed(5)}
                  readOnly
              />
              <CurrencyToggle disabled>
                  <img src={ind} alt="India flag" style={{ width: '16px', height: '16px' }} />
                  INR
              </CurrencyToggle>
          </InputWrapper>
      </InputContainer>
      <DetailsContainer>
          <DetailsHeader onClick={toggleDetailsExpanded}>
              <span>Transaction Details</span>
              {isDetailsExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </DetailsHeader>
          {isDetailsExpanded && (
              <DetailsContent>
                  <DetailRow>
                      <DetailLabel>You get {inr.toFixed(5)} INR for A${usdt}</DetailLabel>
                  </DetailRow>
                  <DetailRow>
                      <DetailLabel>{inr.toFixed(5)} INR @ A${selectedCurrency ? selectedCurrency.Rate : 'N/A'}</DetailLabel>
                      <DetailValue>A${(usdt * (selectedCurrency ? selectedCurrency.Rate : 1)).toFixed(2)}</DetailValue>
                  </DetailRow>
                  <DetailRow>
                      <DetailLabel>Network fee</DetailLabel>
                      <DetailValue>A$9.40</DetailValue>
                  </DetailRow>
                  <DetailRow>
                      <DetailLabel>Processing fee</DetailLabel>
                      <DetailValue>A$21.13</DetailValue>
                  </DetailRow>
              </DetailsContent>
          )}
      </DetailsContainer>

      <ContinueButton onClick={handleSellNowClick} disabled={!isValid}>
          Continue
          <ArrowIcon>→</ArrowIcon>
      </ContinueButton>
      <PolicyText>By continuing, you agree to our cookie policy</PolicyText>
  </ExchangeCard>

        {selectedAsset && (
          <MarketDataPanel>
            <RefreshIndicator>
              Auto-refresh in {refreshCountdown}s
              <RefreshTrigger>↻</RefreshTrigger>
            </RefreshIndicator>
            <ExchangeRate>
              {selectedAsset.Rate}
              <BaseIndicator>Base</BaseIndicator>
            </ExchangeRate>
            <RateDescription>1 {selectedAsset.Symbol} = {selectedAsset.Rate} INR</RateDescription>
            <TierTable>
              <tbody>
                <TableRow>
                  <HeaderCell>Volume ($)</HeaderCell>
                  <HeaderCell>Rate (INR)</HeaderCell>
                </TableRow>
                <TableRow>
                  <TableCell>1075.27 - 2150.53</TableCell>
                  <TableCell>{selectedAsset.Rate + 0.25}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2150.54 - 3225.80</TableCell>
                  <TableCell>{selectedAsset.Rate - 0.5}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>3225.81+</TableCell>
                  <TableCell>{selectedAsset.Rate + 1}</TableCell>
                </TableRow>
              </tbody>
            </TierTable>
            <PolicyLink href="#">Learn about our tiered pricing policy</PolicyLink>
          </MarketDataPanel>
        )}
        
      </TradingEnvironment>
<HomeContact/>
      <Footer />
    </>
  );
};

export default DigitalAssetExchange;
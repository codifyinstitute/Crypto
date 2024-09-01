import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ChevronDown, ChevronUp, Info, X } from 'lucide-react';

import Footer from './Footer';
import HomeContact from './HomeContact';
import Navbar from './Navbar';

const TradingEnvironment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  font-family: 'Roboto', sans-serif;
`;

const ExchangeCard = styled.div`
  background-color: white;
  color: #333333;
  padding: 1.5rem;
  border-radius: 0.5rem;
  width: 380px;
  height: 580px;
  max-width: 100%;
  margin-top: 10%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;

const Tab = styled.div`
  padding: 0.5rem 0;
  margin-right: 1rem;
  color: ${props => props.active ? '#0052FF' : '#888'};
  border-bottom: 2px solid ${props => props.active ? '#0052FF' : 'transparent'};
  cursor: pointer;
`;

const InputLabel = styled.div`
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 0.5rem;
`;

const InputContainer = styled.div`
  margin-bottom: 1rem;
  position: relative;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  border: 1px solid #e0e0e0;
  padding: 0.5rem 1rem;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background-color: transparent;
  color: #333;
  font-size: 1.5rem;
  font-weight: bold;
  width: 20%;

  &:focus {
    outline: none;
  }
`;

const CurrencyToggle = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const UpdateText = styled.div`
  font-size: 0.8rem;
  color: #888;
  text-align: right;
  margin-top: 0.5rem;
`;

const OrderSummary = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
`;

const OrderTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  cursor: pointer;
`;

const OrderDetail = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 0.5rem;
`;

const ProceedButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #0052ff;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0039cb;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const PaymentMethods = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 0.5rem;
`;

const PaymentIcon = styled.div`
  width: 40px;
  height: 24px;
  background-color: #e0e0e0;
  border-radius: 4px;
`;

const PoweredBy = styled.div`
  font-size: 0.8rem;
  color: #888;
  text-align: center;
  margin-top: 0.5rem;
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: -110px;
  left: -25px;
  right: 0;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 380px;
  height: 580px;
`;

const DropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
`;

const DropdownTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const SearchInput = styled.input`
  width: calc(100% - 2rem);
  padding: 0.75rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;
  margin: 1rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #0052FF;
  }
`;

const CurrencyList = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const CurrencyItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const CurrencyIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 0.75rem;
`;

const CurrencyInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CurrencySymbol = styled.span`
  font-weight: 600;
`;

const CurrencyName = styled.span`
  font-size: 0.8rem;
  color: #888;
`;
const PriceContainer = styled.div`
  background-color: #27201c;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  color: #fff;
  font-family: Arial, sans-serif;
  text-align: center;
  position: relative;
  margin-top: 4%;
`;

const TimerSection = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RefreshButton = styled.div`
  cursor: pointer;
  font-size: 20px;
`;

const PriceValue = styled.div`
  font-size: 60px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const PriceTag = styled.span`
  background-color: #e83d2f;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
`;

const ConversionText = styled.div`
  font-size: 14px;
  margin-bottom: 20px;
`;

const PricingTable = styled.div`
  background-color: #f7a71e;
  border-radius: 10px;
  padding: 10px;
  text-align: left;
  margin-top: 10px;
`;

const PricingRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  border-top: 1px solid #fff;

  &:first-child {
    border-top: none;
  }
`;

const PricingCell = styled.div`
  font-size: 14px;
`;

const PolicyDescription = styled.div`
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
`;
const Sell1 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [usdt, setUsdt] = useState(location.state?.amount || '25167.79');
  const [isValid, setIsValid] = useState(true);
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(true);
  const [transactionFee, setTransactionFee] = useState(475.76);
  const [networkFee, setNetworkFee] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 30));
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const handleRefresh = () => {
    setTimer(30);
    // Implement your refresh logic here
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [currenciesResponse, feesResponse] = await Promise.all([
          axios.get('https://crypto-anl6.onrender.com/currencies/all'),
          fetch('https://crypto-anl6.onrender.com/static/get/66c445a358802d46d5d70dd4')
        ]);

        setCurrencies(currenciesResponse.data);
        setSelectedCurrency(currenciesResponse.data.find(c => c.Symbol === 'ACH') || currenciesResponse.data[0]);

        if (feesResponse.ok) {
          const feesData = await feesResponse.json();
          setTransactionFee(feesData.TransactionFee);
          setNetworkFee(feesData.NetworkFee);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
      localStorage.setItem('transactionDetails', JSON.stringify({
        amountPay: usdt,
        symbol: selectedCurrency.Symbol
      }));
      const token = localStorage.getItem('token');
      if (token) {
        navigate('/Sell3', { state: { amount: usdt, symbol: selectedCurrency.Symbol } });
      } else {
        navigate('/Sell2');
      }
    }
  };

  const toggleDetailsExpanded = () => {
    setIsDetailsExpanded(!isDetailsExpanded);
  };

  const filteredCurrencies = currencies.filter(currency =>
    currency.Symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    currency.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <TradingEnvironment>
        <ExchangeCard>
          <TabContainer>
            <Tab>Buy Crypto</Tab>
            <Tab active>Sell Crypto</Tab>
          </TabContainer>
          
          <InputLabel>You sell</InputLabel>
          <InputContainer>
            <InputWrapper>
              <Input
                type="text"
                value={usdt}
                onChange={handleUsdtChange}
              />
              <CurrencyToggle onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                {selectedCurrency && (
                  <CurrencyIcon src={`/path/to/${selectedCurrency.Symbol.toLowerCase()}.png`} alt={selectedCurrency.Symbol} />
                )}
                {selectedCurrency ? selectedCurrency.Symbol : 'Select'}
                <ChevronDown size={16} />
              </CurrencyToggle>
            </InputWrapper>
            {isDropdownOpen && (
              <DropdownContainer>
                <DropdownHeader>
                  <DropdownTitle>Select crypto</DropdownTitle>
                  <CloseButton onClick={() => setIsDropdownOpen(false)}>
                    <X size={24} />
                  </CloseButton>
                </DropdownHeader>
                <SearchInput
                  type="text"
                  placeholder="Search here..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <CurrencyList>
                  {filteredCurrencies.map(currency => (
                    <CurrencyItem
                      key={currency._id}
                      onClick={() => handleCurrencySelect(currency)}
                    >
                      <CurrencyIcon src={`/path/to/${currency.Symbol.toLowerCase()}.png`} alt={currency.Symbol} />
                      <CurrencyInfo>
                        <CurrencySymbol>{currency.Symbol}</CurrencySymbol>
                        <CurrencyName>{currency.Name}</CurrencyName>
                      </CurrencyInfo>
                    </CurrencyItem>
                  ))}
                </CurrencyList>
              </DropdownContainer>
            )}
          </InputContainer>
          
          <InputLabel>You receive (estimate) <Info size={14} /></InputLabel>
          <InputContainer>
            <InputWrapper>
              <Input
                type="text"
                value={inr.toFixed(2)}
                readOnly
              />
              <CurrencyToggle>
                <CurrencyIcon as="div">
                  <div style={{ width: '100%', height: '50%', background: '#FF9933' }}></div>
                  <div style={{ width: '100%', height: '50%', background: '#138808' }}></div>
                </CurrencyIcon>
                INR
                <ChevronDown size={16} />
              </CurrencyToggle>
            </InputWrapper>
          </InputContainer>
          
          <UpdateText>Updating rates</UpdateText>
          
          <OrderSummary>
            <OrderTitle onClick={toggleDetailsExpanded}>
              Your order
              {isDetailsExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </OrderTitle>
            {isDetailsExpanded && (
              <>
                <OrderDetail>
                  <span>1 {selectedCurrency?.Symbol}</span>
                  <span>≈ {selectedCurrency?.Rate.toFixed(2)} INR</span>
                </OrderDetail>
                <OrderDetail>
                  <span>Processing fee <Info size={14} /></span>
                  <span>as low as Rs {transactionFee}</span>
                </OrderDetail>
              </>
            )}
          </OrderSummary>
          
          <ProceedButton onClick={handleSellNowClick} disabled={!isValid}>
            Proceed · Sell {selectedCurrency?.Symbol} →
          </ProceedButton>
          
          <PaymentMethods>
            <PaymentIcon />
            <PaymentIcon />
            <PaymentIcon />
            <PaymentIcon />
          </PaymentMethods>
          
          <PoweredBy>
            Powered by Alchemy Pay
          </PoweredBy>
        </ExchangeCard>

        <PriceContainer>
      <TimerSection>
        <span>Automatic refresh after {timer}s</span>
        <RefreshButton onClick={handleRefresh}>🔄</RefreshButton>
      </TimerSection>
      <PriceValue>
        93 <PriceTag>Base</PriceTag>
      </PriceValue>
      <ConversionText>1USDT=93</ConversionText>
      <PricingTable>
        <PricingRow>
          <PricingCell>≥ 1075.27 and &lt; 2150.54</PricingCell>
          <PricingCell>93 + 0.25</PricingCell>
        </PricingRow>
        <PricingRow>
          <PricingCell>≥ 2150.54 and &lt; 3225.81</PricingCell>
          <PricingCell>93 + 0.5</PricingCell>
        </PricingRow>
        <PricingRow>
          <PricingCell>≥ 3225.81</PricingCell>
          <PricingCell>93 + 1</PricingCell>
        </PricingRow>
      </PricingTable>
      <PolicyDescription>What is tiered price policy?</PolicyDescription>
    </PriceContainer>
      </TradingEnvironment>
      <HomeContact />
      <Footer />
    </>
  );
};

export default Sell1;
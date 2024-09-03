import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ChevronDown, ChevronUp, Info, X } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import ind from "./../assets/ind.jpeg";
import usdtt from "./../assets/usdtt.jpeg";
import Footer from './Footer';
import HomeContact from './HomeContact';
import Navbar from './Navbar';
import payment from "./../assets/payment.png";
import { RefreshCw } from 'lucide-react';


const TradingEnvironment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color:black;
  font-family: 'Roboto', sans-serif;
`;

const ExchangeCard = styled.div`
  background-color: white;
  color: #333333;
  padding: 1.5rem;
  border-radius: 0.5rem;
  width: 380px;
  height: 610px;
  max-width: 100%;
  margin-top: 10%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;

const Tab = styled.div`
  padding: 0.5rem 0;
  margin-right: 1rem;
  color: orange;
  border-bottom: 2px solid orange;
  cursor: pointer;
  font-size: 18px;
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

 @media (max-width: 480px) {
  font-size: 1.2rem;

  } 
`;

const CurrencyToggle = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color:  #e1dcdc;
  /* padding: 9px; */
  color: black;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 16px;
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
  background-color: orange;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    color: rgb(227, 148, 0);
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
 width: 210px;
  height: 35px;
  background-color: white;
  border-radius: 4px;
  background-image: url(${payment});
  object-fit: contain;
  background-repeat: no-repeat;
  background-size: contain;
`;

const PoweredBy = styled.div`
  font-size: 0.8rem;
  color: #888;
  text-align: center;
  margin-top: 0.5rem;
`;
const AnimatedDropdownContainer = styled.div`
  position: absolute;
  top: -110px;
  left: -25px;
  right: 0;
  background-color: white;
  /* border: 1px solid #e0e0e0; */
  border-radius: 0.5rem;
  /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */
  z-index: 10;
  width: 380px;
  height: 610px;
  max-width: 115%;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-20px)'};
  transition: opacity 0.5s ease, visibility 0.5s ease, transform 0.5s ease;


  
  /* @media (max-width: 375px) {
    max-width: 100%;

  } */
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
    border-color: #0052ff;
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

  @media (max-width: 480px) {
    width: 16px;
    height: 16px;
  margin-right: 0.6rem;
  margin-left: 0.15rem;

  }

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





// ++++++++++++++++++++++++++++++++++++++++++++++++++++



const Container = styled.div`
  /* background-color: #2D2D2D; */

  background: linear-gradient(112.77deg, rgba(222, 209, 254, 0.2) -0.92%, rgba(247, 166, 0, 0.2) 103.89%);

  color: white;
  padding: 16px;
  border-radius: 8px;
  width: 450px;
  margin: 50px auto;
  font-family: Arial, sans-serif;
  
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const RefreshText = styled.p`
  font-size: 14px;
  color: white;
`;

const PriceDisplay = styled.div`
  text-align: center;
  margin-bottom: 16px;
`;

const Price = styled.span`
  font-size: 64px;
  font-weight: bold;
`;

const BaseLabel = styled.span`
  margin-left: 4px;
  font-size: 12px;
  background-color: #E53935;
  color: white;
  padding: 2px 4px;
  border-radius: 2px;
  vertical-align: super;
`;
const Rocks = styled.div`
  display: flex;
  flex-direction: column;

`;
const CurrencySymbols = styled.div`
  color: black;
  font-size: 12px;
  font-weight: 400;

`;

const Subtext = styled.p`
  text-align: center;
  margin-bottom: 16px;
  color: white;
  font-size: 14px;
`;
const Center = styled.div`
display: flex;
justify-content: center;
`


const TableContainer = styled.div`
  background-color: orange;
  border-radius: 10px;
  padding: 9px;
  width: 350px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0px 0px;
  border: 1px solid orange;
  tbody{
  background-color: white;
  border: 1px solid orange;
  
  }
`;

const TableHeader = styled.th`
  text-align: center;
  font-weight: normal;
  color: black;
  border: 1px solid orange;
  font-weight: 800;
    font-size: 17px;
    padding: 8px;

`;

const TableCell = styled.td`
  font-size: 14px;
  padding: 10px;
  color: black;
  border: 1px solid orange;
text-align: center;
`;

const TableFooter = styled.p`
  text-align: center;
  margin-top: 16px;
  font-size: 16px;
  color: white;
`;



const BackButton = styled.button`
  /* background-color: #FFA500; */
  background-color: transparent;
  color: #FFA500;
  border: none;
  /* padding: 8px 16px; */
  border-radius: 20px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  margin: 1rem;
  z-index: 1001;
  /* display: none; */
  width: fit-content;
  margin: 0px 5px 0px 0px;

  @media (max-width: 1024px) { // Show on tablet and mobile
    display: block;
  }

  @media (max-width: 430px) {
    font-size: 14px;
    top: 10px;
    left: 10px;
  }
`;
const Right = styled.div`
display: flex;
justify-content: left;
    width: 100%;

`



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
      <div>
        <TabContainer>
        <BackButton onClick={() => window.history.back()}> <ChevronLeft></ChevronLeft>
        </BackButton> <Tab active>Sell Crypto</Tab>
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
                <CurrencyIcon src={usdtt} alt={selectedCurrency.Symbol} />
              )}
              <Rocks>{selectedCurrency ? selectedCurrency.Name   : 'Select'}
              <CurrencySymbols>{selectedCurrency.Symbol}</CurrencySymbols></Rocks> 
              <ChevronDown size={16} />
            </CurrencyToggle>
          </InputWrapper>
          <AnimatedDropdownContainer isOpen={isDropdownOpen}>
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
                  <CurrencyIcon src={usdtt} alt={currency.Symbol} />
                  <CurrencyInfo>
                  <CurrencyName>{currency.Name}</CurrencyName>
                    <CurrencySymbol>{currency.Symbol}</CurrencySymbol>
        
                  </CurrencyInfo>
                </CurrencyItem>
              ))}
            </CurrencyList>
          </AnimatedDropdownContainer>
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
              <CurrencyIcon src={ind} />
              </CurrencyIcon>
              INR
            </CurrencyToggle>
          </InputWrapper>
        </InputContainer>

        <UpdateText>Updating rates</UpdateText>

        <OrderSummary>
          <OrderTitle onClick={toggleDetailsExpanded}>
           <b>Your order</b> 
            <div style={{ display: "flex" }}>
              {(inr.toFixed(2) === "0.00") ? null : <p>{usdt} <b>{selectedCurrency.Name} </b>to <b>{inr.toFixed(2)} INR </b></p>}
              {isDetailsExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </OrderTitle>
          {isDetailsExpanded && (
            <>
              <OrderDetail>
                <span>1 {selectedCurrency?.Name}</span>
                <span>≈ {selectedCurrency?.Rate.toFixed(2)} INR</span>
              </OrderDetail>
              <OrderDetail>
                <span>Processing fee <Info size={14} /></span>
                <span>as low as Rs {transactionFee}</span>
              </OrderDetail>
              <OrderDetail>
                <span>Network fee <Info size={14} /></span>
                <span>as low as Rs {networkFee}</span>
              </OrderDetail>
            </>
          )}
        </OrderSummary>
        </div>
        <div>
        <ProceedButton onClick={handleSellNowClick} disabled={!isValid}>
              Proceed · Sell {selectedCurrency?.Name}    <CurrencyIcon src={usdtt} alt={selectedCurrency?.Symbol} /> →
        </ProceedButton>

        <PaymentMethods>
          <PaymentIcon />
        </PaymentMethods>

        <PoweredBy>
          Powered by Alchemy Pay
        </PoweredBy>
        </div>
      </ExchangeCard>





        {/* <PriceContainer>
      <TimerSection>
        <span>Automatic refresh after {timer}s</span>
        <RefreshButton onClick={handleRefresh}>🔄</RefreshButton>
      </TimerSection>
      <PriceValue>
      {selectedCurrency?.Rate.toFixed(2)} <PriceTag>Base</PriceTag>
      </PriceValue>
      <ConversionText>1 {selectedCurrency?.Symbol} = {selectedCurrency?.Rate.toFixed(2)}</ConversionText>
      <PricingTable>
        <PricingRow>
          <PricingCell>≥ 1075.27 and &lt; 2150.54</PricingCell>
          <PricingCell>{selectedCurrency?.Rate.toFixed(2)} + 0.25</PricingCell>
        </PricingRow>
        <PricingRow>
          <PricingCell>≥ 2150.54 and &lt; 3225.81</PricingCell>
          <PricingCell>{selectedCurrency?.Rate.toFixed(2)} + 0.5</PricingCell>
        </PricingRow>
        <PricingRow>
          <PricingCell>≥ 3225.81</PricingCell>
          <PricingCell>{selectedCurrency?.Rate.toFixed(2)} + 1</PricingCell>
        </PricingRow>
      </PricingTable>
      <PolicyDescription>What is tiered price policy?</PolicyDescription>
    </PriceContainer> */}

<Container>
      <Header>
        <RefreshText>Automatic refresh after {timer}s</RefreshText>
        <RefreshCw size={20} color="white" />
      </Header>
      
      <PriceDisplay>
        <Price>93</Price>

      </PriceDisplay>
      
      <Subtext>1USDT = 93 INR</Subtext>
      <Center>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <TableHeader>Exchange(s)</TableHeader>
              <TableHeader align="right">Price()</TableHeader>
            </tr>
          </thead>
          <tbody>
            <tr>
              <TableCell>&gt;=1075.27 and&lt;2150.54</TableCell>
              <TableCell >93+0.25</TableCell>
            </tr>
            <tr>
              <TableCell>&gt;=2150.54 and&lt;3225.81</TableCell>
              <TableCell >93-0.5</TableCell>
            </tr>
            <tr>
              <TableCell>&gt;=3225.81</TableCell>
              <TableCell >93-1</TableCell>
            </tr>
          </tbody>
        </Table>
        <TableFooter>What is tiered price policy?</TableFooter>
      </TableContainer>
      </Center>
    </Container>



      </TradingEnvironment>
      <HomeContact />
      <Footer />
    </>
  );
};

export default Sell1;
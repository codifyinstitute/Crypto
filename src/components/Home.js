import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronDown, ChevronUp, ChevronLeft, Info, X, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import ind from "./../assets/ind.jpeg";
import usdtt from "./../assets/usdtt.png";
import payment from "./../assets/Frame 47.png";
import bg2 from "./../assets/bg2.jpg";
import logoM from "./../assets/logo2.png";
import mobbb from "./../assets/mobbb.jpg";
import Newcomp from './Newcomp';

const Home = () => {
  const [usdt, setUsdt] = useState(1);
  const [isValid, setIsValid] = useState(true);
  const [currencies, setCurrencies] = useState([]);
  const [transactionFee, setTransactionFee] = useState(0);
  const [networkFee, setNetworkFee] = useState(0);
  const [minAmount, setMinAmount] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const navigate = useNavigate();

  const fetchTransactionFee = async () => {
    try {
      const response = await fetch('https://api.moonpayx.com/static/get/66c445a358802d46d5d70dd4');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTransactionFee(data.TransactionFee);
      setNetworkFee(data.NetworkFee);
      setMinAmount(data.MinAmount);
      setUsdt(data.MinAmount)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactionFee();
  }, []);

  useEffect(() => {
    axios
      .get("https://api.moonpayx.com/currencies/all")
      .then((response) => {
        setCurrencies(response.data);
        setSelectedCurrency(response.data[0] || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching currencies:", error);
        setLoading(false);
      });
  }, []);

  const handleUsdtChange = (e) => {
    const value = e.target.value;
    setUsdt(value);
    const numericValue = Number(value);
    setIsValid(numericValue > 0 && numericValue >= minAmount);
  };


  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setIsDropdownOpen(false);
  };

  const inr = selectedCurrency ? usdt * selectedCurrency.Rate : 0;

  const handleSellNowClick = () => {
    if (isValid && selectedCurrency) {
      const token = localStorage.getItem("token");
      if (token) {
        navigate("/Sell1", {
          state: { amount: usdt, symbol: selectedCurrency.Symbol },
        });
      } else {
        navigate("/Sell2");
      }
    }
  };

  const toggleDetailsExpanded = () => {
    setIsDetailsExpanded(!isDetailsExpanded);
  };

  const toggleCardVisibility = () => {
    setIsCardVisible(!isCardVisible);
  };

  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.Symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <ContentSection>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title>Crypto to <Yellow>Cash </Yellow>Made Simple</Title>

        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Subtitle>Easily transform your digital currency into cash with our trusted conversion service. We prioritize <Yellow>security </Yellow>and <Yellow>speed</Yellow>, so you can access your funds without hassle.</Subtitle>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.10 }}
          style={{ width: '100%' }}
        >
          <Newcomp />
          {/* <img src={mobbb}/>   */}
          <ExchangeRateBox>
            <RateValue>₹ {selectedCurrency ? selectedCurrency.Rate : 'N/A'} </RateValue>
            <RateLabel>1 USDT = ₹ {selectedCurrency ? selectedCurrency.Rate : 'N/A'} </RateLabel>
          </ExchangeRateBox>
        </motion.div>
      </ContentSection>
      <ExchangeSection>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ExchangeCard>
            <div>
              <TabContainer>
                <Tab active>Sell Crypto</Tab>
              </TabContainer>

              <InputLabel>You sell</InputLabel>
              <InputContainer>
                <InputWrapper isInvalid={!isValid && Number(usdt) < minAmount}>
                  <Input
                    type="number"
                    value={usdt}
                    min={minAmount}
                    onChange={handleUsdtChange}
                  />
                  <CurrencyToggle onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    {selectedCurrency && (
                      <CurrencyIcon src={usdtt} alt={selectedCurrency.Symbol} />
                    )}
                    <Rocks>
                      <Buddy>{selectedCurrency ? selectedCurrency.Name : 'Select'}</Buddy>
                      <CurrencySymbols>{selectedCurrency?.Symbol}</CurrencySymbols>
                    </Rocks>
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
                  {/* <SearchInput
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />*/}
                  <CurrencyList>
                    {filteredCurrencies.map(currency => (
                      <CurrencyItem
                        key={currency._id}
                        onClick={() => handleCurrencySelect(currency)}
                      >
                        <CurrencyIcon src={usdtt} alt={currency.Symbol} />
                        <CurrencyInfo>
                          <Buddy><CurrencyName>{currency.Name}</CurrencyName></Buddy>
                          <CurrencySymbol>{currency.Symbol}</CurrencySymbol>
                        </CurrencyInfo>
                      </CurrencyItem>
                    ))}
                  </CurrencyList>
                </AnimatedDropdownContainer>
                <InputMessage isValid={isValid}>

                  {isValid ? `You can proceed with this amount.` : ` Minimum sell order is ${minAmount} USDT.`}
                </InputMessage>
              </InputContainer>

              <InputLabel>
                You receive (estimate)
                <TooltipContainer>
                  <Info size={14} />
                  <TooltipText>Estimated value may vary slightly due to market fluctuations.</TooltipText>
                </TooltipContainer>
              </InputLabel>
              <InputContainer>
                <InputWrapper>
                  <Input
                    type="text"
                    value={isValid ? inr.toFixed(2) : 0}
                    readOnly
                  />
                  <CurrencyToggle>
                    <CurrencyIcon as="div">
                      <CurrencyIcon src={ind} />
                    </CurrencyIcon>
                    <Buddy>INR</Buddy>
                  </CurrencyToggle>
                </InputWrapper>
              </InputContainer>

              <UpdateText>Updating rates</UpdateText>

              <OrderSummary>
                <OrderTitle onClick={toggleDetailsExpanded}>
                  <b>Your order</b>
                  <div style={{ display: "flex" }}>
                    {(inr.toFixed(2) === "0.00") ? null : <p><b>{usdt} {selectedCurrency.Name} </b>to <b>{inr.toFixed(2)} INR </b></p>}
                    {isDetailsExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </OrderTitle>
                {isDetailsExpanded && (
                  <>
                    <OrderDetail>
                      <span>1 {selectedCurrency?.Name}</span>
                      <span>≈ {isValid ? selectedCurrency?.Rate.toFixed(2) : 0} INR</span>
                    </OrderDetail>
                    <OrderDetail>
                      <span>
                        Processing fee
                        <TooltipContainer>
                          <Info size={14} />
                          <TooltipText>Fee charged for processing the transaction.</TooltipText>
                        </TooltipContainer>
                      </span>
                      <span>as low as Rs {transactionFee}</span>
                    </OrderDetail>
                    <OrderDetail>
                      <span>
                        Network fee
                        <TooltipContainer>
                          <Info size={14} />
                          <TooltipText>Fee charged by the network for sending the transaction.</TooltipText>
                        </TooltipContainer>
                      </span>
                      <span>as low as Rs {networkFee}</span>
                    </OrderDetail>
                  </>
                )}
              </OrderSummary>
            </div>
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <ProceedButton onClick={handleSellNowClick} disabled={!isValid}>
                  Proceed · Sell {selectedCurrency?.Name} <ChevronRight />
                </ProceedButton>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <PaymentMethods>
                  <PaymentIcon />
                </PaymentMethods>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <PoweredBy>
                  Powered by <Moon src={logoM} />
                </PoweredBy>
              </motion.div>
            </div>
            <Indicator onClick={toggleCardVisibility}>
            </Indicator>
            {isCardVisible && (
              <Card>
                <p>This is the detailed card shown when the indicator is clicked.</p>
              </Card>
            )}
          </ExchangeCard>
        </motion.div>
      </ExchangeSection>
    </Container>
  );
};

export default Home;

// Styled components
const Container = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: stretch;
  background-color: #000000;
  color: white;
  min-height: 100vh;

  @media (max-width: 1024px) {
    flex-direction: column;
    height: auto;
  }
`;

const ContentSection = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */

  @media (max-width: 1024px) {
    width: 100%;
    margin-top: 5%;
  }
`;
const Yellow = styled.span`
 
 color: orange;


`;
const Moon = styled.img`
 
 width: 25%;


`;
const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  width: 100%;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    width: auto;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2em;
  color: white;
  margin-bottom: 2rem;
  width: 80%;

  @media (max-width: 430px) {
    width: 100%;
  }
`;

const InputMessage = styled.p`
  font-size: 0.9rem;
  color: ${props => (props.isValid ? 'green' : 'red')};
  margin-top: 0.5rem;
`;


const ExchangeRateBox = styled.div`
  background-color: #111;
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  border: 1px orange solid;
  width: 80%;

  @media (max-width: 430px) {
    width: 100%;
  }
`;

const RateValue = styled.h2`
  font-size: 2.5rem;
  margin: 0.5rem 0;
`;

const RateLabel = styled.span`
  background-color: #ff4d4d;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.8rem;
`;

const ExchangeSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1a1a1a;
  background-image: url(${bg2});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 1024px) {
    width: 100%;
    /* background-image: none; */
  }
  @media (max-width: 768px) {
    width: 100%;
    background-image: none;
    background-color: black;
  }
`;

const ExchangeCard = styled.div`
  background-color: white;
  color: #333333;
  padding: 1.5rem;
  border-radius: 0.5rem;
  width: 380px;
  height: 650px;
  max-width: 100%;
  margin-top: 10%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 1024px) {
    width: auto;
  }
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
  font-size: 25px;
  font-weight: 700;
`;

const InputLabel = styled.div`
  font-size: 16px;
  color: #888;
`;

// ... (previous code remains the same)

const InputContainer = styled.div`
  margin-bottom: 1rem;
  position: relative;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  border: 1px solid ${props => (props.isInvalid ? 'red' : '#e0e0e0')};
  padding: 0.5rem 1rem;
`;

const Input = styled.input`
  flex: 1;
  border: 2px solid transparent;
  background-color: transparent;
  color: #333;
  font-size: 1.5rem;
  font-weight: bold;
  width: 20%;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
  }
`;

const CurrencyToggle = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: #e1dcdc;
  color: black;
  height: 3.2rem;
  padding: 5px 15px;
  border-radius: 16px;
`;

const Rocks = styled.div`
  display: flex;
  flex-direction: column;
`;

const CurrencySymbols = styled.div`
  color: black;
  font-size: 12px;
  font-weight: 400;
  margin-top: 5%;
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

  p {
    font-size: 0.9rem;
  }
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
  color: black;
  font-weight: 700;
  border: none;
  border-radius: 0.5rem;
  font-size: 20px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgb(227, 148, 0);
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

const Buddy = styled.p`
  font-size: 18px;
  font-weight: 600;
`;

const PaymentIcon = styled.div`
  width: 68%;
  height: 35px;
  background-color: white;
  border-radius: 4px;
  background-image: url(${payment});
  object-fit: contain;
  background-repeat: no-repeat;
  background-size: contain;
  @media (max-width:480px){
    width: 80%;
  }
`;

const PoweredBy = styled.div`
    font-size: 0.8rem;
    color: black;
    text-align: center;
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AnimatedDropdownContainer = styled.div`
  position: absolute;
  top: -110px;
  left: -25px;
  right: 0;
  background-color: white;
  border-radius: 0.5rem;
  z-index: 10;
  width: 380px;
  height: 650px;
  max-width: 115%;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-20px)'};
  transition: opacity 0.5s ease, visibility 0.5s ease, transform 0.5s ease;
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
  font-size: 25px;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
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
  width: 30px;
  height: 30px;
  margin-right: 0.75rem;
`;

const CurrencyInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CurrencySymbol = styled.span`
  font-size: 12px;
  color: #888;
  margin-top: 6%;
`;

const CurrencyName = styled.span`
  font-weight: 800;
`;

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin-left: 5px;

  &:hover div {
    visibility: visible;
    opacity: 1;
  }
`;

const TooltipText = styled.div`
  visibility: hidden;
  width: 300px;
  background-color: white;
  color: black;
  text-align: center;
  padding: 5px;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -100px;
  opacity: 0;
  transition: opacity 0.3s;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }
`;

const Indicator = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Card = styled.div`
  position: absolute;
  top: 40px;
  right: 10px;
  background-color: white;
  border: 1px solid #ddd;
  padding: 10px;
  z-index: 2;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
`;
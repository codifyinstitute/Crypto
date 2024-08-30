import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import HomeContact from './HomeContact';

import usdtt from './../assets/usdtt.jpeg';
import ind from './../assets/ind.jpeg';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background-color: #121212;
  color: #ffffff;
  font-family: Arial, sans-serif;
`;

const Card = styled.div`
    background-color: white;
    color: white;
    padding: 2rem;
    border-radius: 1rem;
    width: 480px;
    height: 520px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 5%;

    @media (max-width: 480px) {
        padding: 1rem;
        width: auto;
        height: auto;
    }
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
const CardTitle = styled.h2`
  color: #ffa500;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form``;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const FormLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  margin-bottom: 5px;
  color: #000000;
`;

const InputSelectGroup = styled.div`
  display: flex;
`;

const FormInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  background-color: #f5f5f5;
  color: #000000;

`;

const FormSelect = styled.select`
  flex: 1;
  padding: 10px;
  border: 1px solid #e0e0e0;
  width: 20%;
  border-radius: 5px;
  background-color: #f5f5f5;
  color: #000000;
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg fill="%23000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center;
  padding-right: 30px;
`;

const Button = styled.button`
  background-color: #ffa500;
  color: #ffffff;
  padding: 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  width: 100%;
  margin-top: 10px;
`;

const ExchangeCard = styled(Card)`
background: linear-gradient(113deg, rgba(222, 209, 254, 0.20) -0.92%, rgba(247, 166, 0, 0.20) 103.89%);;
  color: #ffffff;
  margin-bottom: 2%;
`;

const RefreshInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 0.8rem;
  justify-content: center;
`;

const RefreshButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 2%;
`;

const ExchangeTitle = styled.h1`
  font-size: 3rem;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;

`;

const BaseLabel = styled.span`
  font-size: 0.8rem;
  background-color: #dc3545;
  color: white;
  padding: 2px 5px;
  border-radius: 3px;
  margin-left: 10px;
`;

const ExchangeSubtitle = styled.p`
  font-size: 1rem;
  margin: 5px 0 20px;
  text-align: center;
`;

const ExchangeTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: orange;
  color: black;
  text-align: center;
  border-radius: 15px;
 
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #444;
  background-color: white;
  color: black;
`;

const TableCell = styled.td`
  padding: 10px 0;
  font-size: 0.9rem;

`;
const TableCell1 = styled.td`
  padding: 10px 0;
  font-size: 0.9rem;
  background-color: orange;

`;

const IconImage = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 5px;
`;

const VisaLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: #888;
  margin-top: 10px;
`;

const VisaLogo = styled.img`
  height: 20px;
  margin-right: 5px;
`;

const PolicyLink = styled.a`
  display: block;
  text-align: center;
  color: white;
  text-decoration: none;
  margin-top: 10px;
  font-size: 0.8rem;
`;

const Sell1 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [amountPay, setAmountPay] = useState(location.state?.amount || '');
  const [amountReceived, setAmountReceived] = useState('');
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch('https://crypto-anl6.onrender.com/currencies/all');
        const data = await response.json();
        setCurrencies(data);
        const initialCurrency = data.find(c => c.Symbol === location.state?.symbol);
        setSelectedCurrency(initialCurrency);
        if (initialCurrency && amountPay) {
          setAmountReceived(amountPay * initialCurrency.Rate);
        }
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };

    fetchCurrencies();
  }, [amountPay, location.state]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown === 1) {
          // Refresh logic here (e.g., refetch exchange rates)
          return 30;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAmountPayChange = (e) => {
    const value = e.target.value;
    setAmountPay(value);

    if (selectedCurrency) {
      setAmountReceived(value * selectedCurrency.Rate);
    }
  };

  const handleCurrencyChange = (e) => {
    const selectedSymbol = e.target.value;
    const currency = currencies.find(c => c.Symbol === selectedSymbol);
    setSelectedCurrency(currency);
    if (currency && amountPay) {
      setAmountReceived(amountPay * currency.Rate);
    }
  };

  const handleReviewOrderClick = () => {
    localStorage.setItem('transactionDetails', JSON.stringify({
      amountPay,
      symbol: selectedCurrency ? selectedCurrency.Symbol : ''
    }));

    const token = localStorage.getItem('token');
    if (token) {
      navigate('/Sell3');
    } else {
      navigate('/Sell2');
    }
  };

  return (
    <>
      <Navbar />

      <Container>
        <Card>
          <CardTitle>Sell Crypto</CardTitle>
          <Form>
            <FormGroup>
              <FormLabel>You pay</FormLabel>
              <InputSelectGroup>
                <FormInput
                  type="number"
                  value={amountPay}
                  onChange={handleAmountPayChange}
                  placeholder="Enter Your Amount"
                />
                <FormSelect 
                  value={selectedCurrency ? selectedCurrency.Symbol : ''}
                  onChange={handleCurrencyChange}
                >
                  <option value="">Select Currency</option>
                  {currencies.map(currency => (
                    <option key={currency._id} value={currency.Symbol}>
                      {currency.Name}
                    </option>
                  ))}
                </FormSelect>
              </InputSelectGroup>
            </FormGroup>
            <FormGroup>
              <FormLabel>
                <IconImage src={ind} alt="INR Icon" />
                You receive (estimate)
              </FormLabel>
              <InputSelectGroup>
                <FormInput
                  type="number"
                  value={amountReceived}
                  readOnly
                  placeholder="Your Received Amount"
                />
                <FormSelect>
                  <option>INR</option>
                </FormSelect>
              </InputSelectGroup>
            </FormGroup>
            <Button type="button" onClick={handleReviewOrderClick}>
              Proceed - Buy ACH
            </Button>
          </Form>
          <VisaLabel>

          </VisaLabel>
        </Card>

        {selectedCurrency && (
          <ExchangeCard>
            <RefreshInfo>
              Automatic refresh after {countdown}s
              <RefreshButton>↻</RefreshButton>
            </RefreshInfo>
            <ExchangeTitle>
              {selectedCurrency.Rate}
              <BaseLabel>Base</BaseLabel>
            </ExchangeTitle>
            <ExchangeSubtitle>1USDT={selectedCurrency.Rate}</ExchangeSubtitle>
            <ExchangeTable>
              <tbody>
                <TableRow>
                  <TableCell1>Exchange($)</TableCell1>
                  <TableCell1>Price()</TableCell1>
                </TableRow>
                <TableRow>
                  <TableCell>&gt;=1075.27 and &lt;2150.54</TableCell>
                  <TableCell>{selectedCurrency.Rate + 0.25}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>&gt;=2150.54 and &lt;3225.81</TableCell>
                  <TableCell>{selectedCurrency.Rate - 0.5}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>&gt;=3225.81</TableCell>
                  <TableCell>{selectedCurrency.Rate + 1}</TableCell>
                </TableRow>
              </tbody>
            </ExchangeTable>
            <PolicyLink href="#">What is tiered price policy?</PolicyLink>
          </ExchangeCard>
        )}
        
      </Container>
      <HomeContact />
      <Footer />
    </>
  );
};

export default Sell1;
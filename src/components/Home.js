import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ind from './../assets/ind.jpeg'
import usdtt from './../assets/usdtt.jpeg'

// Assume we have these images imported
// import USDTImage from './path-to-usdt-image.png';
// import IndiaFlagImage from './path-to-india-flag-image.png';

const Home = () => {
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
        <Container>
            <ContentSection>
                <Title>Discover Your Dream Property with Estatein</Title>
                <Subtitle>Your journey to finding the perfect property begins here. Explore our listings to find the home that matches your dreams.</Subtitle>
                <ExchangeRateBox>
                    <RefreshText>Automatic refresh after 30s</RefreshText>
                    <RateValue>{selectedCurrency ? selectedCurrency.Rate : 'N/A'}</RateValue>
                    <RateLabel>1 USDT = {selectedCurrency ? selectedCurrency.Rate : 'N/A'}</RateLabel>
                </ExchangeRateBox>
            </ContentSection>
            <ExchangeSection>
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
            </ExchangeSection>
        </Container>
    );
};

export default Home;

const Container = styled.div`
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
    align-items: center;
  
   

    @media (max-width: 1024px) {
        width: 100%;
    }
`;

const Title = styled.h1`
    font-size: 3.5rem;
    margin-bottom: 1rem;
    width: 80% ;

    @media (max-width: 768px) {
        font-size: 2.5rem;
        width: auto;
    }
`;

const Subtitle = styled.p`
    font-size: 1rem;
    color: #888;
    margin-bottom: 2rem;
    width: 80% ;
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
    width: 60% ;
`;

const RefreshText = styled.p`
    font-size: 0.8rem;
    color: #888;
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
    /* padding: 2rem; */

    @media (max-width: 1024px) {
        width: 100%;
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
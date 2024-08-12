import React from 'react';
import styled from 'styled-components';

const Home = () => {
    return (
        <Container>
            <Content>
                <Title>Discover Your Dream Property with Estatein</Title>
                <Subtitle>Your journey to finding the perfect property begins here. Explore our listings to find the home that matches your dreams.</Subtitle>
            </Content>
            <ExchangeContainer>
                <ExchangeRateBox>
                    <RefreshText>Automatic refresh after 30s</RefreshText>
                    <RateContainer>
                        <RateValue>93</RateValue>
                        <RateLabel>1 USDT = 93</RateLabel>
                    </RateContainer>
                </ExchangeRateBox>
                <SellBox>
                    <InputContainer>
                        <Label>You Pay</Label>
                        <Input type="text" value="1" readOnly />
                        <Flag src="path/to/usdt-flag.png" alt="USDT" />
                    </InputContainer>
                    <InputContainer>
                        <Label>You Get</Label>
                        <Input type="text" value="14181.45" readOnly />
                        <Flag src="path/to/inr-flag.png" alt="INR" />
                    </InputContainer>
                    <SellButton>SELL NOW</SellButton>
                    <PaymentOptions>
                        <img src="path/to/visa.png" alt="Visa" />
                        <img src="path/to/mastercard.png" alt="Mastercard" />
                        <img src="path/to/apple-pay.png" alt="Apple Pay" />
                        <img src="path/to/google-pay.png" alt="Google Pay" />
                    </PaymentOptions>
                </SellBox>
            </ExchangeContainer>
        </Container>
    );
};

export default Home;

// Styled Components
const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    /* max-width: 1200px; */
    color: white;

    @media (max-width: 1024px) {
        padding: 1.5rem;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        padding: 1rem;
    }
`;

const Content = styled.div`
    max-width: 50%;

    @media (max-width: 768px) {
        max-width: 100%;
        text-align: center;
        margin-bottom: 2rem;
    }
`;

const Title = styled.h1`
    font-size: 3rem;
    line-height: 1.2;

    @media (max-width: 1024px) {
        font-size: 2.5rem;
    }

    @media (max-width: 768px) {
        font-size: 2rem;
    }

    @media (max-width: 480px) {
        font-size: 1.8rem;
    }
`;

const Subtitle = styled.p`
    margin-top: 1rem;
    font-size: 1.2rem;
    color: #aaa;

    @media (max-width: 1024px) {
        font-size: 1.1rem;
    }

    @media (max-width: 768px) {
        font-size: 1rem;
    }

    @media (max-width: 480px) {
        font-size: 0.9rem;
    }
`;

const ExchangeContainer = styled.div`
    background: #111;
    border-radius: 1rem;
    padding: 2rem;
    width: 30%;
    height: 30rem;

    @media (max-width: 1024px) {
        width: 45%;
        padding: 1.5rem;
    }

    @media (max-width: 768px) {
        width: 100%;
        padding: 1.5rem;
        height: auto;
    }
`;

const ExchangeRateBox = styled.div`
    margin-bottom: 1.5rem;

    @media (max-width: 768px) {
        margin-bottom: 1rem;
    }
`;

const RefreshText = styled.p`
    font-size: 0.9rem;
    color: #888;

    @media (max-width: 480px) {
        font-size: 0.8rem;
    }
`;

const RateContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const RateValue = styled.h2`
    font-size: 2.5rem;
    font-weight: bold;

    @media (max-width: 768px) {
        font-size: 2rem;
    }

    @media (max-width: 480px) {
        font-size: 1.8rem;
    }
`;

const RateLabel = styled.span`
    background: red;
    padding: 0.2rem 0.5rem;
    border-radius: 0.5rem;
    font-size: 0.8rem;
    color: white;

    @media (max-width: 768px) {
        font-size: 0.7rem;
    }

    @media (max-width: 480px) {
        font-size: 0.6rem;
    }
`;

const SellBox = styled.div`
    background: #222;
    padding: 1.5rem;
    border-radius: 1rem;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

const InputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const Label = styled.label`
    font-size: 1rem;
    color: #bbb;

    @media (max-width: 480px) {
        font-size: 0.9rem;
    }
`;

const Input = styled.input`
    background: #333;
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    width: 60%;

    @media (max-width: 768px) {
        width: 100%;
        margin-top: 0.5rem;
    }
`;

const Flag = styled.img`
    height: 1.5rem;
    width: auto;

    @media (max-width: 480px) {
        height: 1.2rem;
    }
`;

const SellButton = styled.button`
    background: linear-gradient(90deg, #ffa726, #fb8c00);
    color: white;
    border: none;
    padding: 1rem;
    border-radius: 1rem;
    width: 100%;
    font-size: 1.2rem;
    margin-top: 1rem;
    cursor: pointer;

    @media (max-width: 768px) {
        padding: 0.8rem;
        font-size: 1rem;
    }
`;

const PaymentOptions = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;

    img {
        height: 2rem;
        width: auto;

        @media (max-width: 480px) {
            height: 1.5rem;
        }
    }
`;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import HomeContact from './HomeContact';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #1a1a1a;
  padding: 20px;
`;

const Card = styled.div`
    background-color: white;
    color: white;
    padding: 2rem;
    border-radius: 1rem;
    width: 480px;
    height: 480px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 5%;

    @media (max-width: 480px) {
        padding: 1rem;
        width: 90%;
        height: auto;
    }
`;

const QRCodeContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const QRCode = styled.div`
  background-color: #f0f0f0;
  border: 2px solid #f7a600;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TransactionLabel = styled.p`
color: #f7a600;
  text-align: center;
  margin: 10px 0;
`;

const Button = styled.button`
  background-color: #f7a600;
  color: white;
  border: none;
  padding: 12px;
  width: 100%;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #e69500;
  }
`;

const Title = styled.h2`
  color: #f7a600;
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.9rem;
  text-align: center;
`;

const QRCodeCard = () => {
    const [localData, setLocalData] = useState({});
    const [transactionFee, setTransactionFee] = useState(0);
    const [currencyRate, setCurrencyRate] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [transactionId, setTransactionId] = useState('');
    const [image, setImage] = useState("");

    const navigate = useNavigate();

    const fetchTransactionFee = async () => {
        try {
            const response = await fetch('https://crypto-anl6.onrender.com/static/get/66c445a358802d46d5d70dd4');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTransactionFee(data.TransactionFee);
        } catch (error) {
            setError('Error fetching transaction fee');
        }
    };

    const fetchCurrencyData = async () => {
        try {
            const response = await fetch('https://crypto-anl6.onrender.com/currencies/all');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const currency = data.find(curr => curr.Symbol === localData.symbol);
            if (currency) {
                setImage(currency.QRCode);
                setTransactionId(currency.TransactionId);
                setCurrencyRate(currency.Rate);
            } else {
                setError('Currency not found');
            }
        } catch (error) {
            setError('Error fetching currency data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('transactionDetails'));
        setLocalData(data);
        console.log(data)
        fetchTransactionFee();
    }, []);

    useEffect(() => {
        if (localData.symbol) {
            fetchCurrencyData();
        }
    }, [localData.symbol]);



    const handleProceedClick = () => {
        navigate('/sell4');
    };


    return (
        <>
            <PageContainer>
                <Navbar />
                <Card>
                    <Title>Sell {localData.symbol}</Title>
                    <div>
                        <QRCodeContainer>
                            <QRCode><img src={`https://crypto-anl6.onrender.com/uploads/${image}`} width='150px' alt="QR code" /></QRCode>
                        </QRCodeContainer>
                        <TransactionLabel>Transaction ID: {transactionId}</TransactionLabel>
                    </div>
                    <Button onClick={handleProceedClick}>Submit</Button>
                </Card>
            </PageContainer>
            <HomeContact />
            <Footer />
        </>
    );
};

export default QRCodeCard;

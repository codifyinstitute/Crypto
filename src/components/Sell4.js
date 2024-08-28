import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import HomeContact from './HomeContact';
import Modal from './ConformationModal';  // Import the Modal component

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
  border-radius: 10px;
  padding: 30px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #f7a600;
  margin-top: 0;
  margin-bottom: 20px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Label = styled.span`
  color: #666;
`;

const Value = styled.span`
  font-weight: bold;
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

const Sell4 = () => {
  const [localData, setLocalData] = useState({});
  const [transactionFee, setTransactionFee] = useState(0);
  const [currencyRate, setCurrencyRate] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [savedData, setSavedData] = useState(null);
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
      setTransactionId(data.TransactionId);
      setImage(data.QRCode);
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
    fetchTransactionFee();
  }, []);

  useEffect(() => {
    if (localData.symbol) {
      fetchCurrencyData();
    }
  }, [localData.symbol]);

  const calculateReceivedAmount = () => {
    if (!currencyRate || !localData.amountPay || !transactionFee) return 0;
    const totalAmount = localData.amountPay * currencyRate;
    return totalAmount - transactionFee;
  };

  const handleProceedClick = () => {
    setShowConfirmation(true);
  };

  const confirmTransaction = async () => {
    setShowConfirmation(false);
    try {
      const response = await fetch('https://crypto-anl6.onrender.com/transactions/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email: localStorage.getItem("token"), // Ensure this field exists in localData
          Name: localData.Name,
          Country: localData.Country,
          BankName: localData.BankName,
          AccountNumber: localData.AccountNumber,
          IFSC: localData.IFSC,
          USDTAmount: localData.amountPay,
          Token: localData.symbol,
          ProcessingFee: transactionFee,
          ReceivedAmount: calculateReceivedAmount(),
          Status: 'Pending',
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setSavedData(result.transaction);
      setShowSuccess(true);
    } catch (error) {
      alert('Error submitting transaction: ' + error.message);
    }
  };

  const cancelConfirmation = () => {
    setShowConfirmation(false);
  };

  const closeSuccessPopup = () => {
    setShowSuccess(false);
    navigate('/transaction');  // Navigate to the transaction path
  };

  return (
    <>
      <PageContainer>
        <Navbar />
        <Card>
          <Title>Sell {localData.symbol}</Title>
          <InfoRow>
            <Label>Name</Label>
            <Value>{localData.Name}</Value>
          </InfoRow>
          <InfoRow>
            <Label>Country</Label>
            <Value>{localData.Country}</Value>
          </InfoRow>
          <InfoRow>
            <Label>Bank Name</Label>
            <Value>{localData.BankName}</Value>
          </InfoRow>
          <InfoRow>
            <Label>Account Number</Label>
            <Value>{localData.AccountNumber}</Value>
          </InfoRow>
          <InfoRow>
            <Label>IFSC Code</Label>
            <Value>{localData.IFSC}</Value>
          </InfoRow>
          <InfoRow>
            <Label>Amount Pay</Label>
            <Value>{localData.amountPay}</Value>
          </InfoRow>
          <InfoRow>
            <Label>INR Amount</Label>
            <Value>{localData.amountPay * currencyRate}</Value>
          </InfoRow>
          <InfoRow>
            <Label>Transaction Fee</Label>
            <Value>{transactionFee}</Value>
          </InfoRow>
          <InfoRow>
            <Label>Received Amount</Label>
            <Value>{calculateReceivedAmount()}</Value>
          </InfoRow>
          <QRCodeContainer>
            <QRCode><img src={`http://localhost:8000/uploads/${image}`} width='150px' alt="QR code" /></QRCode>
          </QRCodeContainer>
          <TransactionLabel>Transaction ID: {transactionId}</TransactionLabel>
          <Button onClick={handleProceedClick}>Proceed - Buy ACH →</Button>
        </Card>
      </PageContainer>
      <HomeContact />
      <Footer />

      {showConfirmation && (
        <Modal
          title="Confirm Transaction"
          message="Are you sure you want to proceed with this transaction?"
          onConfirm={confirmTransaction}
          onCancel={cancelConfirmation}
        />
      )}

      {showSuccess && savedData && (
        <Modal
          title="Transaction Successful"
          message={`Transaction ID: ${savedData.OrderId}\nAmount: ${savedData.ReceivedAmount}\nStatus: ${savedData.Status}`}
          onConfirm={closeSuccessPopup}
          showDoneButton
        />
      )}
    </>
  );
};

export default Sell4;

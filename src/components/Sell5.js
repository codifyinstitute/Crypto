import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import HomeContact from './HomeContact';

const PageWrapper = styled.div`
  background-color: #1a1a1a;/* Background color for the page */
  min-height: 100vh; /* Ensure it covers the full viewport height */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OrderStatusContainer = styled.div`
  background-color: #ffffff;
  width: 300px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

const StatusList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const StatusItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;

  &::before {
    content: "";
    width: 10px;
    height: 10px;
    background-color: #00c853;
    border-radius: 50%;
    display: inline-block;
    margin-right: 10px;
  }
`;

const StatusText = styled.div`
  color: #333;
`;

const DateAmount = styled.div`
  text-align: right;
  color: #999;
`;

const Button = styled.button`
  background-color: #ffa000;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
  font-size: 16px;

  &:hover {
    background-color: #ffb300;
  }
`;

const OrderStatus = () => {
  return (
    <>
    <Navbar/>
    <PageWrapper>
      <OrderStatusContainer>
        <Title>Order Status</Title>
        <StatusList>
          <StatusItem>
            <StatusIndicator>
              <StatusText>Crypto Sell</StatusText>
            </StatusIndicator>
            <DateAmount>
              <div>Oct 24, 2019</div>
              <div>€300</div>
            </DateAmount>
          </StatusItem>
          <StatusItem>
            <StatusIndicator>
              <StatusText>Partial Payment</StatusText>
            </StatusIndicator>
            <DateAmount>
              <div>Oct 26, 2019</div>
              <div>€400</div>
            </DateAmount>
          </StatusItem>
          <StatusItem>
            <StatusIndicator>
              <StatusText>Fund Delivery</StatusText>
            </StatusIndicator>
            <DateAmount>
              <div>Oct 27, 2019</div>
              <div>€2,230</div>
            </DateAmount>
          </StatusItem>
        </StatusList>
        <Link to='/'><Button>Order Completed →</Button></Link>
      </OrderStatusContainer>
    </PageWrapper>
    <HomeContact/>
    <Footer/>
    </>
  );
};

export default OrderStatus;

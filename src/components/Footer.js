import React from 'react';
import styled from 'styled-components';
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #000;
  padding: 50px 20px;
  color: #fff;
  border-top: 4px solid #ff9900;
  text-align: center;
  flex-wrap: wrap;
  
`;

const CoreValuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const CoreValue = styled.div`
  margin: 20px 0;
  max-width: 300px;
  text-align: left;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #ffa500;
    @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }

  }

  p {
    font-size: 1.2rem;
    line-height: 1.5;

    @media (max-width: 768px) {
    font-size: 1rem;
    }
    @media (max-width: 480px) {
    font-size: 0.8rem;
    }

  }
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  padding: 3%;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const LogoContainer = styled.div`
  margin-bottom: 20px;
  text-align: center;

  h4 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 9px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    margin-bottom: 12px;

  }

  a {
    color: #ff9900;
    text-decoration: none;
    font-size: 1.5rem;

    &:hover {
      text-decoration: underline;
    }
    @media (max-width: 768px) {
   font-size: 1.2rem;
   cursor: pointer;
  }
    @media (max-width: 480px) {
   font-size: 18px;
   cursor: pointer;
  }
  }
  span{
    font-size: 1.5rem;
      @media (max-width: 480px) {
   font-size: 1rem;
  }
  }
`;
const Column = styled.div`
display: flex;
flex-direction: column;
@media (max-width: 768px) {
  margin: 0px 20px;
  }
  @media (max-width: 480px) {
  margin: 0px 0px;
  }
`;
const DisclaimerContainer = styled.div`
  max-width: 670px;
  font-size: 1rem;
  text-align: left;
  margin-bottom: 20px;
  border: 2px solid #ff9900;
  padding: 10px;
  @media (max-width: 768px) {
  font-size: 0.8rem;

  }
`;

const SocialMediaContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;

  a {
    color: #fff;
    font-size: 1.5rem;

    &:hover {
      color: #ff9900;
    }
    @media (max-width: 480px) {
   padding-bottom: 30px;
  }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <CoreValuesContainer>
        <CoreValue>
          <h3>Transparency</h3>
          <p>
            We strive to provide accurate information to our users at all times.
            This includes being transparent about our fees, policies, and any updates
            that may affect our users.
          </p>
        </CoreValue>
        <CoreValue>
          <h3>Security</h3>
          <p>
            The security of our user's assets and personal data is of utmost importance
            to us. We employ cutting-edge security protocols and industry best practices.
          </p>
        </CoreValue>
        <CoreValue>
          <h3>Customer-Centric</h3>
          <p>
            Our customers are at the heart of everything we do. We are committed
            to providing a personalized and exceptional experience for each of our users.
          </p>
        </CoreValue>
      </CoreValuesContainer>
      <BottomContainer>
        <LogoContainer>
          <h4>MoonPay LOGO</h4>
          <p>Trade Smarter, Trade Better</p>
        </LogoContainer>
        <Column>
          <LinksContainer>
            <a href="/">Home</a><span>|</span>
            <a href="/">About Us</a><span>|</span>
            <a href="/">Contact Us</a><span>|</span>
            <a href="/">Privacy Policy</a><span>|</span>
            <a href="/">Terms and Conditions</a>
          </LinksContainer>
          <DisclaimerContainer>
            <p>
              Disclaimer: Cryptocurrency and digital asset investments carry risks, including potential capital loss.
              Information on this website is for informational purposes and should not be construed as financial, investment,
              or legal advice.
            </p>
          </DisclaimerContainer>
        </Column>
        <SocialMediaContainer>
          <a href="https://twitter.com"><FaTwitter /></a>
          <a href="https://facebook.com"><FaFacebookF /></a>
          <a href="https://instagram.com"><FaInstagram /></a>
          <a href="https://linkedin.com"><FaLinkedinIn /></a>
        </SocialMediaContainer>
      </BottomContainer>
    </FooterContainer>
  );
};

export default Footer;

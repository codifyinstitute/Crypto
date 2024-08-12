import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #1a1a1a;
  color: white;
  padding: 2rem;
  font-size: 0.9rem;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EmailInput = styled.div`
  display: flex;
  align-items: center;
  background-color: #333;
  padding: 0.5rem;
  border-radius: 4px;

  input {
    background: none;
    border: none;
    color: white;
    flex-grow: 1;
    outline: none;
  }

  button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
  }
`;

const LinksSection = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const LinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #333;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <LogoSection>
          <Logo>
            <span style={{ color: '#ffa500' }}>▲</span> Estatein
          </Logo>
          <EmailInput>
            <input type="email" placeholder="Enter Your Email" />
            <button>➤</button>
          </EmailInput>
        </LogoSection>
        <LinksSection>
          <LinkColumn>
            <strong>Home</strong>
            <span>Hero Section</span>
            <span>Features</span>
            <span>Properties</span>
            <span>Testimonials</span>
            <span>FAQ's</span>
          </LinkColumn>
          <LinkColumn>
            <strong>About Us</strong>
            <span>Our Story</span>
            <span>Our Works</span>
            <span>How It Works</span>
            <span>Our Team</span>
            <span>Our Clients</span>
          </LinkColumn>
          <LinkColumn>
            <strong>Properties</strong>
            <span>Portfolio</span>
            <span>Categories</span>
          </LinkColumn>
          <LinkColumn>
            <strong>Services</strong>
            <span>Valuation Mastery</span>
            <span>Strategic Marketing</span>
            <span>Negotiation Wizardry</span>
            <span>Closing Success</span>
            <span>Property Management</span>
          </LinkColumn>
          <LinkColumn>
            <strong>Contact Us</strong>
            <span>Contact Form</span>
            <span>Our Offices</span>
          </LinkColumn>
        </LinksSection>
      </FooterContent>
      <BottomSection>
        <div>©2023 Estatein. All Rights Reserved.</div>
        <div>Terms & Conditions</div>
        <SocialIcons>
          <span>f</span>
          <span>in</span>
          <span>𝕏</span>
          <span>▶</span>
        </SocialIcons>
      </BottomSection>
    </FooterContainer>
  );
};

export default Footer;
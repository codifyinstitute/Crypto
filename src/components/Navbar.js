import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #1a1a1a;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    bottom: 0;
    top: auto;
    justify-content: space-around;
    padding: 10px 0;
    border-radius: 20px;
    border: 1px white solid;
    width: 98%;
    margin:1% ;
    background-color: #000; /* Darker background for the bottom bar */
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: white;

  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    margin: 0 20px;
    position: relative;

    @media (max-width: 768px) {
      margin: 0;
      flex: 1;
      text-align: center;
      margin: 1%;
    }

    a {
      color: white;
      text-decoration: none;
      padding: 10px 20px;
      transition: background-color 0.3s ease;
      border-radius: 12px; /* Rounded corners */
      font-size: 16px;

      &:hover,
      &.active {
        background-color: #333;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      @media (max-width: 768px) {
        padding: 10px 15px;
        font-size: 14px;
        display: inline-block;
        width: 100%;
      }
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-around;

    /* Show only specific links on mobile */
    li:not(:nth-child(1), :nth-child(2), :nth-child(3)) {
      display: none;
    }
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo>
        <img src="logo-path.png" alt="Logo" />

      </Logo>
      <NavLinks>
        <li><a href="/" className="active">Home</a></li>
        <li><a href="/Sell1">Exchange</a></li>
        <li><a href="/Profile">Profile</a></li>
        
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;

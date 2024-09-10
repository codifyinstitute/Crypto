import React from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import logo1 from "../assets/logoM1.png";

const NavbarContainer = styled.nav`
  width: 100%;
  background-color: black;
  padding: 25px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);
  position: relative;

  @media (max-width: 768px) {
    padding: 25px 0px 0px 20px;
    /* border-radius: 20px; */
    background-color: #000;
  }
`;

const NavbarWrapper = styled.div`
  background-color: black;
  height: 50px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  border: 1px solid white;
  border-radius: 20px;

  @media (min-width: 769px) {
    display: none; /* Hide mobile navbar on desktop */
  }
`;

const TopLogo = styled.div`
  height: 20px;
  width: 115px;
  margin-left: 16px;
  
  img {
    height: 100%;
    width: 100%;
  }

  @media (min-width: 769px) {
    display: none; /* Hide mobile logo on desktop */
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: white;

  img {
    width: 145px;
    height: 28px;
    margin-right: 10px;
  }

  @media (max-width: 768px) {
    display: none; /* Hide desktop logo on mobile */
  }
`;

const NavLinksDesktop = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    margin: 0 20px;

    a {
      color: white;
      text-decoration: none;
      padding: 10px 20px;
      transition: background-color 0.3s ease;
      border-radius: 12px;
      font-size: 1.2rem;

      &:hover{
        background-color:white ;
        color: #FFA500;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      &.active {
        /* background-color: #FFA500; */
        color: #FFA500;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
    }
  }

  @media (max-width: 768px) {
    display: none; /* Hide desktop links on mobile */
  }
`;

const NavLinksMobile = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  justify-content: space-around;
  height: 100%;

  li {
    margin: 0;
    flex: 1;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    a {
      color: white;
      text-decoration: none;
      padding: 10px 15px;
      font-size: 14px;
      display: inline-block;
      width: 100%;

      
      &:hover{
        background-color:white ;
        color: #FFA500;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      &.active {
        /* background-color: ; */
        color: #FFA500;
        width: fit-content;
        border-radius: 10px;
    
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
    }
  }

  @media (min-width: 769px) {
    display: none; /* Hide mobile links on desktop */
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  const handleExchangeClick = (e) => {
    e.preventDefault();
    if (token) {
      navigate('/Sell1');
    } else {
      navigate('/sell2');
    }
  };

  const isExchangeActive = ["/sell1", "/sell3", "/sell4", "/sell5"].includes(location.pathname.toLowerCase());

  return (
    <>
      <NavbarContainer>
        <TopLogo>
          <img src={logo1} alt="Logo" />
        </TopLogo>
        <Logo>
          <img src={logo1} alt="Logo" />
        </Logo>
        {/* Desktop links */}
        <NavLinksDesktop>
          <li>
            <NavLink exact to="/" activeClassName="active">Home</NavLink>
          </li>
          <li>
            <NavLink
              to={isExchangeActive ? location.pathname : "/sell3"}
              className={isExchangeActive ? "active" : ""}
              onClick={handleExchangeClick}
            >
              Exchange
            </NavLink>
          </li>
          <li>
            {token ? (
              <NavLink to="/Profile" activeClassName="active">Profile</NavLink>
            ) : (
              <NavLink to="/sell2" activeClassName="activee">Sign In</NavLink>
            )}
          </li>
        </NavLinksDesktop>
      </NavbarContainer>

      {/* Mobile bottom navbar */}
      <NavbarWrapper>
        <NavLinksMobile>
          <li>
            <NavLink exact to="/" activeClassName="active">Home</NavLink>
          </li>
          <li>
            <NavLink
              to={isExchangeActive ? location.pathname : "/sell3"}
              className={isExchangeActive ? "active" : ""}
              onClick={handleExchangeClick}
            >
              Exchange
            </NavLink>
          </li>
          <li>
            {token ? (
              <NavLink to="/Profile" activeClassName="active">Profile</NavLink>
            ) : (
              <NavLink to="/sell2" activeClassName="activee">Sign In</NavLink>
            )}
          </li>
        </NavLinksMobile>
      </NavbarWrapper>
    </>
  );
};

export default Navbar;

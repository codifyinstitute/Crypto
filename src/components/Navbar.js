import React from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

const NavbarContainer = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: black;
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
    border: 1px solid white;
    width: 98%;
    margin: 1%;
    background-color: #000;
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
      border-radius: 12px;
      font-size: 1.2rem;

      &:hover,
      &.active {
        background-color: #FFA500;
        color: white;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      &:hover,
      &.activee {
        background-color: white;
        color: #FFA500;
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
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const token = localStorage.getItem('token');

  const handleExchangeClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    if (token) {
      navigate('/Sell1');
    } else {
      navigate('/sell2');
    }
  };

  // Determine if the current path is one of the Sell pages
  const isExchangeActive = ["/sell1", "/sell3", "/sell4", "/sell5"].includes(location.pathname.toLowerCase());

  return (
    <NavbarContainer>
      <Logo>
        <img src="logo-path.png" alt="Logo" />
      </Logo>
      <NavLinks>
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
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;

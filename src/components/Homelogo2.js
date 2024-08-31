import React from "react";
import styled from "styled-components";
import image1 from "../assets/exchange1.png";
import image2 from "../assets/exchange2.png";
import image3 from "../assets/exchange3.png";
import image4 from "../assets/exchange4.png";
import image5 from "../assets/exchange5.png";
import image6 from "../assets/exchange6.png";
import image7 from "../assets/exchange7.png";
import image8 from "../assets/exchange8.png";
import image9 from "../assets/exchange9.png";
import image10 from "../assets/exchange10.png";
import image11 from "../assets/exchange11.png";
import image12 from "../assets/exchange12.png";

const logos = [
  { name: "OKX", url: image1, link: "#" },
  { name: "Bitget", url: image2, link: "#" },
  { name: "NEAR", url: image3, link: "#" },
  { name: "Polygon", url: image4, link: "#" },
  { name: "Arbitrum", url: image5, link: "#" },
  { name: "ChainUP", url: image6, link: "#" },
  { name: "Sui", url: image7, link: "#" },
  { name: "Token Pocket", url: image8, link: "#" },
  { name: "Bitget Wallet", url: image9, link: "#" },
  { name: "Bitrue", url: image10, link: "#" },
  { name: "CELO", url: image11, link: "#" },
  { name: "Pionex", url: image12, link: "#" },
];

const Container = styled.div`
  color: #fff;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const LogoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  justify-items: center;
  align-items: center;
  @media (max-width: 375px) {
    grid-template-columns: repeat(auto-fit, minmax(88px, 1fr));
  }
`;

const LogoWrapper = styled.a`
  background-color: #fff;
  border-radius: 8px;
  padding: 0.5rem;
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;

const Logo = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
`;

const Button = styled.button`
  background-color: ${(props) => (props.primary ? "#FFA500" : "transparent")};
  color: #fff;
  border: 1px solid ${(props) => (props.primary ? "#FFA500" : "#fff")};
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  cursor: pointer;
  border-radius: 4px;
`;

const Web3Projects = () => {
  return (
    <Container>
      <Title>
        Unleash limitless trades with our{" "}
        <span style={{ color: "#FFA500" }}>
          trusted <br></br> liquidity from top exchanges
        </span>
      </Title>
      <LogoGrid>
        {logos.map((logo, index) => (
          <LogoWrapper
            key={index}
            href={logo.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Logo src={logo.url} alt={logo.name} />
          </LogoWrapper>
        ))}
      </LogoGrid>
    </Container>
  );
};

export default Web3Projects;

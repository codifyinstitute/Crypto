import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  /* background-color: #1E1E1E; */
  border: 1px solid #FFA500;
  border-radius: 10px;
  padding: 20px;
  color: white;
  font-family: Arial, sans-serif;
width: 800px;
  margin: 0 auto;
  margin-bottom: 25px;
  /* margin-bottom: 30%; */

  @media (max-width: 1024px) {
    margin-bottom: 3%;
  }
  @media (max-width: 769px) {
    margin-bottom: 4%;
    width: 90%;
  }

`;
const Group = styled.div`
display: flex;
`

const Title = styled.h2`
  color: #FFA500;
  font-size: 2em;
  margin-top: 0;
  margin-bottom: 15px;
  @media (max-width: 480px) {
  font-size: 1.5rem;

  }
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PhoneImage = styled.div`
  width: 80px;
  height: 120px;
  background-color: #2A2A2A;
  border-radius: 10px;
  flex-shrink: 0;
`;

const TextContent = styled.div`
  flex-grow: 1;
`;

const Description = styled.p`
  font-size: 1.2em;
  line-height: 1.5;
  margin-bottom: 20px;
  margin-left: 2rem;
  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-left: 15px;
  }
`;

const Features = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Feature = styled.div`
  flex: 1;
`;

const FeatureTitle = styled.h3`
  color: #FFA500;
  font-size: 2rem;
  margin-top: 0;
  margin-bottom: 10px;
  @media (max-width: 480px) {
   font-size: 1.5rem;
  }
`;

const FeatureDescription = styled.p`
  font-size: 1.2em;
  line-height: 1.4;
  @media (max-width: 480px) {
   font-size: 0.8rem;
  }
`;

const Mobile = () => {
  return (
    <Container>
      <Title>Why Choose Moon Pay for USDT Exchange</Title>
      <Content>
        <TextContent>
        <Group>
        <PhoneImage />
          <Description>
            At Moon Pay, we offer a seamless and secure platform for exchanging USDT. With our intuitive interface and
            advanced security measures, you can buy and sell USDT with confidence and ease. Our commitment to transparency,
            reliability, and customer satisfaction sets us apart, making Moon Pay the preferred choice for USDT exchange.
          </Description>
          </Group>
          <Features>
            <Feature>
              <FeatureTitle>Vision</FeatureTitle>
              <FeatureDescription>
                Revolutionizing cryptocurrency exchange with Moon Pay's secure platform, fostering a community of empowered users.
              </FeatureDescription>
            </Feature>
            <Feature>
              <FeatureTitle>Customer-Centric Approach</FeatureTitle>
              <FeatureDescription>
                Empowering individuals to confidently participate in the cryptocurrency ecosystem through a trustworthy and inclusive platform.
              </FeatureDescription>
            </Feature>
          </Features>
        </TextContent>
      </Content>
    </Container>
  );
};

export default Mobile;
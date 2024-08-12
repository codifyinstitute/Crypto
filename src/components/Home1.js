import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: transparent;
  color: white;
  padding: 2rem;
  font-family: Arial, sans-serif;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const Card = styled.div`
  background: black;
  border-radius: 10px;
  border: 1px white solid;
  padding: 1rem;
  text-align: center;
`;

const BitcoinIcon = styled.div`
  background-color: #f2a900;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: 0 auto 1rem;
`;

const ExchangeName = styled.div`
  background-color: #f2a900;
  border-radius: 20px;
  padding: 0.25rem 0.5rem;
  display: inline-block;
  margin-bottom: 0.5rem;
`;

const PriceInfo = styled.div`
  font-size: 0.9rem;
`;

const TestimonialCard = styled.div`
  background: black;
  border-radius: 10px;
  border: 1px white solid;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Avatar = styled.div`
  background-color: #8247e5;
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

const TestimonialContent = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`;

const Component = () => {
  const bitcoinCards = [
    { exchange: 'wazirx', avg: 95.26, usdt: 95.26, min: 94.5, max: 94.5 },
    { exchange: 'wazirx', avg: 95.26, usdt: 95.26, min: 94.5, max: 94.5 },
    { exchange: 'wazirx', avg: 95.26, usdt: 95.26, min: 94.5, max: 94.5 },
    { exchange: 'wazirx', avg: 95.26, usdt: 95.26, min: 94.5, max: 94.5 },
  ];

  const testimonials = [
    {
      name: 'Sandeep Nailwal',
      title: 'Co-Founder Polygon',
      quote: 'Thanks to Alchemy Pay, we can provide an essential gateway between fiat and crypto transactions. This development opens up new capital inroads that will propel users of polygon\'s DeFi ecosystem to the next level.',
    },
    {
      name: 'Sandeep Nailwal',
      title: 'Co-Founder Polygon',
      quote: 'Thanks to Alchemy Pay, we can provide an essential gateway between fiat and crypto transactions. This development opens up new capital inroads that will propel users of polygon\'s DeFi ecosystem to the next level.',
    },
    {
      name: 'Sandeep Nailwal',
      title: 'Co-Founder Polygon',
      quote: 'Thanks to Alchemy Pay, we can provide an essential gateway between fiat and crypto transactions. This development opens up new capital inroads that will propel users of polygon\'s DeFi ecosystem to the next level.',
    },
  ];

  return (
    <Container>
      <Section>
        <Grid>
          {bitcoinCards.map((card, index) => (
            <Card key={index}>
              <BitcoinIcon />
              <ExchangeName>{card.exchange}</ExchangeName>
              <div>Avg {card.avg} Rs</div>
              <PriceInfo>1 USDT = ${card.usdt}</PriceInfo>
              <PriceInfo>Min {card.min}$</PriceInfo>
              <PriceInfo>Max {card.max}$</PriceInfo>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section>
        <Title>Happy Customers</Title>
        <Grid>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index}>
              <Avatar />
              <TestimonialContent>
                <h3>{testimonial.name}</h3>
                <p>{testimonial.title}</p>
                <p>{testimonial.quote}</p>
              </TestimonialContent>
            </TestimonialCard>
          ))}
        </Grid>
      </Section>
    </Container>
  );
};

export default Component;
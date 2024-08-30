import React from 'react';
import styled from 'styled-components';
import { DollarSign, Euro, Bitcoin } from 'lucide-react';

const DashboardContainer = styled.div`
  background: linear-gradient(to right, #1a202c, #2d3748, #4a5568);
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

const StatsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StatItemWrapper = styled.div`
  flex: 1;
  padding: 1rem;
  text-align: center;
  position: relative;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 25%;
    right: 0;
    width: 1px;
    height: 50%;
    background-color: #4a5568;
    display: none;

    @media (min-width: 768px) {
      display: block;
    }
  }
`;

const StatContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const TextContent = styled.div`
  margin-right: 1rem;
`;

const StatValue = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const StatTitle = styled.p`
  font-size: 0.875rem;
  color: #a0aec0;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledIcon = styled.div`
  margin-bottom: 0.25rem;
  color: #a0aec0;
`;

const StatItem = ({ title, value, icons }) => (
  <StatItemWrapper>
    <StatContent>
      <TextContent>
        <StatValue>{value}</StatValue>
        <StatTitle>{title}</StatTitle>
      </TextContent>
      <IconWrapper>
        {icons.map((Icon, index) => (
          <StyledIcon key={index}>
            <Icon size={16} />
          </StyledIcon>
        ))}
      </IconWrapper>
    </StatContent>
  </StatItemWrapper>
);

const StatsDashboard = () => {
  return (
    <DashboardContainer>
      <StatsWrapper>
        <StatItem
          title="Supported countries"
          value="170+"
          icons={[DollarSign, Euro, Bitcoin, DollarSign]}
        />
        <StatItem
          title="Fiat currencies"
          value="50+"
          icons={[DollarSign, Euro, Euro]}
        />
        <StatItem
          title="Fiat payment channels"
          value="300+"
          icons={[DollarSign, Euro, Bitcoin, DollarSign]}
        />
        <StatItem
          title="Cryptocurrencies supported"
          value="ALL"
          icons={[Bitcoin, Euro, Bitcoin]}
        />
      </StatsWrapper>
    </DashboardContainer>
  );
};

export default StatsDashboard;
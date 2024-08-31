import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: #000; /* Black background */
  color: white;
  padding: 2rem;
  font-family: Arial, sans-serif;
  width: 80%;
  @media (max-width: 430px) {
    width: 100%;
  }
`;

const HappyCustomerSection = styled.section`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;

align-items: center;
justify-content: center;
`;

const SliderContainer = styled.div`
  position: relative;
  overflow: hidden;

  width: 80%;
  @media (max-width: 321px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 270px;
    margin-top: 7%;
  }
`;

const SliderWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  transform: ${({ currentIndex }) => `translateX(-${currentIndex * 100}%)`};
  
  @media (min-width: 1025px) {
    transform: none; /* Disable sliding on desktop */
    gap: 1rem;
  }
`;

const TestimonialCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-align: left;
  color: black;
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 1rem;
  min-width: 100%;
  flex-shrink: 0;
  margin-top: 2%;


  @media (min-width: 1025px) {
    min-width: auto; /* Reset width on desktop */
    flex: 1;

  }

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
    margin-top: 5%;
  }
  @media (max-width: 1024px) {

    margin-top: 15%;
  }

`;

const Avatar = styled.div`
  background-color: #8247e5;
  border-radius: 50%;
  border: 2px black solid;
  width: 50px;
  height: 50px;
  flex-shrink: 0;
 position: relative;
 top: -58%;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  @media (max-width: 1024px) {
    margin-bottom: 1rem;
    position: relative;
    top: -15%;
  }
  @media (max-width: 321px) {
    top: -12%;
  }
`;

const TestimonialContent = styled.div`
  flex: 1;

  h3 {
    margin: 0 0 0.5rem;
    font-size: 1.2rem;
  }

  p {
    margin: 0 0 0.5rem;
    font-size: 0.9rem;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
  font-size: 3rem;
  color: white;

  @media (max-width: 480px) {
    font-size: 3rem;
  }
`;

const Component = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  const testimonials = [
    {
      name: 'Sandeep Nailwal',
      title: 'Co-Founder Polygon',
      quote: "Thanks to Alchemy Pay, we can provide an essential gateway between fiat and crypto transactions. This development opens up new capital inroads that will propel users of polygon's DeFi ecosystem to the next level.",
      image: '/path/to/sandeep-image.jpg' // Replace with the actual image path
    },
    {
      name: 'John Doe',
      title: 'CEO, CryptoTech',
      quote: "Alchemy Pay has revolutionized our payment system. It's seamless integration of fiat and crypto has opened up new possibilities for our business.",
    },
    {
      name: 'Jane Smith',
      title: 'Blockchain Developer',
      quote: "Working with Alchemy Pay has been a game-changer. Their robust API and excellent support have made implementing crypto payments a breeze.",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobileOrTablet) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isMobileOrTablet, testimonials.length]);

  return (
    <Container>
      <HappyCustomerSection>
        <Title>Happy Customers</Title>
        <SliderContainer>
          <SliderWrapper currentIndex={currentIndex}>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index}>
                <Avatar>
                  {testimonial.image && <img src={testimonial.image} alt={testimonial.name} />}
                </Avatar>
                <TestimonialContent>
                  <h3>{testimonial.name}</h3>
                  <p>{testimonial.title}</p>
                  <p>{testimonial.quote}</p>
                </TestimonialContent>
              </TestimonialCard>
            ))}
          </SliderWrapper>
        </SliderContainer>
      </HappyCustomerSection>
    </Container>
  );
};

export default Component;

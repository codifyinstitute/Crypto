import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';
import Home from './Home';
import Home1 from './Home1';

const VantaContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const HomeContainer = () => {
    const vantaRef = useRef(null);

    useEffect(() => {
        const vantaEffect = NET({
            el: vantaRef.current,
            THREE: THREE,
           mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  color: 0xff3f81,
  backgroundColor: 0x0,
  points: 7.00,
  maxDistance: 17.00,
  spacing: 14.00
        });

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, []);

    return (
        <VantaContainer ref={vantaRef}>
            <ContentWrapper>
                <Home/>
                <Home1/>
            </ContentWrapper>
        </VantaContainer>
    );
}

export default HomeContainer;
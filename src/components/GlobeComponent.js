import React, { useEffect, useRef } from 'react';
import Globe from 'globe.gl';
import styled from 'styled-components';

const GlobeContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #000;
  z-index: -1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 1;
  padding: 20px;
  color: white;
`;

const GlobeComponent = () => {
  const globeEl = useRef(null);
  const globeRef = useRef(null);

  useEffect(() => {
    if (globeEl.current) {
      const N = 100;
      const arcsData = [...Array(N).keys()].map(() => ({
        startLat: (Math.random() - 0.5) * 180,
        startLng: (Math.random() - 0.5) * 360,
        endLat: (Math.random() - 0.5) * 180,
        endLng: (Math.random() - 0.5) * 360,
        color: [['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)], ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]]
      }));

      const globe = Globe()(globeEl.current)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
        .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
        .arcsData(arcsData)
        .arcColor('color')
        .arcDashLength(() => Math.random())
        .arcDashGap(() => Math.random())
        .arcDashAnimateTime(() => Math.random() * 4000 + 500)
        .arcStroke(0.2)
        .arcAltitude(0.10)
        .atmosphereColor('lightskyblue')
        .atmosphereAltitude(0.11)
        .enablePointerInteraction(false)
        .onGlobeClick(null)
        .onGlobeRightClick(null);

      globeRef.current = globe;

      const camera = globeRef.current.camera();
      const handleResize = () => {
        const { innerWidth: width, innerHeight: height } = window;

        globe.width(width).height(height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        if (width < 768) {
          camera.position.z = 500; // Further away for mobile view
        } else {
          camera.position.z = 350; // Closer for larger screens
        }

        camera.position.y = 0;
        globe.controls().enabled = false;
      };

      window.addEventListener('resize', handleResize);
      handleResize();

      let mouseX = 0;
      let mouseY = 0;
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;

      const handleMouseMove = (event) => {
        mouseX = (event.clientX - windowHalfX) / 100;
        mouseY = (event.clientY - windowHalfY) / 100;

        globe.scene().rotation.y += (mouseX - globe.scene().rotation.y) * 0.05;
        globe.scene().rotation.x += (-mouseY - globe.scene().rotation.x) * 0.05;
      };

      window.addEventListener('mousemove', handleMouseMove);

      const animate = () => {
        if (globeRef.current) {
          globe.scene().rotation.y += 0.001;
          camera.lookAt(globe.scene().position);
          globeRef.current.renderer().render(globe.scene(), camera);
        }
        requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        globeRef.current = null;
      };
    } else {
      console.error("globeEl.current is null. Unable to render globe.");
    }
  }, []);

  return (
    <>
      <GlobeContainer ref={globeEl} />
      <ContentContainer>
        {/* Your page content goes here */}
      </ContentContainer>
    </>
  );
};

export default GlobeComponent;

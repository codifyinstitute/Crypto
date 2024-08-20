import React, { useEffect, useRef } from 'react';
import Globe from 'globe.gl';
import styled from 'styled-components';
import * as THREE from 'three';

const GlobeContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #000;
`;

const GlobeComponent = () => {
    const globeEl = useRef(null);
    const globeRef = useRef(null);

    useEffect(() => {
        if (globeEl.current) {
            const N = 10; // Reduced the number of arcs for optimization
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
                .arcStroke(0.2) // Reduced stroke for optimization
                .arcAltitude(0.10) // Reduced altitude for optimization
                .atmosphereColor('lightskyblue')
                .atmosphereAltitude(0.11) // Reduced atmosphere altitude for optimization
                .enablePointerInteraction(false) // Disabled pointer interaction to reduce computation
                .onGlobeClick(null)
                .onGlobeRightClick(null);

            globeRef.current = globe;

            const handleResize = () => {
                globe.width(globeEl.current.clientWidth)
                     .height(globeEl.current.clientHeight);
            };

            window.addEventListener('resize', handleResize);
            handleResize();

            let mouseX = 0;
            let mouseY = 0;
            const windowHalfX = window.innerWidth / 2;
            const windowHalfY = window.innerHeight / 2;

            const handleMouseMove = (event) => {
                mouseX = (event.clientX - windowHalfX) / 100; // Reduced sensitivity for optimization
                mouseY = (event.clientY - windowHalfY) / 100; // Reduced sensitivity for optimization
            };

            window.addEventListener('mousemove', handleMouseMove);

            const animate = () => {
                if (globeRef.current) {
                    const camera = globeRef.current.camera();
                    camera.position.x += (mouseX - camera.position.x) * 0.05; // Reduced movement speed for optimization
                    camera.position.y += (-mouseY - camera.position.y) * 0.05; // Reduced movement speed for optimization
                    camera.lookAt(globe.scene().position);

                    globe.scene().rotation.y += 0.0005; // Reduced rotation speed for optimization

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

    return <GlobeContainer ref={globeEl} />;
};

export default GlobeComponent;

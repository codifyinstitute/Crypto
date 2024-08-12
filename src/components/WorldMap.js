import React, { useState } from 'react';
import WorldMap from 'react-svg-worldmap';
import styled from 'styled-components';

const MapContainer = styled.div`
  width: 100%;
  max-width: 800px; /* Adjust as needed */
  height: 0;
  padding-bottom: 50%; /* Maintain aspect ratio */
  margin: 2rem auto;
  position: relative;
  background: none; /* Remove background color */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Optional: add a shadow for better visibility */
`;

const StyledWorldMap = styled(WorldMap)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .land {
    fill: white;
    transition: fill 0.3s;
  }
  .selected-country {
    fill: #ffa500; // Orange color
  }
`;

const Tooltip = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  pointer-events: none;
  transform: translate(-50%, -100%); /* Position above the cursor */
`;

const CustomWorldMap = () => {
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // List of all country codes
  const allCountryCodes = ["af","al","dz","ao","ar","am","au","at","az","bs","bh","bd","by","be","bz","bj","bt","bo","ba","bw","br","bn","bg","bf","bi","kh","cm","ca","cf","td","cl","cn","co","cg","cd","cr","hr","cu","cy","cz","ci","dk","dj","do","ec","eg","sv","gq","er","ee","et","fj","fi","fr","ga","gm","ge","de","gh","gr","gt","gn","gw","gy","ht","hn","hu","is","in","id","ir","iq","ie","il","it","jm","jp","jo","kz","ke","kp","kr","kw","kg","la","lv","lb","ls","lr","ly","lt","lu","mk","mg","mw","my","ml","mr","mx","md","mn","me","ma","mz","mm","na","np","nl","nz","ni","ne","ng","no","om","pk","pa","pg","py","pe","ph","pl","pt","qa","ro","ru","rw","sa","sn","rs","sl","sg","sk","si","sb","so","za","ss","es","lk","sd","sr","sz","se","ch","sy","tw","tj","tz","th","tl","tg","tt","tn","tr","tm","ug","ua","ae","gb","us","uy","uz","ve","vn","ye","zm","zw"];

  const data = allCountryCodes.map(code => ({ country: code, value: 1 }));

  const handleHover = (event, countryName, isoCode, value, prefix, suffix) => {
    setTooltipContent(countryName);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <MapContainer>
      <StyledWorldMap
        data={data}
        styleFunction={() => ({
          fill: '#ffa500',
          stroke: 'black',
          strokeWidth: 0.5,
        })}
        backgroundColor="transparent" // Remove background color
        onHover={handleHover}
      />
      {tooltipContent && (
        <Tooltip style={{ left: tooltipPosition.x, top: tooltipPosition.y }}>
          {tooltipContent}
        </Tooltip>
      )}
    </MapContainer>
  );
};

export default CustomWorldMap;

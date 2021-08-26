import React, { useState } from 'react';
import styled from '@emotion/styled';

interface Props {
  initialHue: number
  initialSaturation: number
  initialBrightness: number
  onUpdateValue: (hue: number, saturation: number, brightness: number) => void
}

const ColorPicker: React.FC<Props> = ({
  initialHue,
  initialSaturation,
  initialBrightness,
  onUpdateValue
}) => {
  const [hue, setHue] = useState(initialHue);
  const [saturation, setSaturation] = useState(initialSaturation);
  const [brightness, setBrightness] = useState(initialBrightness);

  const [r, g, b] = HSBToRGB(hue, saturation, brightness);
  const previewColor = `rgb(${r}, ${g}, ${b})`;

  const handleUpdateHue = (updatedHue: number) => {
    setHue(updatedHue);
    onUpdateValue(updatedHue, saturation, brightness);
  };

  const handleUpdateSaturation = (updatedSaturation: number) => {
    setSaturation(updatedSaturation);
    onUpdateValue(hue, updatedSaturation, brightness);
  };

  const handleUpdateBrightness = (updatedBrightness: number) => {
    setBrightness(updatedBrightness);
    onUpdateValue(hue, saturation, updatedBrightness);
  };

  return (
    <Container>
      <ColorPreview style={{ backgroundColor: previewColor }} />
      <Controls>
        <ColorComponent>
          <ComponentTitle>H:</ComponentTitle>
          <ComponentSlider
            type="range"
            min="0"
            max="360"
            value={hue}
            onChange={e => handleUpdateHue(parseInt(e.target.value))}
          />
          <ComponentValue
            type="number"
            min="0"
            max="360"
            value={hue}
            onChange={e => handleUpdateHue(parseInt(e.target.value))}
          />
        </ColorComponent>
        <ColorComponent>
          <ComponentTitle>S:</ComponentTitle>
          <ComponentSlider
            type="range"
            min="0"
            max="100"
            value={saturation}
            onChange={e => handleUpdateSaturation(parseInt(e.target.value))}
          />
          <ComponentValue
            type="number"
            min="0"
            max="100"
            value={saturation}
            onChange={e => handleUpdateSaturation(parseInt(e.target.value))}
          />
        </ColorComponent>
        <ColorComponent>
          <ComponentTitle>B:</ComponentTitle>
          <ComponentSlider
            type="range"
            min="0"
            max="100"
            value={brightness}
            onChange={e => handleUpdateBrightness(parseInt(e.target.value))}
          />
          <ComponentValue
            type="number"
            min="0"
            max="100"
            value={brightness}
            onChange={e => handleUpdateBrightness(parseInt(e.target.value))}
          />
        </ColorComponent>
      </Controls>
    </Container>
  );
};

export default ColorPicker;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
`;

const ColorPreview = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 4px;
`;

const Controls = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ColorComponent = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
`;

const ComponentTitle = styled.span`
  display: inline-block;
  font-weight: bold;
  width: 24px;
`;

const ComponentSlider = styled.input`
  width: 100px;
  margin-left: 10px;
  margin-right: 15px;
`;

const ComponentValue = styled.input`
  width: 50px;
  text-align: center;
  padding: 0;
`;

// Courtesy of https://www.30secondsofcode.org/js/s/hsb-to-rgb
function HSBToRGB(h: number, s: number, b: number): [r: number, g: number, b: number] {
  s /= 100;
  b /= 100;
  const k = (n: number) => (n + h / 60) % 6;
  const f = (n: number) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};
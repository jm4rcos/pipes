import { useState } from "react";
import PropTypes from "prop-types";

const PipesOptions = ({ onChange }) => {
  const [numLines, setNumLines] = useState(2);
  const [lineSpeed, setLineSpeed] = useState(10);
  const [turnProbability, setTurnProbability] = useState(0.05);
  const [smoothTrails, setSmoothTrails] = useState(false);
  const [trailLength, setTrailLength] = useState(400);
  const [clearAfter, setClearAfter] = useState(null);

  const handleUpdate = () => {
    onChange({
      numLines,
      lineSpeed,
      turnProbability,
      smoothTrails,
      trailLength,
      clearAfter,
    });
  };

  return (
    <div>
      <input
        type="number"
        value={numLines}
        onChange={(e) => setNumLines(Number(e.target.value))}
        placeholder="Número de Linhas"
      />
      <input
        type="number"
        value={lineSpeed}
        onChange={(e) => setLineSpeed(Number(e.target.value))}
        placeholder="Velocidade das Linhas"
      />
      <input
        type="number"
        step="0.01"
        value={turnProbability}
        onChange={(e) => setTurnProbability(Number(e.target.value))}
        placeholder="Probabilidade de Mudança"
      />
      <input
        type="checkbox"
        checked={smoothTrails}
        onChange={(e) => setSmoothTrails(e.target.checked)}
      />{" "}
      Smooth Trails
      <input
        type="number"
        value={trailLength}
        onChange={(e) => setTrailLength(Number(e.target.value))}
        placeholder="Comprimento do Rastro"
      />
      <input
        type="number"
        value={clearAfter}
        onChange={(e) => setClearAfter(Number(e.target.value))}
        placeholder="Limpar Após (ms)"
      />
      <button onClick={handleUpdate}>Atualizar</button>
    </div>
  );
};

PipesOptions.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default PipesOptions;

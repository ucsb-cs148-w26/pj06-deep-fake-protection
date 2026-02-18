const LEVELS = {
  1: { name: 'Subtle', description: 'Light Gaussian noise. Nearly invisible, basic protection against simple AI scrapers.' },
  2: { name: 'Moderate', description: 'Medium Gaussian noise. Still very subtle, improved disruption of AI feature extraction.' },
  3: { name: 'Standard', description: 'Gaussian noise + color channel perturbation. Good balance of invisibility and protection.' },
  4: { name: 'Strong', description: 'Gaussian noise + high-frequency adversarial pattern. Targets CNN feature extractors directly.' },
  5: { name: 'Maximum', description: 'Full stack: Gaussian + color shift + adversarial pattern + JPEG artifact amplification.' },
};

function ProtectionSlider({ value, onChange }) {
  const level = LEVELS[value];

  return (
    <div className="protection-slider">
      <div className="protection-header">
        <span className="protection-label">Protection Level</span>
        <span className="protection-badge">
          Level {value} &mdash; {level.name}
        </span>
      </div>
      <input
        type="range"
        min="1"
        max="5"
        step="1"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="protection-input"
      />
      <div className="protection-levels">
        <span>Subtle</span>
        <span>Moderate</span>
        <span>Standard</span>
        <span>Strong</span>
        <span>Maximum</span>
      </div>
      <div className="protection-description">{level.description}</div>
    </div>
  );
}

export default ProtectionSlider;

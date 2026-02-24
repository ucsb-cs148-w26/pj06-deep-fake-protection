import { useEffect, useState } from 'react';
import ExportFormatModal from './ExportFormatModal';

function ComparisonView({
  originalBuffer,
  protectedBuffer,
  fileName,
  psnr,
  similarity,
  onSaveToLibrary,
  onExport,
  onProcessAnother,
}) {
  const [originalUrl, setOriginalUrl] = useState(null);
  const [protectedUrl, setProtectedUrl] = useState(null);
  const [showFormatModal, setShowFormatModal] = useState(false);

  useEffect(() => {
    if (originalBuffer) {
      const blob = new Blob([originalBuffer], { type: 'image/jpeg' });
      const url = URL.createObjectURL(blob);
      setOriginalUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [originalBuffer]);

  useEffect(() => {
    if (protectedBuffer) {
      const blob = new Blob([protectedBuffer], { type: 'image/jpeg' });
      const url = URL.createObjectURL(blob);
      setProtectedUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [protectedBuffer]);

  if (!originalUrl || !protectedUrl) return null;

  return (
    <div className="comparison-view">
      <div className="comparison-container">
        <div className="comparison-images">
          <div className="comparison-side">
            <span className="comparison-side-label left">Original</span>
            <img src={originalUrl} alt="Original" className="comparison-image" />
          </div>
          <div className="comparison-side">
            <span className="comparison-side-label right">Protected</span>
            <img src={protectedUrl} alt="Protected" className="comparison-image" />
          </div>
        </div>
      </div>

      {similarity != null && psnr != null && (
        <div className="similarity-panel">
          <div className="similarity-stat">
            <span className="similarity-label">Visual Similarity</span>
            <span className="similarity-value">{similarity.toFixed(1)}%</span>
          </div>
          <div className="similarity-divider" />
          <div className="similarity-stat">
            <span className="similarity-label">PSNR</span>
            <span className="similarity-value">{psnr.toFixed(1)} dB</span>
          </div>
          <div className="similarity-divider" />
          <div className="similarity-stat">
            <span className="similarity-label">Imperceptibility</span>
            <span className={`similarity-badge ${similarity >= 99 ? 'excellent' : similarity >= 97 ? 'good' : 'moderate'}`}>
              {similarity >= 99 ? 'Excellent' : similarity >= 97 ? 'Good' : 'Moderate'}
            </span>
          </div>
        </div>
      )}

      <div className="comparison-actions">
        <button className="btn btn-primary" onClick={onSaveToLibrary}>
          Save to Library
        </button>
        <button className="btn btn-secondary" onClick={() => setShowFormatModal(true)}>
          Export As
        </button>
        <button className="btn btn-secondary" onClick={onProcessAnother}>
          Process Another
        </button>
      </div>

      {showFormatModal && (
        <ExportFormatModal
          onConfirm={(fmt) => { setShowFormatModal(false); onExport(fmt); }}
          onClose={() => setShowFormatModal(false)}
        />
      )}
    </div>
  );
}

export default ComparisonView;

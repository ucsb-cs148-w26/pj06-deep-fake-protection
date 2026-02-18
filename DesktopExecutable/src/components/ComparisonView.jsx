import { useEffect, useState } from 'react';

function ComparisonView({
  originalBuffer,
  protectedBuffer,
  fileName,
  onSaveToLibrary,
  onExport,
  onProcessAnother,
}) {
  const [originalUrl, setOriginalUrl] = useState(null);
  const [protectedUrl, setProtectedUrl] = useState(null);

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

      <div className="comparison-actions">
        <button className="btn btn-primary" onClick={onSaveToLibrary}>
          Save to Library
        </button>
        <button className="btn btn-secondary" onClick={onExport}>
          Export
        </button>
        <button className="btn btn-secondary" onClick={onProcessAnother}>
          Process Another
        </button>
      </div>
    </div>
  );
}

export default ComparisonView;

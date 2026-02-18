import { useEffect, useState } from 'react';

function PhotoModal({ entry, onClose, onDelete, onExport }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [showOriginal, setShowOriginal] = useState(false);
  const [originalUrl, setOriginalUrl] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    window.electronAPI
      .libraryGetImageDataUrl(entry.id, 'protected')
      .then(setImageUrl)
      .catch(() => {});
  }, [entry.id]);

  useEffect(() => {
    if (showOriginal && !originalUrl) {
      window.electronAPI
        .libraryGetImageDataUrl(entry.id, 'original')
        .then(setOriginalUrl)
        .catch(() => {});
    }
  }, [showOriginal, entry.id, originalUrl]);

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    onDelete(entry.id);
  };

  const date = new Date(entry.processedAt).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{entry.originalFilename}</span>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>

        {showOriginal && originalUrl && imageUrl ? (
          <div className="comparison-images" style={{ marginBottom: 16, borderRadius: 8, overflow: 'hidden' }}>
            <div className="comparison-side">
              <span className="comparison-side-label left">Original</span>
              <img src={originalUrl} alt="Original" className="comparison-image" />
            </div>
            <div className="comparison-side">
              <span className="comparison-side-label right">Protected</span>
              <img src={imageUrl} alt="Protected" className="comparison-image" />
            </div>
          </div>
        ) : imageUrl ? (
          <img src={imageUrl} alt={entry.originalFilename} className="modal-image" />
        ) : null}

        <div className="modal-meta">
          <span>{date}</span>
          <span>Level {entry.protectionLevel}</span>
          <span>
            {entry.width} &times; {entry.height}
          </span>
        </div>

        <div className="modal-actions">
          <button
            className="btn btn-secondary"
            onClick={() => setShowOriginal(!showOriginal)}
          >
            {showOriginal ? 'Protected Only' : 'Compare Side-by-Side'}
          </button>
          <button className="btn btn-primary" onClick={() => onExport(entry.id)}>
            Export
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            {confirmDelete ? 'Confirm Delete' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PhotoModal;

import { useEffect, useState } from 'react';

function PhotoCard({ entry, onClick }) {
  const [thumbUrl, setThumbUrl] = useState(null);

  useEffect(() => {
    let cancelled = false;
    window.electronAPI.libraryGetImageDataUrl(entry.id, 'thumbnail').then((dataUrl) => {
      if (!cancelled) setThumbUrl(dataUrl);
    }).catch(() => {});
    return () => { cancelled = true; };
  }, [entry.id]);

  const date = new Date(entry.processedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="photo-card" onClick={() => onClick(entry)}>
      {thumbUrl ? (
        <img src={thumbUrl} alt={entry.originalFilename} className="photo-card-thumb" />
      ) : (
        <div className="photo-card-thumb" />
      )}
      <div className="photo-card-info">
        <div className="photo-card-name">{entry.originalFilename}</div>
        <div className="photo-card-meta">
          <span className="photo-card-date">{date}</span>
          <span className="photo-card-level">Lvl {entry.protectionLevel}</span>
        </div>
      </div>
    </div>
  );
}

export default PhotoCard;

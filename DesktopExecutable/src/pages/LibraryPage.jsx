import { useState } from 'react';
import PhotoCard from '../components/PhotoCard';
import PhotoModal from '../components/PhotoModal';
import { usePhotoLibrary } from '../hooks/usePhotoLibrary';

function LibraryPage() {
  const { images, loading, deleteImage, exportImage } = usePhotoLibrary();
  const [selectedEntry, setSelectedEntry] = useState(null);

  if (loading) {
    return (
      <div className="library-page">
        <h1>Photo Library</h1>
        <div className="processing-indicator">
          <div className="spinner" />
          <div className="processing-text">Loading library...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="library-page">
      <h1>Photo Library</h1>

      {images.length === 0 ? (
        <div className="empty-state">
          <svg className="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <h2>No protected images yet</h2>
          <p>Upload your first image to get started.</p>
        </div>
      ) : (
        <div className="library-grid">
          {images.map((entry) => (
            <PhotoCard
              key={entry.id}
              entry={entry}
              onClick={setSelectedEntry}
            />
          ))}
        </div>
      )}

      {selectedEntry && (
        <PhotoModal
          entry={selectedEntry}
          onClose={() => setSelectedEntry(null)}
          onDelete={async (id) => {
            await deleteImage(id);
            setSelectedEntry(null);
          }}
          onExport={exportImage}
        />
      )}
    </div>
  );
}

export default LibraryPage;

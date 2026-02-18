import { useState, useEffect } from 'react';
import { usePhotoLibrary } from '../hooks/usePhotoLibrary';

function SettingsPage() {
  const [settings, setSettings] = useState({
    defaultProtectionLevel: 3,
    libraryPath: '',
  });
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const { images, clearAll } = usePhotoLibrary();

  useEffect(() => {
    window.electronAPI.getSettings().then(setSettings).catch(() => {});
  }, []);

  const handleLevelChange = async (e) => {
    const level = Number(e.target.value);
    const updated = { ...settings, defaultProtectionLevel: level };
    setSettings(updated);
    await window.electronAPI.updateSettings({ defaultProtectionLevel: level });
  };

  const handleClearLibrary = async () => {
    await clearAll();
    setShowClearConfirm(false);
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>

      <div className="settings-section">
        <div className="settings-section-title">Default Protection Level</div>
        <div className="settings-row">
          <span className="settings-label">
            Applied when processing new images
          </span>
          <select
            className="settings-select"
            value={settings.defaultProtectionLevel}
            onChange={handleLevelChange}
          >
            <option value={1}>Level 1 — Subtle</option>
            <option value={2}>Level 2 — Moderate</option>
            <option value={3}>Level 3 — Standard</option>
            <option value={4}>Level 4 — Strong</option>
            <option value={5}>Level 5 — Maximum</option>
          </select>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-section-title">Photo Library</div>
        <div className="settings-row">
          <span className="settings-label">Storage location</span>
          <span className="settings-value">
            {settings.libraryPath || '~/Library/Application Support/'}
          </span>
        </div>
        <div className="settings-row">
          <span className="settings-label">
            {images.length} protected image{images.length !== 1 ? 's' : ''}
          </span>
          <button
            className="btn btn-secondary"
            onClick={() => window.electronAPI.openInFinder()}
          >
            Open in Finder
          </button>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-section-title">Danger Zone</div>
        {showClearConfirm ? (
          <div className="confirm-dialog" style={{ marginTop: 8 }}>
            <h3>Clear Library?</h3>
            <p>
              This will permanently delete all {images.length} protected images
              from the library. This cannot be undone.
            </p>
            <div className="confirm-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowClearConfirm(false)}
              >
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleClearLibrary}>
                Delete All
              </button>
            </div>
          </div>
        ) : (
          <div className="settings-row">
            <span className="settings-label">
              Remove all images from library
            </span>
            <button
              className="btn btn-danger"
              onClick={() => setShowClearConfirm(true)}
              disabled={images.length === 0}
            >
              Clear Library
            </button>
          </div>
        )}
      </div>

      <div className="settings-section">
        <div className="settings-section-title">About</div>
        <div className="settings-row">
          <span className="settings-label">Version</span>
          <span className="settings-value">1.0.0</span>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;

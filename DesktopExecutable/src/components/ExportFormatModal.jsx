import { useState } from 'react';

const FORMATS = [
  { mime: 'image/jpeg', name: 'JPEG', desc: 'Smaller file, lossy' },
  { mime: 'image/png',  name: 'PNG',  desc: 'Lossless, larger file' },
];

export default function ExportFormatModal({ onConfirm, onClose }) {
  const [selected, setSelected] = useState('image/jpeg');

  return (
    <div className="captcha-overlay" onClick={onClose}>
      <div className="captcha-modal export-format-modal" onClick={e => e.stopPropagation()}>
        <h3>Export As</h3>
        <div className="format-options">
          {FORMATS.map(f => (
            <div
              key={f.mime}
              className={`format-option${selected === f.mime ? ' selected' : ''}`}
              onClick={() => setSelected(f.mime)}
            >
              <div className="format-option-name">{f.name}</div>
              <div className="format-option-desc">{f.desc}</div>
            </div>
          ))}
        </div>
        <div className="captcha-actions">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={() => onConfirm(selected)}>Export</button>
        </div>
      </div>
    </div>
  );
}

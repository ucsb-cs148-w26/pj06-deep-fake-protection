import { useState, useRef } from 'react';

function ImageDropzone({ onFileSelected }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const ACCEPTED_TYPES = ['image/jpeg', 'image/png'];

  const validateAndSelect = (file) => {
    setError('');
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Please upload a JPEG or PNG image.');
      setFileName('');
      if (inputRef.current) inputRef.current.value = '';
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      onFileSelected({
        name: file.name,
        type: file.type,
        buffer: reader.result,
      });
    };
    reader.readAsArrayBuffer(file);
  };

  const handleChange = (e) => {
    validateAndSelect(e.target.files[0]);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      validateAndSelect(files[0]);
    }
  };

  return (
    <div>
      <div
        className={`dropzone ${isDragOver ? 'drag-over' : ''}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleChange}
          className="dropzone-input"
        />
        <div className="dropzone-content">
          <div className="dropzone-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <span className="dropzone-primary">
            {isDragOver
              ? 'Drop your image here'
              : 'Drag and drop your image here, or click to browse'}
          </span>
          <span className="dropzone-secondary">
            Supports JPEG and PNG formats
          </span>
        </div>
        {fileName && (
          <div className="dropzone-file-info">
            <span>&#10003; {fileName}</span>
          </div>
        )}
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default ImageDropzone;

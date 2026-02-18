import { useState, useEffect } from 'react';
import ImageDropzone from '../components/ImageDropzone';
import ProtectionSlider from '../components/ProtectionSlider';
import ProcessingIndicator from '../components/ProcessingIndicator';
import ComparisonView from '../components/ComparisonView';
import { useImageProcessor } from '../hooks/useImageProcessor';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [protectionLevel, setProtectionLevel] = useState(3);
  const [savedToLibrary, setSavedToLibrary] = useState(false);
  const { isProcessing, result, error, process, reset } = useImageProcessor();

  // Load default protection level from settings
  useEffect(() => {
    window.electronAPI.getSettings().then((settings) => {
      if (settings.defaultProtectionLevel) {
        setProtectionLevel(settings.defaultProtectionLevel);
      }
    }).catch(() => {});
  }, []);

  const handleFileSelected = (fileData) => {
    setFile(fileData);
    setSavedToLibrary(false);
  };

  const handleProcess = async () => {
    if (!file) return;
    await process(file.buffer, protectionLevel);
  };

  const handleSaveToLibrary = async () => {
    if (!file || !result) return;
    try {
      await window.electronAPI.libraryAdd(file.buffer, result.buffer, {
        originalFilename: file.name,
        protectionLevel,
        width: result.width,
        height: result.height,
      });
      setSavedToLibrary(true);
    } catch {
      // silently fail
    }
  };

  const handleExport = async () => {
    if (!result) return;
    const filePath = await window.electronAPI.showSaveDialog(
      `protected_${file?.name || 'image.jpg'}`
    );
    if (filePath) {
      await window.electronAPI.saveBufferToFile(result.buffer, filePath);
    }
  };

  const handleProcessAnother = () => {
    setFile(null);
    setSavedToLibrary(false);
    reset();
  };

  // State: processing
  if (isProcessing) {
    return (
      <div className="upload-page">
        <h1>Protect Your Image</h1>
        <p className="subtitle">Applying protection to your image</p>
        <ProcessingIndicator level={protectionLevel} />
      </div>
    );
  }

  // State: result ready
  if (result) {
    return (
      <div className="upload-page">
        <h1>Protection Complete</h1>
        <p className="subtitle">
          Level {protectionLevel} protection applied
          {savedToLibrary && ' — Saved to library'}
        </p>
        <ComparisonView
          originalBuffer={file?.buffer}
          protectedBuffer={result.buffer}
          fileName={file?.name}
          psnr={result.psnr}
          similarity={result.similarity}
          onSaveToLibrary={handleSaveToLibrary}
          onExport={handleExport}
          onProcessAnother={handleProcessAnother}
        />
      </div>
    );
  }

  // State: upload
  return (
    <div className="upload-page">
      <h1>Protect Your Image</h1>
      <p className="subtitle">
        Upload your image to apply AI-resistant protection
      </p>

      <ImageDropzone onFileSelected={handleFileSelected} />

      <ProtectionSlider value={protectionLevel} onChange={setProtectionLevel} />

      {error && <div className="error-message">{error}</div>}

      <button
        className="process-btn"
        disabled={!file}
        onClick={handleProcess}
      >
        {file ? 'Apply Protection' : 'Select an image to start'}
      </button>
    </div>
  );
}

export default UploadPage;

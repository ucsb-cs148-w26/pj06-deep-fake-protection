import { useState, useEffect, useCallback } from 'react';
import ImageDropzone from '../components/ImageDropzone';
import ProtectionSlider from '../components/ProtectionSlider';
import ProcessingIndicator from '../components/ProcessingIndicator';
import ComparisonView from '../components/ComparisonView';
import { useImageProcessor } from '../hooks/useImageProcessor';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [protectionLevel, setProtectionLevel] = useState(3);
  const [savedToLibrary, setSavedToLibrary] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaNum1, setCaptchaNum1] = useState(0);
  const [captchaNum2, setCaptchaNum2] = useState(0);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const { isProcessing, result, error, process, reset } = useImageProcessor();

  const startCaptcha = useCallback(() => {
    setCaptchaNum1(Math.floor(Math.random() * 10) + 1);
    setCaptchaNum2(Math.floor(Math.random() * 10) + 1);
    setCaptchaInput('');
    setCaptchaError('');
    setShowCaptcha(true);
  }, []);

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

  const doProcess = async () => {
    if (!file) return;
    await process(file.buffer, protectionLevel);
  };

  const handleProcess = () => {
    if (!file) return;
    startCaptcha();
  };

  const handleCaptchaVerify = () => {
    const expected = captchaNum1 + captchaNum2;
    const answer = parseInt(captchaInput.trim(), 10);
    if (answer === expected) {
      setShowCaptcha(false);
      setCaptchaError('');
      doProcess();
    } else {
      setCaptchaError('Incorrect. Please try again.');
    }
  };

  const handleCloseCaptcha = () => {
    setShowCaptcha(false);
    setCaptchaError('');
    setCaptchaInput('');
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

  const handleExport = async (format) => {
    if (!result) return;
    const ext = format === 'image/png' ? 'png' : 'jpg';
    const baseName = (file?.name || 'image.jpg').replace(/\.[^.]+$/, '');
    const filePath = await window.electronAPI.showSaveDialog(`protected_${baseName}.${ext}`, format);
    if (filePath) {
      await window.electronAPI.saveBufferToFile(result.buffer, filePath, format);
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

      {showCaptcha && (
        <div className="captcha-overlay" onClick={handleCloseCaptcha}>
          <div className="captcha-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="captcha-title">Verify you're human</h3>
            <p className="captcha-question">
              What is {captchaNum1} + {captchaNum2}?
            </p>
            <input
              type="number"
              className="captcha-input"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCaptchaVerify()}
              placeholder="Enter answer"
              autoFocus
            />
            {captchaError && <p className="captcha-error">{captchaError}</p>}
            <div className="captcha-actions">
              <button type="button" className="btn btn-secondary" onClick={handleCloseCaptcha}>
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={handleCaptchaVerify}>
                Verify & Apply Protection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadPage;

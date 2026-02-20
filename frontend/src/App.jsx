import "./App.css";
import { useState, useCallback, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import UploadGuidelines from "../FileUploadGuidelines";
import HowItWorks from "./HowItWorks.jsx";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
  const [fileName, setFileName] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const recaptchaRef = useRef(null);

  const startCaptcha = useCallback(() => {
    setCaptchaError("");
    setShowCaptcha(true);
  }, []);

  const handleRecaptchaVerify = useCallback((token) => {
    if (token) {
      setShowCaptcha(false);
      setCaptchaError("");
      recaptchaRef.current?.reset();
      handleConfirmUpload();
    }
  }, []);

  const handleRecaptchaExpired = useCallback(() => {
    setCaptchaError("Verification expired. Please complete the captcha again.");
    recaptchaRef.current?.reset();
  }, []);

  // Now safe to do a conditional render — all hooks have already been called
  if (currentPage === "about") {
    return <HowItWorks goBack={() => setCurrentPage("home")} />;
  }

  const processFile = (file, inputElement = null) => {
    setErrorMessage("");
    if (file) {
      // Check if the MIME type is NOT jpeg
      if (file.type !== "image/jpeg") {
        setErrorMessage("Invalid file type. Please upload a JPEG image.");
        setSelectedFile(null);
        setFileName("");
        if (inputElement) inputElement.value = "";
      } else {
        // File is valid
        setSelectedFile(file);
        setFileName(file.name);
      }
    }
  };

  // Handle file selection from input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    processFile(file, e.target);
  };

  // Drag and drop event handlers
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
    // Only set false if we're actually leaving the drop zone
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
      processFile(files[0]);
    }
  };

  // 3. Intercept the "Upload" button click
  const handleUploadClick = (e) => {
    e.preventDefault(); // Stop form submission
    
    // Check if a file is selected (this will be null if validation failed)
    if (!selectedFile) {
      alert("Please select a valid JPEG file first!");
      return;
    }

    // Open the confirmation modal
    setShowModal(true);
  };

  const handleYesUploadClick = () => {
    startCaptcha();
  };

  const handleConfirmUpload = async () => {
    setShowModal(false);
    setShowCaptcha(false);
    
    if (!selectedFile) return;
    
    setIsProcessing(true);
    setErrorMessage("");
    
    try {
      // Create FormData to send file to backend
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      // Send to FastAPI backend
      const response = await fetch('https://pj06-deep-fake-protection.onrender.com/process-image', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: `Server error: ${response.status}` }));
        throw new Error(errorData.detail || `Server error: ${response.status}`);
      }
      
      // Get the protected image as a blob
      const blob = await response.blob();
      
      // Create download link for the protected image
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `protected_${selectedFile.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      alert("Success! Your protected image has been downloaded.");
      
      // Reset form
      setSelectedFile(null);
      setFileName("");
      
    } catch (error) {
      console.error('Upload failed:', error);
      setErrorMessage(error.message || 'Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowCaptcha(false);
    setCaptchaError("");
    recaptchaRef.current?.reset();
  };

  return (
    <div className="landing-container">
      {/* Navigation Bar */}
      <nav className="top-nav">
        <button className="nav-link-btn" onClick={() => setCurrentPage("about")}>
          How It Works
        </button>
      </nav>

      <header className="hero">
        <h1 className="name">Deepfake Protection</h1>
        <p className="subtitle">
          Upload your image to get one step closer to digital protection!
        </p>
      </header>

      <section className="content-section">
        <form onSubmit={(e) => { e.preventDefault(); handleUploadClick(e); }} className="upload-form">
          <div 
            className={`upload-area ${isDragOver ? 'drag-over' : ''}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-upload"
              name="file"
              accept="image/jpeg"
              onChange={handleFileChange}
              className="file-input"
            />
            <label htmlFor="file-upload" className="upload-label">
              <div className="upload-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              </div>
              <div className="upload-text">
                <span className="upload-primary">
                  {isDragOver ? 'Drop your image here' : 'Drag and drop your image here, or click to browse'}
                </span>
                <span className="upload-secondary">
                  Supports JPEG image format only
                </span>
              </div>
            </label>
            {fileName && (
              <div className="file-selected">
                <span className="file-name">✓ {fileName}</span>
              </div>
            )}
          </div>
          
          {/* Error Message Display */}
          {errorMessage && (
            <div className="error-message">
              {errorMessage}
            </div>
          )}
          
          {selectedFile && (
            <button 
              type="submit" 
              className="upload-btn"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Process Image"}
            </button>
          )}
        </form>

        <div className="guidelines-container">
          <h2>Upload guidelines</h2>
          <UploadGuidelines/>
        </div>
      </section>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            {showCaptcha ? (
              <>
                <h3>Verify you're human</h3>
                <p className="captcha-hint">Complete the captcha below to continue.</p>
                <div className="recaptcha-wrapper">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={RECAPTCHA_SITE_KEY}
                    onChange={handleRecaptchaVerify}
                    onExpired={handleRecaptchaExpired}
                    theme="light"
                  />
                </div>
                {captchaError && <p className="captcha-error">{captchaError}</p>}
                <div className="modal-actions">
                  <button className="modal-btn cancel" onClick={handleCloseModal}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3>Final Confirmation</h3>
                <p>
                  Does your image follow the guidelines listed on the page?
                </p>
                <div className="modal-actions">
                  <button className="modal-btn cancel" onClick={handleCloseModal}>
                    No, Go Back
                  </button>
                  <button className="modal-btn confirm" onClick={handleYesUploadClick}>
                    Yes, Upload
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
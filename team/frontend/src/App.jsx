import "./App.css";
import { useState } from "react";

function App() {

  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  
  // State for error messages
  const [errorMessage, setErrorMessage] = useState("");

  // Process file with validation (shared by input and drag-drop)
  const processFile = (file, inputElement = null) => {
    setErrorMessage(""); // Reset error on new attempt

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

  // 4. Final action if user says "Yes"
  const handleConfirmUpload = () => {
    setShowModal(false);
    
    // --- UPLOAD LOGIC GOES HERE ---
    console.log("Uploading file:", selectedFile.name);
    alert("Upload Successful!");
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="landing-container">
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
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
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
            <button type="submit" className="upload-btn">
              Process Image
            </button>
          )}
        </form>

        <div className="guidelines-container">
          <h2>Upload guidelines</h2>
          <textarea
            className="guidelines-textarea"
            placeholder=" " //Add guidelines here later
          />
        </div>
      </section>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Final Confirmation</h3>
            <p>
              Does your image follow the guidelines listed on the page?
            </p>
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={handleCloseModal}>
                No, Go Back
              </button>
              <button className="modal-btn confirm" onClick={handleConfirmUpload}>
                Yes, Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
import "./App.css";
import { useState } from "react";

function App() {

  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // 1. NEW: State for error messages
  const [errorMessage, setErrorMessage] = useState("");

  // 2. UPDATED: Track file selection with validation
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setErrorMessage(""); // Reset error on new attempt

    if (file) {
      // Check if the MIME type is NOT jpeg
      if (file.type !== "image/jpeg") {
        setErrorMessage("Invalid file type. Please upload a JPEG image.");
        setSelectedFile(null); // Clear the stored file so they can't upload it
        e.target.value = "";   // Reset the input field visual
      } else {
        // File is valid
        setSelectedFile(file);
      }
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
        <div className="button-placeholder">
          <form>
            <input 
              type="file" 
              id="file" 
              name="file" 
              className="form-input" 
              accept="image/jpeg"           // 5. NEW: Browser filter
              onChange={handleFileChange} 
            />
            
            {/* 6. NEW: Error Message Display */}
            {errorMessage && (
              <p style={{ color: "#ff4d4d", marginTop: "0.5rem", fontSize: "0.9rem" }}>
                {errorMessage}
              </p>
            )}

            <button type="submit" className="form-btn" onClick={handleUploadClick}>
              Upload file
            </button>
          </form>
        </div>

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
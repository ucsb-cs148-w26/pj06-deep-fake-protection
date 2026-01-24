import "./App.css";
import { useState } from "react";

function App() {

  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // 1. Track the file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // 2. Intercept the "Upload" button click
  const handleUploadClick = (e) => {
    e.preventDefault(); // Stop form submission
    
    // Check if a file is selected
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    // Open the confirmation modal
    setShowModal(true);
  };

  // 3. Final action if user says "Yes"
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
            <input type="file" id="file" name="file" className="form-input" onChange={handleFileChange} />
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

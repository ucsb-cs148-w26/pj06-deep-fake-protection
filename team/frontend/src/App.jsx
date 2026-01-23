import { useState } from "react";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      // Handle file upload here
      console.log("Uploading file:", selectedFile);
    }
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
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="upload-area">
            <input
              type="file"
              id="file-upload"
              name="file"
              accept="image/jpeg,image/jpg,image/png"
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
                  Drag and drop your image here, or click to browse
                </span>
                <span className="upload-secondary">
                  Supports JPG and PNG image formats
                </span>
              </div>
            </label>
            {fileName && (
              <div className="file-selected">
                <span className="file-name">✓ {fileName}</span>
              </div>
            )}
          </div>
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
    </div>
  );
}

export default App;

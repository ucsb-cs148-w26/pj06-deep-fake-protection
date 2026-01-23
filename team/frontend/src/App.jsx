import "./App.css";

function App() {
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
            <input type="file" id="file" name="file" className="form-input" />
            <button type="submit" className="form-btn">
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
    </div>
  );
}

export default App;

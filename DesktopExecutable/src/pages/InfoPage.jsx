function InfoPage() {
  return (
    <div className="info-page">
      <h1>Info</h1>
      <p className="info-subtitle">Learn how Deepfake Protection keeps your photos safe</p>

      <div className="info-section">
        <div className="info-section-title">What is Deepfake Protection?</div>
        <p>
          Deepfake Protection is a desktop application that shields your photos from being used
          by AI models to generate deepfakes. It works by embedding invisible perturbation patterns
          into your images that disrupt the feature extraction process used by deepfake generators,
          making it significantly harder for AI to convincingly replicate your likeness.
        </p>
      </div>

      <div className="info-section">
        <div className="info-section-title">How It Works</div>
        <p>
          When you upload a photo, the app applies carefully engineered noise patterns that are
          virtually invisible to the human eye but highly disruptive to the convolutional neural
          networks (CNNs) that power deepfake generation. These patterns target the specific
          frequency bands and feature maps that AI models rely on to analyze and reconstruct faces.
        </p>
        <p>
          The result is a photo that looks identical to the original but carries an invisible
          layer of protection that degrades the quality of any deepfake attempt.
        </p>
      </div>

      <div className="info-section">
        <div className="info-section-title">Protection Levels</div>
        <p>
          The protection slider lets you choose how aggressively the app protects your photo.
          Higher levels offer stronger defense but may introduce very subtle visible artifacts.
        </p>
        <ul className="info-levels-list">
          <li>
            <span className="info-level-name">Level 1 — Subtle:</span>
            Light Gaussian noise. Nearly invisible, basic protection against simple AI scrapers.
          </li>
          <li>
            <span className="info-level-name">Level 2 — Moderate:</span>
            Medium Gaussian noise. Still very subtle, improved disruption of AI feature extraction.
          </li>
          <li>
            <span className="info-level-name">Level 3 — Standard:</span>
            Gaussian noise + color channel perturbation. Good balance of invisibility and protection.
          </li>
          <li>
            <span className="info-level-name">Level 4 — Strong:</span>
            Gaussian noise + high-frequency adversarial pattern. Targets CNN feature extractors directly.
          </li>
          <li>
            <span className="info-level-name">Level 5 — Maximum:</span>
            Full stack: Gaussian + color shift + adversarial pattern + JPEG artifact amplification.
          </li>
        </ul>
      </div>

      <div className="info-section">
        <div className="info-section-title">Photo Library</div>
        <p>
          Every photo you protect is automatically saved to your local photo library. From the
          library, you can view your protected images, compare them side-by-side with the originals,
          and export them for sharing. All images are stored locally on your machine — nothing
          is uploaded to any server.
        </p>
      </div>

      <div className="info-section">
        <div className="info-section-title">Tips</div>
        <div className="info-tip">
          <span className="info-tip-bullet">&#x2022;</span>
          <span>For everyday social media uploads, Level 3 (Standard) provides a good balance of protection and image quality.</span>
        </div>
        <div className="info-tip">
          <span className="info-tip-bullet">&#x2022;</span>
          <span>Use Level 4 or 5 for photos you consider particularly sensitive or high-risk.</span>
        </div>
        <div className="info-tip">
          <span className="info-tip-bullet">&#x2022;</span>
          <span>Always use the Compare Side-by-Side feature to verify the protected photo looks good before sharing it.</span>
        </div>
        <div className="info-tip">
          <span className="info-tip-bullet">&#x2022;</span>
          <span>Protect photos before posting them online — once an unprotected photo is out there, it can be used by anyone.</span>
        </div>
      </div>
    </div>
  );
}

export default InfoPage;

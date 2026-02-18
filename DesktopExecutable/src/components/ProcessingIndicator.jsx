function ProcessingIndicator({ level }) {
  return (
    <div className="processing-indicator">
      <div className="spinner" />
      <div className="processing-text">
        Applying Level {level} protection...
      </div>
    </div>
  );
}

export default ProcessingIndicator;

import { useState, useCallback } from 'react';

export function useImageProcessor() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const process = useCallback(async (imageBuffer, protectionLevel) => {
    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      const response = await window.electronAPI.processImage(
        imageBuffer,
        protectionLevel
      );
      setResult({
        buffer: response.buffer,
        width: response.width,
        height: response.height,
        psnr: response.psnr,
        similarity: response.similarity,
      });
    } catch (err) {
      setError(err.message || 'Failed to process image');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { isProcessing, result, error, process, reset };
}

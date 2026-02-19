const { Jimp } = require('jimp');

/**
 * Box-Muller transform for generating normally-distributed random numbers.
 * Direct port of the numpy.random.normal approach used in Masks/Gauss.py.
 */
function gaussianRandom(mean, stddev) {
  const u1 = Math.random();
  const u2 = Math.random();
  const z = Math.sqrt(-2 * Math.log(u1 || 1e-10)) * Math.cos(2 * Math.PI * u2);
  return mean + z * stddev;
}

/**
 * Apply Gaussian noise to pixel buffer (RGBA layout).
 * Faithful port of Masks/Gauss.py: normalize to 0-1, add noise, clip, denormalize.
 * Skips alpha channel (every 4th byte).
 */
function applyGaussianNoise(bitmap, width, height, strength) {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      for (let c = 0; c < 3; c++) {
        const normalized = bitmap[idx + c] / 255.0;
        const noisy = normalized + gaussianRandom(0, strength);
        bitmap[idx + c] = Math.round(Math.min(1, Math.max(0, noisy)) * 255);
      }
    }
  }
}

/**
 * Apply color channel perturbation in 4x4 blocks.
 * Each block gets a uniform random RGB shift, creating subtle color patches
 * that confuse CNN feature extractors while being imperceptible to humans.
 */
function applyColorPerturbation(bitmap, width, height, shiftRange) {
  const blockSize = 4;
  for (let by = 0; by < height; by += blockSize) {
    for (let bx = 0; bx < width; bx += blockSize) {
      const shiftR = (Math.random() * 2 - 1) * shiftRange;
      const shiftG = (Math.random() * 2 - 1) * shiftRange;
      const shiftB = (Math.random() * 2 - 1) * shiftRange;

      for (let y = by; y < Math.min(by + blockSize, height); y++) {
        for (let x = bx; x < Math.min(bx + blockSize, width); x++) {
          const idx = (y * width + x) * 4;
          bitmap[idx]     = Math.min(255, Math.max(0, Math.round(bitmap[idx] + shiftR)));
          bitmap[idx + 1] = Math.min(255, Math.max(0, Math.round(bitmap[idx + 1] + shiftG)));
          bitmap[idx + 2] = Math.min(255, Math.max(0, Math.round(bitmap[idx + 2] + shiftB)));
        }
      }
    }
  }
}

/**
 * Apply high-frequency adversarial pattern.
 * Creates a modulated checkerboard that is invisible at normal viewing distance
 * but disrupts first-layer CNN filters that extract high-frequency features.
 */
function applyHighFreqPattern(bitmap, width, height, amplitude) {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const checkerboard = ((x + y) % 2 === 0) ? 1 : -1;
      const modulation = 0.5 + 0.5 * Math.sin(x * 0.1) * Math.cos(y * 0.1);
      const perturbation = amplitude * checkerboard * modulation;

      const idx = (y * width + x) * 4;
      bitmap[idx]     = Math.min(255, Math.max(0, Math.round(bitmap[idx] + perturbation)));
      bitmap[idx + 1] = Math.min(255, Math.max(0, Math.round(bitmap[idx + 1] + perturbation * 0.8)));
      bitmap[idx + 2] = Math.min(255, Math.max(0, Math.round(bitmap[idx + 2] + perturbation * 1.2)));
    }
  }
}

/**
 * Apply JPEG artifact amplification.
 * Encodes to JPEG at moderate quality, decodes back, computes the artifact
 * difference, and amplifies it. This poisons AI models that learn from
 * these exaggerated compression patterns.
 */
async function applyJpegPoisoning(image) {
  // Encode to JPEG at quality 85 and decode back
  const jpegBuffer = await image.getBuffer('image/jpeg', { quality: 85 });
  const jpegImage = await Jimp.read(jpegBuffer);

  const bitmap = image.bitmap.data;
  const jpegBitmap = jpegImage.bitmap.data;
  const len = bitmap.length;

  const amplification = 1.5;
  for (let i = 0; i < len; i += 4) {
    for (let c = 0; c < 3; c++) {
      const diff = jpegBitmap[i + c] - bitmap[i + c];
      const amplified = bitmap[i + c] + Math.round(diff * amplification);
      bitmap[i + c] = Math.min(255, Math.max(0, amplified));
    }
  }
}

/**
 * Compute PSNR and a human-readable visual similarity % between two RGBA bitmaps.
 * Only RGB channels are compared (alpha is ignored).
 */
function computeSimilarity(originalData, processedData) {
  let mse = 0;
  let count = 0;
  const len = Math.min(originalData.length, processedData.length);

  for (let i = 0; i < len; i += 4) {
    for (let c = 0; c < 3; c++) {
      const diff = originalData[i + c] - processedData[i + c];
      mse += diff * diff;
      count++;
    }
  }

  mse /= count;
  const rmse = Math.sqrt(mse);
  const psnr = mse === 0 ? 100 : 20 * Math.log10(255 / rmse);
  // Map RMSE (0–255) to similarity (100%–0%). Small RMSE → high similarity.
  const similarity = Math.max(0, (1 - rmse / 255) * 100);

  return {
    psnr: Math.round(psnr * 10) / 10,
    similarity: Math.round(similarity * 10) / 10,
  };
}

/**
 * Process an image with the specified protection level (1-5).
 *
 * Level 1 (Subtle):   Light Gaussian noise (0.02)
 * Level 2 (Moderate): Medium Gaussian noise (0.04)
 * Level 3 (Standard): Gaussian (0.03) + color channel perturbation
 * Level 4 (Strong):   Gaussian (0.03) + high-frequency adversarial pattern
 * Level 5 (Maximum):  Gaussian (0.04) + color + high-freq + JPEG poisoning
 */
async function processImage(inputBuffer, protectionLevel) {
  const level = Math.min(5, Math.max(1, protectionLevel));

  const image = await Jimp.read(Buffer.from(inputBuffer));
  const { width, height } = image.bitmap;
  const bitmap = image.bitmap.data;

  // Snapshot original pixel data before any modifications
  const originalData = Buffer.from(bitmap);

  // Apply noise layers based on protection level
  const gaussianStrengths = { 1: 0.02, 2: 0.04, 3: 0.03, 4: 0.03, 5: 0.04 };
  applyGaussianNoise(bitmap, width, height, gaussianStrengths[level]);

  if (level >= 3) {
    const shiftRange = level >= 5 ? 4 : 3;
    applyColorPerturbation(bitmap, width, height, shiftRange);
  }

  if (level >= 4) {
    const amplitude = level >= 5 ? 5 : 4;
    applyHighFreqPattern(bitmap, width, height, amplitude);
  }

  if (level >= 5) {
    await applyJpegPoisoning(image);
  }

  // Compute similarity between original and processed pixel data
  const { psnr, similarity } = computeSimilarity(originalData, image.bitmap.data);

  // Encode back to JPEG at high quality
  const outputBuffer = await image.getBuffer('image/jpeg', { quality: 95 });

  return { outputBuffer, width, height, psnr, similarity };
}

module.exports = { processImage };

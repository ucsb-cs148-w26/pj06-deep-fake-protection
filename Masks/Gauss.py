import numpy as np
from PIL import Image

def apply_gauss(image_file, strength=0.05):
    """
    Apply Gaussian noise to an image using only NumPy and Pillow.
    """
    # 1. Load image and convert to NumPy array (Normalized 0-1)
    image = Image.open(image_file).convert('RGB')
    img_array = np.array(image).astype(np.float32) / 255.0

    # 2. Generate Gaussian Noise
    # Using the same normal distribution logic as your torch version
    noise = np.random.normal(0, strength, img_array.shape)

    # 3. Add noise and clip to [0, 1] range
    noisy_img = img_array + noise
    noisy_img = np.clip(noisy_img, 0, 1)

    # 4. Convert back to PIL Image (0-255 uint8)
    noisy_img = (noisy_img * 255).astype(np.uint8)
    return Image.fromarray(noisy_img)
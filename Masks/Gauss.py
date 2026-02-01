import numpy as np
from PIL import Image
import os # Added to check if file exists

def apply_gauss(image_file, strength=0.05):
    """
    Apply random noise to an image without using a neural network.
    """
    # 1. Load image and convert to NumPy array (Values 0-255)
    image = Image.open(image_file).convert('RGB')
    img_array = np.array(image).astype(np.float32) / 255.0  # Normalize to 0-1
    
    # 2. Generate Noise
    h, w, c = img_array.shape
    
    if noise_type == 'gaussian':
        # Gaussian noise (Normal distribution)
        noise = np.random.normal(0, strength, (h, w, c))
    else:
        # Uniform noise
        noise = np.random.uniform(-strength, strength, (h, w, c))
    
    # 3. Add noise and clip values
    noisy_img = img_array + noise
    noisy_img = np.clip(noisy_img, 0, 1)  # Ensure values stay valid
    
    # 4. Convert back to PIL Image
    noisy_img = (noisy_img * 255).astype(np.uint8)
    return Image.fromarray(noisy_img)


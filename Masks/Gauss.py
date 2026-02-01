import numpy as np
from PIL import Image

def apply_gauss(image_file, strength=0.05):
    """
    Apply Gaussian noise to an image.
    
    Args:
        image_file: File path or file-like object
        strength: Intensity of the noise (default: 0.05)
    
    Returns:
        PIL Image: The noisy image
    """
    # 1. Load image and convert to NumPy array (Values 0-255)
    image = Image.open(image_file).convert('RGB')
    img_array = np.array(image).astype(np.float32) / 255.0  # Normalize to 0-1
    
    # 2. Generate Gaussian Noise (Normal distribution)
    h, w, c = img_array.shape
    noise = np.random.normal(0, strength, (h, w, c))
    
    # 3. Add noise and clip values to ensure they stay valid (0-1)
    noisy_img = img_array + noise
    noisy_img = np.clip(noisy_img, 0, 1)
    
    # 4. Convert back to PIL Image
    noisy_img = (noisy_img * 255).astype(np.uint8)
    return Image.fromarray(noisy_img)
import torch
import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image
import torchattacks

# Global model instance (loaded once for efficiency)
_model = None

def get_model():
    """Get or create the ResNet18 model (singleton pattern)"""
    global _model
    if _model is None:
        _model = models.resnet18(pretrained=True).eval()
    return _model

def apply_pgd_masking(image_file, eps=8/255, alpha=2/255, steps=10):
    """
    Apply PGD (Projected Gradient Descent) adversarial masking to protect against deepfakes.
    
    Args:
        image_file: File-like object or path to image file
        eps: Maximum perturbation (default: 8/255, standard 'invisible' noise level)
        alpha: Step size (default: 2/255)
        steps: Number of iterations (default: 10)
    
    Returns:
        PIL Image: Protected/masked image
    """
    # Load model
    model = get_model()
    
    # Load and preprocess the image
    if isinstance(image_file, str):
        image = Image.open(image_file).convert('RGB')
    else:
        image = Image.open(image_file).convert('RGB')
    
    preprocess = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),  # Scales pixels to [0, 1]
    ])
    
    img_tensor = preprocess(image).unsqueeze(0)  # Add batch dimension
    
    # Define and run the PGD attack
    atk = torchattacks.PGD(model, eps=eps, alpha=alpha, steps=steps)
    
    # Get model prediction to use as target
    outputs = model(img_tensor)
    _, labels = torch.max(outputs.data, 1)
    
    # Generate the masked image
    masked_tensor = atk(img_tensor, labels)
    
    # Convert back to PIL Image
    masked_image = transforms.ToPILImage()(masked_tensor.squeeze().clamp(0, 1))
    
    return masked_image


# For backward compatibility - can still run as script
if __name__ == "__main__":
    import matplotlib.pyplot as plt
    
    # Example usage
    img_path = "/Users/arman/Desktop/download.jpeg"  # Replace with your file path
    original_image = Image.open(img_path).convert('RGB')
    
    # Apply masking
    masked_image = apply_pgd_masking(img_path)
    
    # Display Results
    plt.figure(figsize=(10, 5))
    plt.subplot(1, 2, 1)
    plt.imshow(original_image)
    plt.axis('off')
    plt.title("Original Image")
    
    plt.subplot(1, 2, 2)
    plt.imshow(masked_image)
    plt.axis('off')
    plt.title("PGD Masked Image")
    plt.show()
import torch
import torchvision.models as models
from torchvision.models import ResNet18_Weights
import torchvision.transforms as transforms
from PIL import Image
import torchattacks
import warnings

# Suppress any remaining secondary warnings for a clean terminal
warnings.filterwarnings("ignore", category=UserWarning)

# Global model instance (loaded once for efficiency)
_model = None

def get_model():
    """Get or create the ResNet18 model using modern weights parameter"""
    global _model
    if _model is None:
        # Fixed the deprecation warning by using weights instead of pretrained=True
        _model = models.resnet18(weights=ResNet18_Weights.DEFAULT).eval()
    return _model

def apply_pgd_masking(image_file, eps=8/255, alpha=2/255, steps=2):
    """
    Apply PGD adversarial masking to protect against deepfakes.
    """
    # Load model
    model = get_model()
    
    # Load and preprocess the image
    image = Image.open(image_file).convert('RGB')
    
    preprocess = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
    ])
    
    img_tensor = preprocess(image).unsqueeze(0)
    
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


if __name__ == "__main__":
    import matplotlib.pyplot as plt
    
    # Updated path to match your verified file
    img_path = "/Users/arman/Desktop/download.jpg" 
    
    print("Processing image... please wait.")
    
    # Apply masking
    masked_image = apply_pgd_masking(img_path)
    
    # Display Results - Only the Masked Image
    plt.figure(figsize=(6, 6))
    plt.imshow(masked_image)
    plt.axis('off')
    plt.title("PGD Masked Image")
    
    print("Done! Close the image window to terminate the script.")
    plt.show()
import torch
import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image
import torchattacks
import matplotlib.pyplot as plt

# 1. Setup the dummy model
model = models.resnet18(pretrained=True).eval()

# 2. Load and preprocess your local image
img_path = "/Users/arman/Desktop/download.jpeg"  # Replace with your file path
image = Image.open(img_path).convert('RGB')

preprocess = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(), # Scales pixels to [0, 1]
])

img_tensor = preprocess(image).unsqueeze(0) # Add batch dimension

# 3. Define and run the PGD attack
# eps=8/255 is the standard 'invisible' noise level
atk = torchattacks.PGD(model, eps=8/255, alpha=2/255, steps=10)

# PGD technically needs a 'target' label to move away from
# We'll just use the model's current prediction as the starting point
outputs = model(img_tensor)
_, labels = torch.max(outputs.data, 1)

# Generate the masked image
masked_image = atk(img_tensor, labels)

# 4. Display Results
def show(t):
    plt.imshow(t.squeeze().permute(1, 2, 0).detach().numpy())
    plt.axis('off')

plt.figure(figsize=(10, 5))
plt.subplot(1, 2, 1); show(img_tensor); plt.title("Original Image")
plt.subplot(1, 2, 2); show(masked_image); plt.title("PGD Masked Image")
plt.show()
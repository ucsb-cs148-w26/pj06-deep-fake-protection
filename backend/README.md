# Backend - Deepfake Protection API

FastAPI server that processes uploaded images with PGD (Projected Gradient Descent) adversarial masking to protect against deepfake generation.

## Setup

1. **Install Python dependencies:**
```bash
cd backend
pip install -r requirements.txt
```

2. **Run the FastAPI server:**
```bash
python app.py
```
The API will be available at `http://localhost:8000`

## API Endpoints

- `GET /` - Root endpoint, returns API status
- `GET /health` - Health check endpoint
- `POST /process-image` - Upload JPEG image, returns protected version

## How It Works

1. **Upload**: Frontend sends JPEG image via POST request
2. **Validation**: Server validates file type (JPEG only)
3. **Processing**: Applies PGD adversarial masking using PyTorch + torchattacks
4. **Response**: Returns protected image as downloadable JPEG

## PGD Protection

Uses Projected Gradient Descent (PGD) to add imperceptible noise that:
- Protects against deepfake generation by ML models
- Maintains visual quality for human viewers
- Uses standard parameters: eps=8/255, alpha=2/255, steps=10

## Development

The server uses CORS middleware to allow requests from:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (Alternative dev server)

## Dependencies

- **FastAPI**: Modern web framework for building APIs
- **PyTorch**: Machine learning framework
- **torchattacks**: Adversarial attack library for PGD
- **Pillow**: Image processing
- **uvicorn**: ASGI server for running FastAPI
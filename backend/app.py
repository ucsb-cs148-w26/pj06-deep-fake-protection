from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import sys
import os
import io

# Add parent directory to path to import Masks module
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from Masks.PGD import apply_pgd_masking

app = FastAPI(title="Deepfake Protection API")

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://pj06-deep-fake-protection-blush.vercel.app/", "http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],  # Vite and other dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/process-image")
async def process_image(file: UploadFile = File(...)):
    """Process uploaded image with deepfake protection masking"""
    
    # Validate file type
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    # Validate JPEG specifically
    if file.content_type != "image/jpeg":
        raise HTTPException(
            status_code=400, 
            detail="Only JPEG images are supported. Please upload a .jpg or .jpeg file."
        )
    
    try:
        # Apply PGD masking (can easily switch to other algorithms here)
        masked_image = apply_pgd_masking(file.file)
        
        # Convert to bytes for response
        img_buffer = io.BytesIO()
        masked_image.save(img_buffer, format='JPEG', quality=95)
        img_buffer.seek(0)
        
        return StreamingResponse(
            io.BytesIO(img_buffer.getvalue()),
            media_type="image/jpeg",
            headers={"Content-Disposition": f"attachment; filename=protected_{file.filename}"}
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Processing failed: {str(e)}")


@app.get("/")
async def root():
    return {"message": "Deepfake Protection API is running!", "status": "healthy"}


@app.get("/health")
async def health():
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
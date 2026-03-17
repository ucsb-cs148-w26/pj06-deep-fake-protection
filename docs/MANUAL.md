# Deepfake Protection User Manual

---

## 1. Product Overview

### 1.1 Purpose of the Product
Deepfake Protection is a tool that lets you upload a photo and download a visually identical image that has been subtly modified to make it harder for AI systems (deepfake generators, face recognizers, and training pipelines) to use your face.  
The goal is not to “watermark” your image and prevent it from being deepfaked, but rather to add mathematically designed noise so that AI models learn the wrong features while humans still see your photo as normal. Applying the noise to the image essentially "poisons" the AI which trains on it, so the goal is to have a large number of these "poisoned" images which can then effectively break a model training to deepfake on it.

### 1.2 Intended Audience
- Individuals who frequently post photos of themselves online (students, creators, influencers).  
- Journalists, activists, and public figures who are at higher risk of their likeness being misused.  
- Anyone who wants a simple, one-click way to harden their images against deepfake misuse without learning ML details.

---

## 2. Web Application

### 2.1 Accessing the Web App
- Open your browser and navigate to the deployed site.  
- You should see a landing page titled **“Deepfake Protection”** with an upload area in the center.
  
### 2.2 Uploading an Image
1. Prepare a suitable portrait photo of yourself in JPEG (`.jpg`/`.jpeg`) or PNG (`.png`) format which adheres to the posted guidelines.  
2. On the landing page, either:  
   - Drag and drop your image into the large upload box, **or**  
   - Click the box to open your file picker and choose the image.  
3. The app will display the selected filename beneath the upload area. If the file is not an acceptable format, you will see an error and the file will be rejected.

### 2.3 Confirming Guidelines and CAPTCHA
1. After a valid file is selected which adheres to our posted guidelines, click **“Process Image”**.  
2. If you confirm, an arithmetic CAPTCHA widget appears. Follow the on‑screen instructions to prove you are human.  
3. If the CAPTCHA expires or fails, you will see a message and can try again.

### 2.4 Downloading the Protected Image
1. Once the CAPTCHA is completed successfully, the app sends your image to the backend for one‑time processing.  
2. When processing completes, your browser will automatically download a new file named `protected_<your-filename>.jpg`.  
3. You will see a success message. At this point you can safely close the page or process another image.

---

## 3. Desktop Application

### 3.1 Installation and Launch
1. Open a Command Prompt or Terminal application
2. Clone this Github repository by running: `git clone git@github.com:ucsb-cs148-w26/pj06-deep-fake-protection.git`
3. Navigate to the DesktopExecutable Library by running: `cd DesktopExecutable`
4. Install the node packages by running: `npm install`
5. Run the application using: `npm run electron:dev`

### 3.2 Uploading an Image
1. On the **“Home”** page, click the upload area or the “Select an image” button.  
2. Choose the image you want to protect from your local files.  
3. The filename will appear in the UI once the app has loaded the image into memory.

### 3.3 Choosing a Protection Level
1. Use the **Protection Level** slider (1–5) to choose how aggressively you want the app to perturb your image.  
2. Lower levels aim for extremely subtle changes; higher levels apply more aggressive, AI‑resistant perturbations that may very slightly change texture if inspected closely.  
3. The default level is 3, which we recommend for most users as it provides a fair balance.

### 3.4 More details on the CAPTCHA and Processing
1. Click **“Apply Protection”** to start.  
2. A small math CAPTCHA pops up (for example, “What is 7 + 3?”). Enter the answer and click **“Verify & Apply Protection”**.  
3. If you answer incorrectly, you will see an error and can try again.  
4. After a correct answer, the app shows a **Processing** screen until your image is ready.

### 3.5 Viewing Results, Exporting, and Library
1. When processing is complete, you will see a **side‑by‑side comparison** of your original and protected images.  
2. The app also displays numeric metrics such as **PSNR** and **Similarity %** to indicate how visually close the protected image is to the original.  
3. Use the **Export** button to save the protected image to a location of your choice.  
4. Optionally, click **Save to Library** to store both original and protected versions in the app’s local photo library for quick access later. These images will still be stored on your device for file access if you would like as well.  
5. Use **Process Another Image** to go back and start again with a new file.

---

## 4. Features Summary

### 4.1 Key Features
- One‑click image protection via web or desktop.  
- AI‑resistant masking that aims to preserve human‑visible quality.  
- CAPTCHA‑gated processing to discourage automated misuse.  
- App‑only features: adjustable protection levels, offline operation, and a local photo library.

### 4.2 Planned Enhancements
- Additional masking strategies tuned to new families of deepfake models. Especially considering the rapid development of new adversarial techniques, we have currently designed the product to allow for a "plug and play" development style with which we can add new methods of masking.  
- More advanced visualization tools (zoom, overlays) to help users understand where perturbations are applied.  
- Expanded settings for empowering users (e.g. custom protection levels which rely on PSNR targets).
- Stronger individual image protections so that it can be made possible to prevent an indivdual image from deepfake attacks as opposed to just poisoning datasets.

---

## 5. Troubleshooting

### 5.1 Common Issues
- **“Invalid file type” error:**  
  - Ensure your image is saved as an accepted format.  
- **Processing seems slow:**  
  - Try a smaller image file or check your network connection (web app only). Desktop processing runs locally but may take longer on very large images. Processing on the app can often vary based on your individual device specs.  
- **No download appears after processing (web):**  
  - Check your browser’s download bar or “Downloads” folder. Also keep in mind that some browsers block automatic downloads and show a small prompt. In that case, allow downloads or disable the preventative settings.

---

## 6. Safety, Privacy, and Ethics

Our biggest goal with this product is to empower individual privacy! Thus, we do our best to limit any sources of privacy being infringed. For instance, we never store any of your images in our own storage, so your data is safe with you. For a deeper explanation of how we handle data and our ethical assumptions, see `docs/DESIGN.md` (Privacy and Ethics section).  
At a high level:
- The backend processes uploads in memory and does not store images.  
- The desktop app keeps all data on your own device.  
- CAPTCHAs and usage guidelines are intended to ensure that real people, not bots, are using the tool for defensive purposes.


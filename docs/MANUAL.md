# Deepfake Protection User Manual (Draft)

> **Status:** Draft for lab08 – headings and structure are stable, body text and screenshots will be expanded for the final submission.

---

## 1. Product Overview

### 1.1 Purpose of the Product
Deepfake Protection is a tool that lets you upload a photo and download a visually identical image that has been subtly modified to make it harder for AI systems (deepfake generators, face recognizers, and training pipelines) to use your face.  
The goal is not to “watermark” your image visually, but to add mathematically designed noise so that AI models learn the wrong features while humans still see your photo as normal.

### 1.2 Intended Audience
- Individuals who frequently post photos of themselves online (students, creators, influencers).  
- Journalists, activists, and public figures who are at higher risk of their likeness being misused.  
- Anyone who wants a simple, one-click way to harden their images against deepfake misuse without learning ML details.

---

## 2. Web Application

> **Note:** This section will eventually include step‑by‑step screenshots for each step (upload, confirmation, CAPTCHA, download). For now, we describe the flow in text and mark where screenshots will appear.

### 2.1 Accessing the Web App
- Open your browser and navigate to the deployed site.  
- You should see a landing page titled **“Deepfake Protection”** with an upload area in the center.
  
> **[Screenshot placeholder – Web landing page]**

### 2.2 Uploading an Image
1. Prepare a suitable portrait photo of yourself in JPEG (`.jpg`/`.jpeg`) format.  
2. On the landing page, either:  
   - Drag and drop your image into the large upload box, **or**  
   - Click the box to open your file picker and choose the image.  
3. The app will display the selected filename beneath the upload area. If the file is not a JPEG, you will see an error and the file will be rejected.

> **[Screenshot placeholder – Drag‑and‑drop upload with valid file selected]**  
> **[Screenshot placeholder – Error message for invalid file type]**

### 2.3 Confirming Guidelines and CAPTCHA
1. After a valid file is selected, click **“Process Image”**.  
2. A confirmation dialog will ask you to verify that your image follows the listed guidelines (e.g., you own the rights to this photo).  
3. If you confirm, a Google reCAPTCHA widget appears. Follow the on‑screen instructions to prove you are human.  
4. If reCAPTCHA expires or fails, you will see a message and can try again.

> **[Screenshot placeholder – Confirmation modal]**  
> **[Screenshot placeholder – reCAPTCHA prompt]**

### 2.4 Downloading the Protected Image
1. Once the CAPTCHA is completed successfully, the app sends your image to the backend for one‑time processing.  
2. When processing completes, your browser will automatically download a new file named `protected_<your-filename>.jpg`.  
3. You will see a success message. At this point you can safely close the page or process another image.

> **[Screenshot placeholder – “Success” message and downloaded file in browser]**

---

## 3. Desktop Application

> **Note:** The desktop app is designed for users who want offline processing, adjustable protection strength, and a local photo library. This section will later include annotated screenshots for each panel.

### 3.1 Installation and Launch
1. Download the desktop installer for your operating system (link and packaging details will be finalized by release).  
2. Run the installer and follow the standard OS prompts.  
3. Open the **Deepfake Protection** app from your Applications / Start Menu.

> **[Screenshot placeholder – Desktop app home screen]**

### 3.2 Uploading an Image
1. On the **“Protect Your Image”** page, click the upload area or the “Select an image” button.  
2. Choose the image you want to protect from your local files.  
3. The filename will appear in the UI once the app has loaded the image into memory.

> **[Screenshot placeholder – Desktop upload state]**

### 3.3 Choosing a Protection Level
1. Use the **Protection Level** slider (1–5) to choose how aggressively you want the app to perturb your image.  
2. Lower levels aim for extremely subtle changes; higher levels apply more aggressive, AI‑resistant perturbations that may very slightly change texture if inspected closely.  
3. The default level is 3, which we recommend for most users.

> **[Screenshot placeholder – Protection slider control]**

### 3.4 CAPTCHA and Processing
1. Click **“Apply Protection”** to start.  
2. A small math CAPTCHA pops up (for example, “What is 7 + 3?”). Enter the answer and click **“Verify & Apply Protection”**.  
3. If you answer incorrectly, you will see an error and can try again.  
4. After a correct answer, the app shows a **Processing** screen until your image is finished.

> **[Screenshot placeholder – Math CAPTCHA modal]**  
> **[Screenshot placeholder – Processing indicator]**

### 3.5 Viewing Results, Exporting, and Library
1. When processing is complete, you will see a **side‑by‑side comparison** of your original and protected images.  
2. The app also displays numeric metrics such as **PSNR** and **Similarity %** to indicate how visually close the protected image is to the original.  
3. Use the **Export** button to save the protected image to a location of your choice.  
4. Optionally, click **Save to Library** to store both original and protected versions in the app’s local photo library for quick access later.  
5. Use **Process Another Image** to go back and start again with a new file.

> **[Screenshot placeholder – Comparison view with metrics and export buttons]**  
> **[Screenshot placeholder – Photo library view]**

---

## 4. Features Summary

### 4.1 Key Features
- One‑click image protection via web or desktop.  
- AI‑resistant masking that aims to preserve human‑visible quality.  
- CAPTCHA‑gated processing to discourage automated misuse.  
- Desktop‑only features: adjustable protection levels, offline operation, and a local photo library.

### 4.2 Planned Enhancements (Placeholder)
- Additional masking strategies tuned to new families of deepfake models.  
- More advanced visualization tools (zoom, overlays) to help users understand where perturbations are applied.  
- Expanded settings for power users (e.g., default protection level, library location).

---

## 5. Troubleshooting (Placeholder)

### 5.1 Common Issues
- **“Invalid file type” error:**  
  - Ensure your image is saved as `.jpg` or `.jpeg`. PNGs and other formats are not currently supported.  
- **Processing seems slow:**  
  - Try a smaller image file or check your network connection (web app only). Desktop processing runs locally but may take longer on very large images.  
- **No download appears after processing (web):**  
  - Check your browser’s download bar or “Downloads” folder; some browsers block automatic downloads and show a small prompt.

> **[Screenshot placeholder – Example error messages]**

---

## 6. Safety, Privacy, and Ethics (Pointer)

For a deeper explanation of how we handle data and our ethical assumptions, see `docs/DESIGN.md` (Privacy and Ethics section).  
At a high level:
- The backend processes uploads in memory and does not store images.  
- The desktop app keeps all data on your own device.  
- CAPTCHAs and usage guidelines are intended to ensure that real people, not bots, are using the tool for defensive purposes.


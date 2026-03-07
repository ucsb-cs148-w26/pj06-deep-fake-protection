# Design Process Documentation

**Project:** Deepfake Protection (Project group 6)  
**Prepared by:** Rohil Jain, Milad Haghighi, John Vu, Anit Annadi, Srish Nigam, Sharanya Gehlot, Arman Sajjadian, Henry Bartz  
**Link to the live document:** [Google doc live doc](https://docs.google.com/document/d/12GnT8bL_X7gvt6HsYZMy2RGWBfpVzYO6YOpXHo5V-XQ/edit?usp=sharing)  
---

## 1. Overview


### 1.1 Project Summary
The Deepfake Protection project delivers both a web app and a desktop application that let people upload portrait images and receive a visually identical, but adversarially perturbed, version designed to reduce the effectiveness of deepfake generators and face-recognition models. 
The web frontend calls a FastAPI backend that applies a Gaussian-noise–based mask, while the desktop Electron app runs a richer local pipeline with tunable protection levels and offline processing.


### 1.2 Goals
- Protect user images from AI manipulation and data-set scraping. 
- Offer efficient processing through web and desktop applications. 
- Maintain a user-friendly, privacy-first design where server-side processing is stateless. 
- Provide an offline, power-user desktop workflow with adjustable protection strength and a local photo library.


### 1.3 Target Users
- Content creators and influencers who regularly publish photos of themselves online. 
- Journalists, activists, and public figures whose likeness could be targeted for misinformation campaigns. 
- Students, educators, and researchers who want a concrete, hands-on tool for understanding adversarial defenses. 
- General public users who want an easy “one-click” way to harden their images against deepfake misuse.


---


## 2. Design Process


### 2.1 User Flow


**Web app flow**
1. User lands on the home page and reads a short piece about what the tool does and the upload guidelines. 
2. User drags and drops or browses for a JPEG image; the UI validates file type and shows the selected file name. 
3. When the user clicks “Process Image,” a modal asks them to confirm they followed the guidelines. 
4. After confirming, the user solves a Google reCAPTCHA challenge to prove they are human. 
5. The frontend sends the image as `multipart/form-data` to the `/process-image` API on the FastAPI backend. 
6. The backend applies Gaussian-noise masking and streams back a processed JPEG. 
7. The browser triggers a download of `protected_<original-name>.jpg`, and the user sees a success message.


**Desktop app flow**
1. User opens the Electron desktop app and lands on the “Protect Your Image” upload screen. 
2. The user chooses an image from local disk; we keep it entirely on-device. 
3. The user adjusts a protection-level slider (1–5), which internally maps to different masking pipelines. 
4. When the user clicks “Apply Protection,” they must pass a small arithmetic CAPTCHA (e.g., `7 + 3`), preventing scripted misuse. 
5. The renderer process sends the image buffer and protection level over IPC to the main process. 
6. The main process runs the multi-step image-processing pipeline and returns the protected image plus similarity metrics. 
7. The UI shows a side-by-side comparison view, and the user can export or optionally save the pair into a local photo library. 
8. The user can repeat the flow for additional images without reloading the app.


### 2.2 UI / UX Design
- **Design language (web).** The web app uses a modern, dark-themed aesthetic with gradient backgrounds, large typographic hierarchy, and monospace accents to convey a “security / technical” feel. Primary actions such as “Process Image” are visually prominent, while warning/error messages (e.g., invalid file type) are clearly styled and inline. Drag-and-drop affordances, iconography, and microcopy around upload guidelines aim to reduce user hesitation.
- **Design language (desktop).** The desktop app follows a clean, panel-based layout with a clear three-state flow: upload, processing spinner, and side-by-side comparison. The protection-level slider gives immediate visual feedback about the chosen strength, and the comparison view overlays quantitative metrics (PSNR, similarity %) while keeping export/save buttons highly visible.
- **Accessibility and feedback.** Both apps rely on high-contrast text, large click targets, and clear loading/disabled states to prevent accidental double-submits. Error conditions (bad MIME type, failed backend call, invalid CAPTCHA) are surfaced near the relevant controls with plain-language explanations.
- **Differences between web and desktop.** The web app is focused on a single-image, quick “upload → download” loop with minimal configuration. The desktop app adds power-user features (configurable protection level, persistent library, direct file-system access) and works fully offline after installation, so its navigation is more like a small productivity tool than a single landing page.


### 2.3 System Architecture
At a high level, the project consists of three cooperating subsystems:


- **Web Frontend (Vite + React).** 
 - Renders the landing page, drag-and-drop upload area, guideline panel, and “How It Works” explanation. 
 - Integrates Google reCAPTCHA to gate uploads. 
 - Makes `fetch` calls to the FastAPI backend (`/process-image`, `/health`) and streams the returned JPEG into a client‑side download.


- **Backend API (FastAPI + Python).** 
 - Exposes `/process-image` to accept a single JPEG upload, validate it, and apply the Gaussian-noise mask using the shared `Masks/Gauss.py` implementation. 
 - Streams the output JPEG directly back to the caller without persisting it to disk or database. 
 - Adds CORS middleware to safely allow only our known web origins. 
 - Exposes a lightweight `/health` endpoint used for uptime checks and automated tests.


- **Desktop App (Electron + React).** 
 - The renderer (React) manages UX state and calls `window.electronAPI` hooks (IPC) to request image processing, library operations, and settings. 
 - The main process uses Node + `Jimp` to run a richer multi-layer protection pipeline (Gaussian noise, color perturbation, high-frequency patterns, JPEG poisoning) defined in `image-processor.js`. 
 - A `PhotoLibrary` module manages a local-only library directory under the OS’s `userData` path. 


Data always flows *from user → processing pipeline → back to the same user* with no third-party storage; the architecture deliberately avoids centralized databases or user accounts.


---


## 3. Development and Implementation


### 3.1 Core Algorithms
- **Gaussian noise masking (backend & shared concept).** 
 - The Python backend uses `apply_gauss(image_file, strength=0.05)` from `Masks/Gauss.py`. It loads the image via Pillow, normalizes pixel values to \([0, 1]\), adds zero-mean Gaussian noise using NumPy, clips to \([0, 1]\), and converts back to 8‑bit RGB. 
 - Noise strength is tuned to be visually imperceptible on typical portrait photos while still disrupting feature extraction by deepfake models.


- **Multi-layer protection (desktop).** 
 - The Electron app’s `processImage` function (in `image-processor.js`) implements five protection levels, each composing different transformations: 
   - Level 1–2: primarily Gaussian noise with increasing standard deviation. 
   - Level 3: Gaussian noise plus block-wise color channel perturbation to create small color patches that confuse CNNs while remaining visually subtle. 
   - Level 4: adds a high-frequency, checkerboard-like adversarial pattern that targets early convolutional filters. 
   - Level 5: further applies JPEG artifact amplification (“JPEG poisoning”) by encoding/decoding once, amplifying compression artifacts, and writing them back into the image. 
 - For every processed image, we compute PSNR and a human-readable similarity percentage between the original and protected image to ensure quality stays within acceptable bounds.


### 3.2 Integration Details
- **Web ↔ Backend API.** 
 - Endpoint: `POST /process-image` with a `file` field in `multipart/form-data`. 
 - Validation: FastAPI checks that the content type starts with `image/` and is specifically `image/jpeg`; non-JPEG uploads are rejected with a clear error message. 
 - Response: a streaming JPEG with a `Content-Disposition` header (`protected_<original>.jpg`), which the frontend turns into a browser download.


- **Desktop renderer ↔ main process (IPC).** 
 - The React renderer sends raw image ArrayBuffers and a numeric protection level over IPC (`image:process`). 
 - The main process calls `processImage`, then returns a structured payload with the protected image buffer, width/height, PSNR, and similarity. 
 - Additional IPC channels manage the local library (`library:getAll`, `library:add`, `library:delete`, `library:export`, `library:clearAll`) and user settings (`settings:get`, `settings:update`).


- **File handling and security.** 
 - The backend never writes user images to disk; all processing occurs in memory and the result is immediately streamed back. 
 - CORS is restricted to known frontend origins, and MIME-type validation prevents non-image uploads. 
 - The desktop app keeps all image data on the user’s machine; library entries are stored under the OS-managed user data path, not synced to any cloud service.


### 3.3 Testing and Evaluation


| Category       | Tools / Methods                                                                                         | Outcome                                                                                                                    |
|---------------|----------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| UI Testing    | Manual exploratory testing in Chrome, Safari, and the Electron shell; browser devtools; edge-case trials | Verified smooth drag-and-drop uploads, clear error states, and correct handling of invalid files and failed network calls. |
| Model Testing | Python scripts using NumPy/Pillow; visual inspection; PSNR/similarity metrics                            | Confirmed that Gaussian and multi-layer masks preserve high visual similarity (\>95%) while introducing adversarial noise. |
| User Feedback | Inter-team beta survey and qualitative feedback (see `team/evaluation/USER_FEEDBACK_NEEDS.md`)          | Gathered insights on visual quality, processing time expectations, and trust in the “How It Works” explanation.           |


---


## 4. Privacy and Ethics


### 4.1 Data Privacy
Our design principle is: **the best data storage security is storing nothing at all.**


- **Web backend.** 
 - Uploaded images are processed entirely in memory inside the FastAPI app and immediately streamed back; we do not write them to disk, do not log raw image data, and do not associate them with user accounts. 
 - Once the HTTP response is sent, the backend retains no copy of the user’s image—the server behaves like a pure function from input bytes to output bytes.


- **Desktop app.** 
 - All processing happens locally on the user’s device; no images are ever sent to our servers. 
 - The optional photo library is stored only under the OS `userData` directory, and users can clear it at any time from within the app. 
 - No analytics or tracking pixels are embedded in exported images.


### 4.2 Ethical Considerations
We designed the system to **discourage misuse** and **prioritize human users**:


- Both the web and desktop apps require CAPTCHA challenges (Google reCAPTCHA on the web, arithmetic CAPTCHA in the desktop app) before processing, making it harder for bots to mass-scrape or bulk‑process datasets. 
- Upload guidelines explicitly prohibit malicious uses (e.g., preparing training data for deepfake generators) and encourage users to only protect their own images. 
- The tool is framed as a defensive measure, not a general image-editing platform; we intentionally do not expose batch APIs, public galleries, or model-download endpoints that could be repurposed for offensive applications. 
- By making the backend stateless and avoiding user accounts, we reduce the risk of any central repository of sensitive facial imagery being breached or subpoenaed.


---


## 5. Future Improvements
Potential next steps, optimizations, or stretch goals:


- Add more sophisticated, model-aware adversarial masks tuned to specific families of face-generation models while preserving even higher visual fidelity. 
- Provide a richer, side-by-side comparison view on the web (similar to desktop) with zoom and toggle tools. 
- Provide an installation location on the website for the desktop app
- Expose additional transparency features such as downloadable processing reports or visual overlays that show where perturbations were applied. 
- Explore a mobile-friendly or native mobile client for on-device protection directly from a phone’s camera roll.

## 6. System Architecture
[See the live doc for the flowchart image](https://docs.google.com/document/d/12GnT8bL_X7gvt6HsYZMy2RGWBfpVzYO6YOpXHo5V-XQ/edit?usp=sharing)  
The diagram shows the high-level architecture of the Deepfake Protection system. The Front End consists of two clients: a Web Frontend (Vite + React) that users access via browser, and a Desktop App (Electron + React) for offline, power-user workflows. Both clients communicate bidirectionally with the FastAPI Server in the Back End, which delegates image processing to either the Gaussian Mask module (web pipeline) or the Multi-Layer Protection Pipeline (desktop pipeline), returning an adversarially perturbed image to the user while storing nothing server-side.
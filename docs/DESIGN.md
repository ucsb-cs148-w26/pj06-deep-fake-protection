# Design Process Documentation

**Project:** Deepfake Protection (Project group 6)
**Prepared by:** Rohil Jain, Milad Haghighi, John Vu, Anit Annadi, Srish Nigam, Sharanya Gehlot, Arman Sajjadian, Henry Bartz

---

## 1. Overview

### 1.1 Project Summary
Briefly describe the project and its purpose.  
*Example:*  
The Deepfake Protection tool allows users to upload an image and receive a processed version with noise applied to hinder deepfake generation and protect digital identity.

### 1.2 Goals
- Protect user images from AI manipulation.
- Offer efficient processing through web and desktop applications.
- Maintain user-friendly, privacy-first design.

### 1.3 Target Users
Identify the primary users (e.g., content creators, journalists, general public).

---

## 2. Design Process

### 2.1 User Flow
Include flow diagrams for both web and desktop applications showing:
1. Image upload  
2. Processing pipeline  
3. Output preview and download

### 2.2 UI / UX Design
- Link to design mockups or prototypes (e.g., Figma URLs).  
- Describe visual principles (color, contrast, typography, accessibility).  
- Discuss differences between web and desktop UI.

### 2.3 System Architecture
Describe how frontend, backend, and image-processing services interact.  
Include architecture diagrams.

---

## 3. Development and Implementation

### 3.1 Core Algorithms
- Explain approach for noise generation (e.g., Gaussian, Perlin, or adaptive noise).  
- Mention model training or ML components if any.

### 3.2 Integration Details
- APIs used between web app, desktop app, and backend.  
- File handling and security measures for uploads.

### 3.3 Testing and Evaluation
| Category | Tools / Methods | Outcome |
|-----------|-----------------|----------|
| UI Testing | Cypress, Playwright | [Result summary] |
| Model Testing | Custom metrics | [Result summary] |
| User Feedback | Beta surveys | [Insights] |

---

## 4. Privacy and Ethics

### 4.1 Data Privacy
How user data/images are handled, anonymized, and deleted.
- EXPLAIN THAT NOTHING IS STORED
- THE BEST DATA STORAGE SECURITY IS STORING NOTHING AT ALL

### 4.2 Ethical Considerations
How the design discourages misuse:
- TALK ABOUT THE CAPTCHA TO PREVENT ROBOT USERS AND ONLY ALLOW VALID HUMAN USERS TO ACCESS THE APPLICATION
---

## 5. Future Improvements
Potential next steps, optimizations, or stretch goals:
- 
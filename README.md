## Deep Fake Protection

Please follow the steps for the executable not the website:
# Deepfake Protection Desktop

A cross-platform desktop application for protecting images against deepfake AI manipulation using adversarial noise techniques.

## Features

- Drag-and-drop image upload
- 5 protection levels from subtle to maximum
- Photo library for managing protected images
- Side-by-side comparison view
- macOS native-style interface

## Protection Levels

| Level | Name     | Techniques                                         |
| ----- | -------- | -------------------------------------------------- |
| 1     | Subtle   | Light Gaussian noise                               |
| 2     | Moderate | Medium Gaussian noise                              |
| 3     | Standard | Gaussian noise + color channel perturbation        |
| 4     | Strong   | Gaussian noise + high-frequency adversarial pattern|
| 5     | Maximum  | All techniques + JPEG poisoning                    |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd DesktopExecutable
npm install
```

### Development

Run the app in development mode with hot reload:

```bash
npm run electron:dev
```

### Build

Build the production app for macOS:

```bash
npm run electron:build
```

## Tech Stack

- **Electron** - Desktop framework
- **React 19** - UI library
- **Vite** - Build tool
- **Jimp** - Image processing

Create an app that will take a user's photo and make small changes to it such that a malicious third party cannot make a deep fake on it.

Arman Sajjadian: ArmanSajjadian\
Rohil Jain: RohilJainUCSB\
Milad Haghighi: mHaghighi04\
John Vu: jjohnvu\
Anit Annadi: AnitAnnadi\
Srish Nigam: EpicSRN021\
Sharanya Gehlot: sharanya444\
Henry Bartz: Bartz36\

## Tech Stack

Our project uses a React frontend (bundled with Vite) that talks to a FastAPI backend written in Python, where we load a PyTorch model and apply adversarial masking using the `torchattacks` library; this combination lets us build a responsive, modern UI while offloading the heavy image-processing work to a scalable API layer. We plan to deploy the frontend and backend using Vercel and/or similar cloud infrastructure, so teammates can iterate quickly on the UI while others experiment with different masking algorithms behind a stable HTTP interface. This setup gives us a clear separation of concerns—frontend handles user interaction and upload flow, backend focuses on ML and security logic—making it easier to swap in new models or masking strategies as we refine our deepfake protection approach.

https://pj06-deep-fake-protection-git-main-mhaghighi04s-projects.vercel.app/


User Roles:
We have a single user role: anyone who wants to post images online and protect them from malicious actors who may create deepfakes.

How does your app allow them to accomplish their goal?
Our app will include a masking feature that alters the user's image in a way that is undetectable to the human eye, but throws off a deepfake algorithm.
Installation

Prerequisites

A browser and search engine of chocie

Dependencies

React for the frontend, FastAPI for the backend API, PyTorch and `torchattacks` for generating adversarial noise on images, and Vercel (or similar) to deploy our app.

Installation Steps

TODO: Describe the installation process (making sure you give complete instructions to get your project going from scratch). Instructions need to be such that a user can just copy/paste the commands to get things set up and running. Note that with the use of GitHub Actions, these instructions can eventually be fully automated (e.g. with act, you can run GitHub Actions locally).

Functionality

Click the select image button, then select and image you would like to protect. Ensure you image follows the guidelines, and then select the upload button. You will then be given the image with the filter placed on it.

Known Problems

We do not yet have the best image protection algoirthm in place.

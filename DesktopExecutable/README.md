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

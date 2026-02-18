/**
 * @type {import('electron-builder').Configuration}
 */
module.exports = {
  appId: 'com.deepfakeprotection.desktop',
  productName: 'Deepfake Protection',
  directories: {
    output: 'build',
    buildResources: 'assets',
  },
  files: [
    'dist/**/*',
    'main/**/*',
    'node_modules/**/*',
    'package.json',
  ],
  mac: {
    category: 'public.app-category.photography',
    target: [
      {
        target: 'dmg',
        arch: ['x64', 'arm64'],
      },
    ],
    hardenedRuntime: true,
    gatekeeperAssess: false,
  },
  dmg: {
    contents: [
      { x: 130, y: 220 },
      { x: 410, y: 220, type: 'link', path: '/Applications' },
    ],
    window: {
      width: 540,
      height: 380,
    },
  },
  npmRebuild: true,
};

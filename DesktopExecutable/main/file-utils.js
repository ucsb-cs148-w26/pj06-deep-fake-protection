const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

async function ensureDirectory(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

function generateId() {
  return crypto.randomUUID().split('-')[0];
}

async function readJsonFile(filePath, defaultValue) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return defaultValue;
  }
}

async function writeJsonFile(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

module.exports = {
  ensureDirectory,
  generateId,
  readJsonFile,
  writeJsonFile,
  fileExists,
};

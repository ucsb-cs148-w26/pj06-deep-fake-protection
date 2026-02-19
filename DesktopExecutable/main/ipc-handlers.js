const { ipcMain, dialog, shell, app } = require('electron');
const fs = require('fs/promises');
const { processImage } = require('./image-processor');
const PhotoLibrary = require('./photo-library');
const { readJsonFile, writeJsonFile } = require('./file-utils');
const path = require('path');

let library;

function getSettingsPath() {
  return path.join(app.getPath('userData'), 'settings.json');
}

function registerIpcHandlers() {
  library = new PhotoLibrary(app.getPath('userData'));
  library.initialize();

  // --- Image Processing ---
  ipcMain.handle('image:process', async (_event, imageArrayBuffer, level) => {
    const inputBuffer = Buffer.from(imageArrayBuffer);
    const { outputBuffer, width, height, psnr, similarity } = await processImage(inputBuffer, level);
    return {
      buffer: outputBuffer.buffer.slice(
        outputBuffer.byteOffset,
        outputBuffer.byteOffset + outputBuffer.byteLength
      ),
      width,
      height,
      psnr,
      similarity,
    };
  });

  // --- Photo Library ---
  ipcMain.handle('library:getAll', async () => {
    return await library.getAll();
  });

  ipcMain.handle('library:add', async (_event, origAB, protAB, metadata) => {
    return await library.addImage(
      Buffer.from(origAB),
      Buffer.from(protAB),
      metadata
    );
  });

  ipcMain.handle('library:delete', async (_event, id) => {
    await library.deleteImage(id);
    return true;
  });

  ipcMain.handle('library:export', async (_event, id) => {
    const entry = await library.getById(id);
    if (!entry) return false;

    const { filePath } = await dialog.showSaveDialog({
      defaultPath: `protected_${entry.originalFilename}`,
      filters: [{ name: 'Images', extensions: ['jpg', 'jpeg'] }],
    });
    if (filePath) {
      await library.exportImage(id, filePath);
      return true;
    }
    return false;
  });

  ipcMain.handle('library:clearAll', async () => {
    await library.clearAll();
    return true;
  });

  ipcMain.handle('library:getImageDataUrl', async (_event, id, type) => {
    return await library.getImageDataUrl(id, type);
  });

  // --- File Dialogs ---
  ipcMain.handle('dialog:showSave', async (_event, defaultName) => {
    const { filePath } = await dialog.showSaveDialog({
      defaultPath: defaultName,
      filters: [{ name: 'Images', extensions: ['jpg', 'jpeg', 'png'] }],
    });
    return filePath || null;
  });

  ipcMain.handle('file:saveBuffer', async (_event, arrayBuffer, filePath) => {
    await fs.writeFile(filePath, Buffer.from(arrayBuffer));
    return true;
  });

  ipcMain.handle('shell:openLibrary', async () => {
    await shell.openPath(library.getLibraryPath());
  });

  // --- Settings ---
  ipcMain.handle('settings:get', async () => {
    const defaults = {
      defaultProtectionLevel: 3,
      libraryPath: library.getLibraryPath(),
    };
    return readJsonFile(getSettingsPath(), defaults);
  });

  ipcMain.handle('settings:update', async (_event, settings) => {
    const current = await readJsonFile(getSettingsPath(), {});
    const updated = { ...current, ...settings };
    await writeJsonFile(getSettingsPath(), updated);
    return updated;
  });
}

module.exports = { registerIpcHandlers };

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Image processing
  processImage: (imageBuffer, protectionLevel) =>
    ipcRenderer.invoke('image:process', imageBuffer, protectionLevel),

  // Photo library
  libraryGetAll: () => ipcRenderer.invoke('library:getAll'),
  libraryAdd: (originalBuffer, protectedBuffer, metadata) =>
    ipcRenderer.invoke('library:add', originalBuffer, protectedBuffer, metadata),
  libraryDelete: (id) => ipcRenderer.invoke('library:delete', id),
  libraryExport: (id, format) => ipcRenderer.invoke('library:export', id, format),
  libraryClearAll: () => ipcRenderer.invoke('library:clearAll'),
  libraryGetImageDataUrl: (id, type) =>
    ipcRenderer.invoke('library:getImageDataUrl', id, type),

  // File dialogs
  showSaveDialog: (defaultName, format) =>
    ipcRenderer.invoke('dialog:showSave', defaultName, format),
  saveBufferToFile: (buffer, filePath, format) =>
    ipcRenderer.invoke('file:saveBuffer', buffer, filePath, format),
  openInFinder: () => ipcRenderer.invoke('shell:openLibrary'),

  // Settings
  getSettings: () => ipcRenderer.invoke('settings:get'),
  updateSettings: (settings) => ipcRenderer.invoke('settings:update', settings),
});

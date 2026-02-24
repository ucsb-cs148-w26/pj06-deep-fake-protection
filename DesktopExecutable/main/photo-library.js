const fs = require('fs/promises');
const path = require('path');
const { Jimp } = require('jimp');
const { ensureDirectory, generateId, readJsonFile, writeJsonFile } = require('./file-utils');

class PhotoLibrary {
  constructor(appDataPath) {
    this.basePath = path.join(appDataPath, 'library');
    this.originalsPath = path.join(this.basePath, 'originals');
    this.protectedPath = path.join(this.basePath, 'protected');
    this.thumbnailsPath = path.join(this.basePath, 'thumbnails');
    this.metadataPath = path.join(appDataPath, 'library.json');
  }

  async initialize() {
    await ensureDirectory(this.originalsPath);
    await ensureDirectory(this.protectedPath);
    await ensureDirectory(this.thumbnailsPath);

    const existing = await readJsonFile(this.metadataPath, null);
    if (!existing) {
      await writeJsonFile(this.metadataPath, { version: 1, images: [] });
    }
  }

  async _readMetadata() {
    return readJsonFile(this.metadataPath, { version: 1, images: [] });
  }

  async _writeMetadata(data) {
    await writeJsonFile(this.metadataPath, data);
  }

  async addImage(originalBuffer, protectedBuffer, metadata) {
    const id = generateId();
    const ext = 'jpg';

    // Save original
    await fs.writeFile(
      path.join(this.originalsPath, `${id}.${ext}`),
      originalBuffer
    );

    // Save protected
    await fs.writeFile(
      path.join(this.protectedPath, `${id}.${ext}`),
      protectedBuffer
    );

    // Generate and save thumbnail (300px wide)
    const image = await Jimp.read(Buffer.from(protectedBuffer));
    const scale = 300 / image.bitmap.width;
    image.resize({ w: 300, h: Math.round(image.bitmap.height * scale) });
    const thumbBuffer = await image.getBuffer('image/jpeg', { quality: 80 });
    await fs.writeFile(
      path.join(this.thumbnailsPath, `${id}.${ext}`),
      thumbBuffer
    );

    // Update metadata
    const db = await this._readMetadata();
    const entry = {
      id,
      originalFilename: metadata.originalFilename || 'unknown.jpg',
      protectionLevel: metadata.protectionLevel || 3,
      width: metadata.width || 0,
      height: metadata.height || 0,
      originalSize: originalBuffer.length,
      protectedSize: protectedBuffer.length,
      processedAt: new Date().toISOString(),
    };
    db.images.unshift(entry);
    await this._writeMetadata(db);

    return entry;
  }

  async getAll() {
    const db = await this._readMetadata();
    return db.images;
  }

  async getById(id) {
    const db = await this._readMetadata();
    return db.images.find((img) => img.id === id) || null;
  }

  async deleteImage(id) {
    const ext = 'jpg';
    const filesToDelete = [
      path.join(this.originalsPath, `${id}.${ext}`),
      path.join(this.protectedPath, `${id}.${ext}`),
      path.join(this.thumbnailsPath, `${id}.${ext}`),
    ];

    for (const file of filesToDelete) {
      try {
        await fs.unlink(file);
      } catch {
        // File may not exist, that's okay
      }
    }

    const db = await this._readMetadata();
    db.images = db.images.filter((img) => img.id !== id);
    await this._writeMetadata(db);
  }

  async exportImage(id, destPath, format) {
    const src = path.join(this.protectedPath, `${id}.jpg`);
    if (format && format !== 'image/jpeg') {
      const image = await Jimp.read(src);
      await fs.writeFile(destPath, await image.getBuffer(format));
    } else {
      await fs.copyFile(src, destPath);
    }
  }

  async getImageDataUrl(id, type) {
    const ext = 'jpg';
    let dir;
    if (type === 'thumbnail') dir = this.thumbnailsPath;
    else if (type === 'original') dir = this.originalsPath;
    else dir = this.protectedPath;

    const filePath = path.join(dir, `${id}.${ext}`);
    const data = await fs.readFile(filePath);
    return `data:image/jpeg;base64,${data.toString('base64')}`;
  }

  async clearAll() {
    const db = await this._readMetadata();
    for (const img of db.images) {
      await this.deleteImage(img.id);
    }
    await this._writeMetadata({ version: 1, images: [] });
  }

  getLibraryPath() {
    return this.basePath;
  }
}

module.exports = PhotoLibrary;

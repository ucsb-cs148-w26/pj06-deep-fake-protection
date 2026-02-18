import { useState, useEffect, useCallback } from 'react';

export function usePhotoLibrary() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const all = await window.electronAPI.libraryGetAll();
      setImages(all);
    } catch {
      setImages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addImage = useCallback(
    async (originalBuffer, protectedBuffer, metadata) => {
      const entry = await window.electronAPI.libraryAdd(
        originalBuffer,
        protectedBuffer,
        metadata
      );
      await refresh();
      return entry;
    },
    [refresh]
  );

  const deleteImage = useCallback(
    async (id) => {
      await window.electronAPI.libraryDelete(id);
      await refresh();
    },
    [refresh]
  );

  const exportImage = useCallback(async (id) => {
    return await window.electronAPI.libraryExport(id);
  }, []);

  const clearAll = useCallback(async () => {
    await window.electronAPI.libraryClearAll();
    await refresh();
  }, [refresh]);

  return { images, loading, refresh, addImage, deleteImage, exportImage, clearAll };
}

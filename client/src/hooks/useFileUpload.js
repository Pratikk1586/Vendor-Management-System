/**
 * @fileoverview File selection, validation, preview, and upload progress hook.
 */

import { useState, useCallback } from 'react';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE_BYTES } from '../constants/upload.js';

/**
 * Manages multi-file upload state with client-side validation.
 * @returns {object} File upload state and handlers.
 */
export function useFileUpload() {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  /**
   * Validates a single file for type and size.
   * @param {File} file File to validate.
   * @returns {string|null} Error message or null if valid.
   */
  const validateFile = (file) => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return `${file.name}: Only PDF, JPG, JPEG, and PNG files are allowed`;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return `${file.name}: File exceeds maximum size of 5MB`;
    }
    return null;
  };

  /**
   * Adds files to the selection after validation.
   * @param {FileList|File[]} newFiles Files to add.
   */
  const addFiles = useCallback((newFiles) => {
    const fileArray = Array.from(newFiles);
    const errors = [];

    const validFiles = fileArray
      .map((file) => {
        const validationError = validateFile(file);
        if (validationError) {
          errors.push(validationError);
          return null;
        }
        return {
          file,
          preview: file.type.startsWith('image/')
            ? URL.createObjectURL(file)
            : null,
          id: `${file.name}-${Date.now()}-${Math.random()}`,
        };
      })
      .filter(Boolean);

    if (errors.length) {
      setError(errors.join('. '));
    } else {
      setError(null);
    }

    setFiles((prev) => [...prev, ...validFiles]);
  }, []);

  /**
   * Removes a file from the selection by ID.
   * @param {string} id File entry ID.
   */
  const removeFile = useCallback((id) => {
    setFiles((prev) => {
      const removed = prev.find((f) => f.id === id);
      if (removed?.preview) {
        URL.revokeObjectURL(removed.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  /**
   * Clears all selected files and revokes preview URLs.
   */
  const clearFiles = useCallback(() => {
    files.forEach((f) => {
      if (f.preview) {
        URL.revokeObjectURL(f.preview);
      }
    });
    setFiles([]);
    setProgress(0);
    setError(null);
  }, [files]);

  /**
   * Uploads files via a provided upload function with progress tracking.
   * @param {function(FormData, object): Promise} uploadFn Async upload function receiving FormData and config.
   * @returns {Promise<unknown[]>}
   */
  const uploadFiles = useCallback(
    async (uploadFn) => {
      if (!files.length) {
        return [];
      }

      setIsUploading(true);
      setProgress(0);
      const results = [];

      try {
        for (let i = 0; i < files.length; i += 1) {
          const formData = new FormData();
          formData.append('file', files[i].file);

          const result = await uploadFn(formData, {
            onUploadProgress: (event) => {
              const fileProgress = event.total
                ? Math.round((event.loaded / event.total) * 100)
                : 0;
              const overall = Math.round(
                ((i + fileProgress / 100) / files.length) * 100,
              );
              setProgress(overall);
            },
          });

          results.push(result);
        }

        setProgress(100);
        return results;
      } catch (err) {
        setError(err.message || 'Upload failed');
        throw err;
      } finally {
        setIsUploading(false);
      }
    },
    [files],
  );

  return {
    files,
    addFiles,
    removeFile,
    clearFiles,
    uploadFiles,
    isUploading,
    progress,
    error,
  };
}

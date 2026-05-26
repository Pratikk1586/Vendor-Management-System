/**
 * @fileoverview Drag-and-drop file upload zone with validation and file list.
 */

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import clsx from 'clsx';
import { Upload, X, FileText } from 'lucide-react';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE_BYTES } from '../../constants/upload.js';

/**
 * @param {object} props Component props.
 * @param {string} [props.accept] Comma-separated MIME types.
 * @param {number} [props.maxSize] Max file size in bytes.
 * @param {boolean} [props.multiple=false]
 * @param {function} props.onFilesChange Callback with File[] array.
 * @param {string} [props.label]
 * @param {Array<{file: File, error?: string}>} [props.files=[]]
 * @param {number} [props.progress=0]
 */
export default function FileUpload({
  accept,
  maxSize = MAX_FILE_SIZE_BYTES,
  multiple = false,
  onFilesChange,
  label = 'Upload files',
  files = [],
  progress = 0,
}) {
  const acceptMap = accept
    ? Object.fromEntries(accept.split(',').map((t) => [t.trim(), []]))
    : Object.fromEntries(ALLOWED_FILE_TYPES.map((t) => [t, []]));

  const onDrop = useCallback(
    (accepted, rejected) => {
      if (rejected.length) {
        const errors = rejected.map((r) => r.errors[0]?.message).join(', ');
        onFilesChange(accepted, errors);
        return;
      }
      const merged = multiple ? [...files.map((f) => f.file || f), ...accepted] : accepted;
      onFilesChange(merged);
    },
    [files, multiple, onFilesChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptMap,
    maxSize,
    multiple,
  });

  const removeFile = (index) => {
    const next = files.filter((_, i) => i !== index).map((f) => f.file || f);
    onFilesChange(next);
  };

  return (
    <div className="w-full">
      {label && <p className="mb-2 text-sm font-medium text-gray-300">{label}</p>}
      <div
        {...getRootProps()}
        className={clsx(
          'cursor-pointer rounded-lg border-2 border-dashed px-6 py-8 text-center transition-colors',
          isDragActive
            ? 'border-tata-blue bg-tata-blue/10'
            : 'border-steel-600 bg-steel-800/50 hover:border-tata-light',
        )}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto mb-2 h-8 w-8 text-gray-400" />
        <p className="text-sm text-gray-400">
          {isDragActive ? 'Drop files here' : 'Drag & drop or click to browse'}
        </p>
        <p className="mt-1 text-xs text-gray-500">PDF, JPG, JPEG, PNG — max 5MB</p>
      </div>

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((entry, index) => (
            <li
              key={`${entry.file?.name}-${index}`}
              className="flex items-center gap-3 rounded-lg border border-steel-600 bg-steel-800 px-3 py-2"
            >
              <FileText size={18} className="shrink-0 text-tata-light" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-gray-200">{entry.file?.name}</p>
                {entry.error && <p className="text-xs text-red-400">{entry.error}</p>}
                {progress > 0 && !entry.error && (
                  <div className="mt-1 h-1 overflow-hidden rounded-full bg-steel-600">
                    <div
                      className="h-full bg-tata-blue transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-gray-400 hover:text-red-400"
                aria-label="Remove file"
              >
                <X size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

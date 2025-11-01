'use client';

import { motion } from 'framer-motion';
import { X, Download, Trash2, Copy, Check, FileVideo } from 'lucide-react';
import { MediaFile } from '../page';
import { useState } from 'react';

interface PreviewModalProps {
  file: MediaFile;
  onClose: () => void;
  onDelete: () => void;
}

export default function PreviewModal({ file, onClose, onDelete }: PreviewModalProps) {
  const [copied, setCopied] = useState(false);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleCopyURL = async () => {
    try {
      await navigator.clipboard.writeText(file.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this file?')) {
      onDelete();
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl glass-panel rounded-xl border glow-effect overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex-1 min-w-0 pr-4">
            <h2 className="text-xl font-display font-semibold truncate">{file.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {formatFileSize(file.size)} • Uploaded {formatDate(file.uploadedAt)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview */}
        <div className="p-6 bg-secondary/20">
          <div className="max-h-[60vh] flex items-center justify-center bg-background rounded-lg overflow-hidden">
            {file.type === 'image' ? (
              <img
                src={file.url}
                alt={file.name}
                className="max-w-full max-h-[60vh] object-contain"
              />
            ) : (
              <div className="w-full aspect-video flex items-center justify-center">
                <div className="text-center">
                  <FileVideo className="w-20 h-20 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">Video preview</p>
                  <p className="text-sm text-muted-foreground mt-1">{file.name}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground block mb-1">File Type</label>
              <p className="text-sm font-medium capitalize">{file.type}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground block mb-1">File Size</label>
              <p className="text-sm font-medium">{formatFileSize(file.size)}</p>
            </div>
            {file.dimensions && (
              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-1">Dimensions</label>
                <p className="text-sm font-medium">
                  {file.dimensions.width} × {file.dimensions.height} px
                </p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-muted-foreground block mb-1">Uploaded</label>
              <p className="text-sm font-medium">{formatDate(file.uploadedAt)}</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-2">File URL</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={file.url}
                readOnly
                className="flex-1 px-3 py-2 bg-secondary border border-border rounded-lg text-sm font-mono"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopyURL}
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-secondary/20">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDelete}
            className="px-4 py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </motion.button>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownload}
              className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </motion.button>
            <button
              onClick={onClose}
              className="px-4 py-2 hover:bg-secondary rounded-lg font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

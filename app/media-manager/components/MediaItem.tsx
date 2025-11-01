'use client';

import { motion } from 'framer-motion';
import { FileVideo, Trash2, Eye, Image as ImageIcon } from 'lucide-react';
import { MediaFile } from '../page';
import { useState } from 'react';

interface MediaItemProps {
  file: MediaFile;
  index: number;
  onClick: () => void;
  onDelete: () => void;
}

export default function MediaItem({ file, index, onClick, onDelete }: MediaItemProps) {
  const [imageError, setImageError] = useState(false);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="glass-panel rounded-xl border overflow-hidden group cursor-pointer hover:border-primary/50 transition-all"
      onClick={onClick}
    >
      {/* Preview */}
      <div className="relative aspect-video bg-secondary overflow-hidden">
        {file.type === 'image' ? (
          imageError ? (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-muted-foreground" />
            </div>
          ) : (
            <img
              src={file.url}
              alt={file.name}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FileVideo className="w-12 h-12 text-primary" />
          </div>
        )}

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="p-3 bg-background rounded-lg hover:scale-110 transition-transform"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm('Are you sure you want to delete this file?')) {
                onDelete();
              }
            }}
            className="p-3 bg-background rounded-lg hover:scale-110 transition-transform"
          >
            <Trash2 className="w-5 h-5 text-destructive" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h4 className="font-medium truncate group-hover:text-primary transition-colors mb-1">
          {file.name}
        </h4>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="capitalize">{file.type}</span>
          <span>{formatFileSize(file.size)}</span>
        </div>
      </div>
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { FileImage, FileVideo, Trash2, Eye } from 'lucide-react';
import { MediaFile } from '../page';
import MediaItem from './MediaItem';

interface MediaGridProps {
  files: MediaFile[];
  viewMode: 'grid' | 'list';
  onFileClick: (file: MediaFile) => void;
  onDelete: (id: string) => void;
}

export default function MediaGrid({ files, viewMode, onFileClick, onDelete }: MediaGridProps) {
  if (files.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <div className="glass-panel p-12 rounded-2xl border-2 border-dashed border-border max-w-md mx-auto">
          <div className="w-20 h-20 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
            <FileImage className="w-10 h-10 text-primary-foreground" />
          </div>
          <h3 className="text-2xl font-display font-semibold mb-3">No media files yet</h3>
          <p className="text-muted-foreground mb-6">
            Upload your first image or video to get started
          </p>
        </div>
      </motion.div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-2">
        {files.map((file, index) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className="glass-panel p-4 rounded-lg border hover:border-primary/50 transition-all group cursor-pointer"
            onClick={() => onFileClick(file)}
          >
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-secondary">
                {file.type === 'image' ? (
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FileVideo className="w-6 h-6 text-primary" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate group-hover:text-primary transition-colors">
                  {file.name}
                </h4>
                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                  <span className="capitalize">{file.type}</span>
                  <span>•</span>
                  <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                  <span>•</span>
                  <span>{new Date(file.uploadedAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onFileClick(file);
                  }}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(file.id);
                  }}
                  className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {files.map((file, index) => (
        <MediaItem
          key={file.id}
          file={file}
          index={index}
          onClick={() => onFileClick(file)}
          onDelete={() => onDelete(file.id)}
        />
      ))}
    </div>
  );
}

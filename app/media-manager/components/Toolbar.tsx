'use client';

import { motion } from 'framer-motion';
import { Upload, FileImage, FileVideo } from 'lucide-react';

interface ToolbarProps {
  totalFiles: number;
  onUpload: () => void;
}

export default function Toolbar({ totalFiles, onUpload }: ToolbarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-panel p-4 rounded-xl border mb-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FileImage className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{totalFiles}</span> files
            </span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onUpload}
          className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Upload className="w-4 h-4" />
          Upload
        </motion.button>
      </div>
    </motion.div>
  );
}

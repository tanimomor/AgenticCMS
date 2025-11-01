'use client';

import { motion } from 'framer-motion';
import { Plus, FileText } from 'lucide-react';

interface ContentToolbarProps {
  totalItems: number;
  onAddNew: () => void;
}

export default function ContentToolbar({ totalItems, onAddNew }: ContentToolbarProps) {
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
            <FileText className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{totalItems}</span> content items
            </span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddNew}
          className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New
        </motion.button>
      </div>
    </motion.div>
  );
}

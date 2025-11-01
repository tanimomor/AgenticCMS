'use client';

import { motion } from 'framer-motion';
import { FileText, Edit2, Trash2, Eye, Clock, User } from 'lucide-react';
import { ContentItem } from '../page';

interface ContentCardProps {
  item: ContentItem;
  index: number;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Published':
      return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    case 'Draft':
      return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    case 'Scheduled':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  }
};

const getTypeColor = (type: string): string => {
  switch (type) {
    case 'Blog':
      return 'bg-purple-500/10 text-purple-500';
    case 'Page':
      return 'bg-blue-500/10 text-blue-500';
    case 'Product':
      return 'bg-emerald-500/10 text-emerald-500';
    case 'Article':
      return 'bg-amber-500/10 text-amber-500';
    default:
      return 'bg-gray-500/10 text-gray-500';
  }
};

export default function ContentCard({ item, index, onClick, onEdit, onDelete }: ContentCardProps) {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
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
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-accent rounded-lg">
              <FileText className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
              {item.type}
            </span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
            {item.status}
          </span>
        </div>

        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {item.title}
        </h3>
        
        {item.excerpt && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {item.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{item.author}</span>
            </div>
            {item.views !== undefined && (
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{item.views.toLocaleString()}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{formatDate(item.lastModified)}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 py-3 bg-secondary/20 border-t border-border flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="p-2 hover:bg-background rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="p-2 hover:bg-background rounded-lg transition-colors"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4 text-destructive" />
        </button>
      </div>
    </motion.div>
  );
}

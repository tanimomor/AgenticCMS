'use client';

import { motion } from 'framer-motion';
import { X, Edit2, Trash2, Calendar, User, Eye, FileText } from 'lucide-react';
import { ContentItem } from '../page';

interface ContentDetailModalProps {
  content: ContentItem;
  onClose: () => void;
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

export default function ContentDetailModal({ content, onClose, onEdit, onDelete }: ContentDetailModalProps) {
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
        className="w-full max-w-3xl glass-panel rounded-xl border glow-effect overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 glass-panel border-b border-border z-10">
          <div className="flex items-center justify-between p-6">
            <div className="flex-1 min-w-0 pr-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-accent rounded-lg">
                  <FileText className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(content.status)}`}>
                  {content.status}
                </span>
              </div>
              <h2 className="text-2xl font-display font-semibold">{content.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {content.type} • Last modified {formatDate(content.lastModified)}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary rounded-lg transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-panel p-4 rounded-lg border">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Author</span>
              </div>
              <p className="font-medium">{content.author}</p>
            </div>
            <div className="glass-panel p-4 rounded-lg border">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">Last Modified</span>
              </div>
              <p className="font-medium text-sm">{formatDate(content.lastModified)}</p>
            </div>
            {content.views !== undefined && (
              <div className="glass-panel p-4 rounded-lg border">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-medium">Views</span>
                </div>
                <p className="font-medium">{content.views.toLocaleString()}</p>
              </div>
            )}
          </div>

          {/* Excerpt */}
          {content.excerpt && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Excerpt</h3>
              <div className="glass-panel p-4 rounded-lg border">
                <p className="text-sm">{content.excerpt}</p>
              </div>
            </div>
          )}

          {/* Content Preview */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Content Preview</h3>
            <div className="glass-panel p-6 rounded-lg border">
              <p className="text-sm text-muted-foreground">
                {content.content || 'No content available yet. Click Edit to add content.'}
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Content Type</h4>
              <p className="text-sm font-medium capitalize">{content.type}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Status</h4>
              <p className="text-sm font-medium capitalize">{content.status}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 glass-panel border-t border-border p-6">
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onDelete}
              className="px-4 py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </motion.button>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 hover:bg-secondary rounded-lg font-medium transition-colors"
              >
                Close
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onEdit}
                className="px-4 py-2 bg-gradient-accent text-primary-foreground rounded-lg font-medium flex items-center gap-2 glow-effect"
              >
                <Edit2 className="w-4 h-4" />
                Edit Content
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

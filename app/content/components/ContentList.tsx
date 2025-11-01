'use client';

import { motion } from 'framer-motion';
import { FileText, Edit2, Trash2, Eye, Clock, User } from 'lucide-react';
import { ContentItem } from '../page';
import ContentCard from './ContentCard';

interface ContentListProps {
  items: ContentItem[];
  viewMode: 'grid' | 'list';
  onItemClick: (item: ContentItem) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
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

export default function ContentList({ items, viewMode, onItemClick, onEdit, onDelete }: ContentListProps) {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <div className="glass-panel p-12 rounded-2xl border-2 border-dashed border-border max-w-md mx-auto">
          <div className="w-20 h-20 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
            <FileText className="w-10 h-10 text-primary-foreground" />
          </div>
          <h3 className="text-2xl font-display font-semibold mb-3">No content found</h3>
          <p className="text-muted-foreground mb-6">
            Create your first content item to get started
          </p>
        </div>
      </motion.div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-2">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className="glass-panel p-4 rounded-lg border hover:border-primary/50 transition-all group cursor-pointer"
            onClick={() => onItemClick(item)}
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gradient-accent rounded-lg flex-shrink-0">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium truncate group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                    {item.type}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{item.author}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatDate(item.lastModified)}</span>
                  </div>
                  {item.views !== undefined && (
                    <>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{item.views.toLocaleString()} views</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${getStatusColor(item.status)}`}>
                {item.status}
              </span>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onItemClick(item);
                  }}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(item.id);
                  }}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item.id);
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <ContentCard
          key={item.id}
          item={item}
          index={index}
          onClick={() => onItemClick(item)}
          onEdit={() => onEdit(item.id)}
          onDelete={() => onDelete(item.id)}
        />
      ))}
    </div>
  );
}

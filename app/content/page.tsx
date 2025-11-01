'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Search, Grid3x3, List as ListIcon } from 'lucide-react';
import Link from 'next/link';
import ContentList from './components/ContentList';
import ContentDetailModal from './components/ContentDetailModal';
import ContentToolbar from './components/ContentToolbar';

export interface ContentItem {
  id: string;
  title: string;
  type: 'Blog' | 'Page' | 'Product' | 'Article';
  status: 'Published' | 'Draft' | 'Scheduled';
  lastModified: string;
  author: string;
  excerpt?: string;
  content?: string;
  views?: number;
}

// Generate mock content data
const generateMockContent = (): ContentItem[] => {
  return [
    {
      id: '1',
      title: 'Getting Started with Next.js 14',
      type: 'Blog',
      status: 'Published',
      lastModified: '2025-10-28T10:30:00',
      author: 'Sarah Chen',
      excerpt: 'Learn how to build modern web applications with Next.js 14 and the App Router.',
      content: 'Full content here...',
      views: 2840,
    },
    {
      id: '2',
      title: 'About Us',
      type: 'Page',
      status: 'Published',
      lastModified: '2025-10-25T14:20:00',
      author: 'John Doe',
      excerpt: 'Learn more about our company and mission.',
      content: 'Full content here...',
      views: 1520,
    },
    {
      id: '3',
      title: 'Premium Headphones',
      type: 'Product',
      status: 'Published',
      lastModified: '2025-10-27T09:15:00',
      author: 'Emily Rodriguez',
      excerpt: 'High-quality wireless headphones with noise cancellation.',
      content: 'Full content here...',
      views: 3450,
    },
    {
      id: '4',
      title: 'Building Scalable APIs',
      type: 'Article',
      status: 'Draft',
      lastModified: '2025-10-29T16:45:00',
      author: 'Marcus Johnson',
      excerpt: 'Best practices for designing and building scalable REST APIs.',
      content: 'Full content here...',
      views: 0,
    },
    {
      id: '5',
      title: 'Contact Information',
      type: 'Page',
      status: 'Published',
      lastModified: '2025-10-20T11:00:00',
      author: 'Sarah Chen',
      excerpt: 'Get in touch with our team.',
      content: 'Full content here...',
      views: 890,
    },
    {
      id: '6',
      title: 'Understanding TypeScript Generics',
      type: 'Blog',
      status: 'Scheduled',
      lastModified: '2025-10-30T08:00:00',
      author: 'David Kim',
      excerpt: 'A comprehensive guide to TypeScript generics and their practical applications.',
      content: 'Full content here...',
      views: 0,
    },
    {
      id: '7',
      title: 'Wireless Keyboard Pro',
      type: 'Product',
      status: 'Published',
      lastModified: '2025-10-26T13:30:00',
      author: 'Emily Rodriguez',
      excerpt: 'Mechanical keyboard with RGB lighting and wireless connectivity.',
      content: 'Full content here...',
      views: 2100,
    },
    {
      id: '8',
      title: 'The Future of Web Development',
      type: 'Article',
      status: 'Published',
      lastModified: '2025-10-24T15:20:00',
      author: 'Marcus Johnson',
      excerpt: 'Exploring emerging trends and technologies in web development.',
      content: 'Full content here...',
      views: 4200,
    },
  ];
};

export default function ContentPage() {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setContentItems(generateMockContent());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this content?')) {
      setContentItems(prev => prev.filter(item => item.id !== id));
      if (selectedContent?.id === id) {
        setSelectedContent(null);
      }
    }
  };

  const handleEdit = (id: string) => {
    const item = contentItems.find(i => i.id === id);
    if (item) {
      setSelectedContent(item);
    }
  };

  const filteredContent = contentItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredContent.length / itemsPerPage);
  const paginatedContent = filteredContent.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="glass-panel border-b sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-secondary rounded-lg transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back to Dashboard</span>
              </motion.button>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-[300px] bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
                }`}
              >
                <ListIcon className="w-4 h-4" />
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-accent text-primary-foreground rounded-lg font-medium flex items-center gap-2 glow-effect"
            >
              <Plus className="w-4 h-4" />
              Add New
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-display font-bold mb-2">Content Management</h1>
          <p className="text-muted-foreground text-lg">
            Manage your blog posts, pages, products, and articles
          </p>
        </motion.div>

        <ContentToolbar
          totalItems={filteredContent.length}
          onAddNew={() => console.log('Add new content')}
        />

        <ContentList
          items={paginatedContent}
          viewMode={viewMode}
          onItemClick={setSelectedContent}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex items-center justify-center gap-2"
          >
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </motion.div>
        )}
      </main>

      {/* Detail Modal */}
      {selectedContent && (
        <ContentDetailModal
          content={selectedContent}
          onClose={() => setSelectedContent(null)}
          onEdit={() => console.log('Edit', selectedContent.id)}
          onDelete={() => handleDelete(selectedContent.id)}
        />
      )}
    </div>
  );
}

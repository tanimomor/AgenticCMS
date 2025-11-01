'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload as UploadIcon, Grid3x3, List, Search } from 'lucide-react';
import Link from 'next/link';
import MediaUpload from './components/MediaUpload';
import MediaGrid from './components/MediaGrid';
import PreviewModal from './components/PreviewModal';
import Toolbar from './components/Toolbar';

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
  size: number;
  uploadedAt: string;
  dimensions?: { width: number; height: number };
}

// Generate mock data
const generateMockData = (): MediaFile[] => {
  const mockImages = [
    { id: '1', name: 'hero-banner.jpg', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800', type: 'image' as const, size: 2456789 },
    { id: '2', name: 'product-shot.png', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800', type: 'image' as const, size: 1234567 },
    { id: '3', name: 'team-photo.jpg', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800', type: 'image' as const, size: 3456789 },
    { id: '4', name: 'background.webp', url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800', type: 'image' as const, size: 987654 },
    { id: '5', name: 'logo.svg', url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800', type: 'image' as const, size: 45678 },
    { id: '6', name: 'promo-video.mp4', url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800', type: 'video' as const, size: 8765432 },
    { id: '7', name: 'nature.jpg', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', type: 'image' as const, size: 2345678 },
    { id: '8', name: 'workspace.png', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', type: 'image' as const, size: 1876543 },
  ];

  return mockImages.map(img => ({
    ...img,
    uploadedAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    dimensions: { width: 1920, height: 1080 },
  }));
};

export default function MediaManagerPage() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  useEffect(() => {
    // Load mock data on mount
    setMediaFiles(generateMockData());
  }, []);

  const handleUpload = (files: File[]) => {
    const newFiles: MediaFile[] = files.map(file => ({
      id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 'video',
      size: file.size,
      uploadedAt: new Date().toISOString(),
      dimensions: { width: 1920, height: 1080 },
    }));

    setMediaFiles(prev => [...newFiles, ...prev]);
    setIsUploadOpen(false);
  };

  const handleDelete = (id: string) => {
    setMediaFiles(prev => prev.filter(f => f.id !== id));
    if (selectedFile?.id === id) {
      setSelectedFile(null);
    }
  };

  const filteredFiles = mediaFiles.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
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
                placeholder="Search media..."
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
                <List className="w-4 h-4" />
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsUploadOpen(true)}
              className="px-4 py-2 bg-gradient-accent text-primary-foreground rounded-lg font-medium flex items-center gap-2 glow-effect"
            >
              <UploadIcon className="w-4 h-4" />
              Upload Media
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
          <h1 className="text-4xl font-display font-bold mb-2">Media Library</h1>
          <p className="text-muted-foreground text-lg">
            Manage your images, videos, and other media assets
          </p>
        </motion.div>

        <Toolbar
          totalFiles={filteredFiles.length}
          onUpload={() => setIsUploadOpen(true)}
        />

        <MediaGrid
          files={filteredFiles}
          viewMode={viewMode}
          onFileClick={setSelectedFile}
          onDelete={handleDelete}
        />
      </main>

      {/* Upload Modal */}
      {isUploadOpen && (
        <MediaUpload
          onUpload={handleUpload}
          onClose={() => setIsUploadOpen(false)}
        />
      )}

      {/* Preview Modal */}
      {selectedFile && (
        <PreviewModal
          file={selectedFile}
          onClose={() => setSelectedFile(null)}
          onDelete={() => handleDelete(selectedFile.id)}
        />
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Settings as SettingsIcon } from 'lucide-react';
import Link from 'next/link';
import SettingsForm from './components/SettingsForm';

export interface SettingsData {
  siteTitle: string;
  themeMode: 'light' | 'dark' | 'system';
  uploadPath: string;
}

const DEFAULT_SETTINGS: SettingsData = {
  siteTitle: 'Artisan CMS',
  themeMode: 'dark',
  uploadPath: '/public/uploads',
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsData>(DEFAULT_SETTINGS);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cms_settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load settings:', e);
      }
    }
  }, []);

  const handleChange = (field: keyof SettingsData, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
    setIsSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem('cms_settings', JSON.stringify(settings));
    setHasChanges(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
      setSettings(DEFAULT_SETTINGS);
      localStorage.removeItem('cms_settings');
      setHasChanges(false);
      setIsSaved(false);
    }
  };

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

          {hasChanges && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3"
            >
              <span className="text-sm text-muted-foreground">Unsaved changes</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="px-4 py-2 bg-gradient-accent text-primary-foreground rounded-lg font-medium glow-effect"
              >
                Save Changes
              </motion.button>
            </motion.div>
          )}

          {isSaved && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-sm text-emerald-500 font-medium"
            >
              ✓ Settings saved successfully
            </motion.div>
          )}
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
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-accent rounded-xl">
              <SettingsIcon className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold">Settings</h1>
              <p className="text-muted-foreground text-lg">
                Configure your CMS preferences and system settings
              </p>
            </div>
          </div>
        </motion.div>

        <div className="max-w-3xl">
          <SettingsForm
            settings={settings}
            onChange={handleChange}
            onSave={handleSave}
            onReset={handleReset}
            hasChanges={hasChanges}
            isSaved={isSaved}
          />
        </div>
      </main>
    </div>
  );
}

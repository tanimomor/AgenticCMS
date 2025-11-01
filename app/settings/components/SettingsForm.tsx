'use client';

import { motion } from 'framer-motion';
import { Globe, Palette, FolderOpen, Save, RotateCcw, Check } from 'lucide-react';
import { SettingsData } from '../page';

interface SettingsFormProps {
  settings: SettingsData;
  onChange: (field: keyof SettingsData, value: string) => void;
  onSave: () => void;
  onReset: () => void;
  hasChanges: boolean;
  isSaved: boolean;
}

export default function SettingsForm({
  settings,
  onChange,
  onSave,
  onReset,
  hasChanges,
  isSaved,
}: SettingsFormProps) {
  return (
    <div className="space-y-6">
      {/* General Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel p-6 rounded-xl border"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Globe className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-display font-semibold">General Settings</h2>
            <p className="text-sm text-muted-foreground">Basic site configuration</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="siteTitle" className="block text-sm font-medium mb-2">
              Site Title
            </label>
            <input
              id="siteTitle"
              type="text"
              value={settings.siteTitle}
              onChange={(e) => onChange('siteTitle', e.target.value)}
              placeholder="Enter your site title"
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <p className="text-xs text-muted-foreground mt-1">
              This will be displayed in the browser tab and as your site name
            </p>
          </div>
        </div>
      </motion.div>

      {/* Appearance Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-panel p-6 rounded-xl border"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <Palette className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h2 className="text-xl font-display font-semibold">Appearance</h2>
            <p className="text-sm text-muted-foreground">Customize the look and feel</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="themeMode" className="block text-sm font-medium mb-2">
              Theme Mode
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['light', 'dark', 'system'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => onChange('themeMode', mode)}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    settings.themeMode === mode
                      ? 'border-primary bg-primary/10 text-primary font-medium'
                      : 'border-border hover:border-primary/50 bg-background'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {settings.themeMode === mode && <Check className="w-4 h-4" />}
                    <span className="capitalize">{mode}</span>
                  </div>
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Choose your preferred color scheme. System will match your device settings.
            </p>
          </div>
        </div>
      </motion.div>

      {/* File Management Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-panel p-6 rounded-xl border"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <FolderOpen className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <h2 className="text-xl font-display font-semibold">File Management</h2>
            <p className="text-sm text-muted-foreground">Configure file upload settings</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="uploadPath" className="block text-sm font-medium mb-2">
              Upload Path
            </label>
            <div className="relative">
              <input
                id="uploadPath"
                type="text"
                value={settings.uploadPath}
                onChange={(e) => onChange('uploadPath', e.target.value)}
                placeholder="/public/uploads"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-mono text-sm"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Default directory for uploaded media files
            </p>
          </div>

          <div className="glass-panel p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-amber-600 dark:text-amber-400">
              <strong>Note:</strong> Changing the upload path requires server restart and may affect existing media references.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-panel p-6 rounded-xl border"
      >
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onReset}
            className="px-4 py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Defaults
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSave}
            disabled={!hasChanges}
            className="px-6 py-2 bg-gradient-accent text-primary-foreground rounded-lg font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed glow-effect transition-all"
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4" />
                Saved
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-panel p-4 rounded-xl border border-blue-500/20 bg-blue-500/5"
      >
        <p className="text-sm text-blue-600 dark:text-blue-400">
          <strong>ℹ️ Local Storage:</strong> Settings are currently stored in your browser's local storage. These changes will only affect this device.
        </p>
      </motion.div>
    </div>
  );
}

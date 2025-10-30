'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Type, FileText, List, Plus, Sparkles, 
  Image, User, Users, Star, Heart, Calendar, 
  Clock, MapPin, Mail, Phone, Link, Camera, Video, Music,
  Book, Bookmark, Tag, Folder, File, Archive, Package, Box, Grid,
  AlignLeft, Hash, List as ListIcon, CheckSquare
} from 'lucide-react';
import { COMPONENT_DEFINITIONS } from './types';
import { loadCustomComponents } from '@/lib/customComponentsStorage';

const iconMap = {
  Type,
  FileText,
  List,
  Image, User, Users, Star, Heart, Calendar, 
  Clock, MapPin, Mail, Phone, Link, Camera, Video, Music,
  Book, Bookmark, Tag, Folder, File, Archive, Package, Box, Grid,
  AlignLeft, Hash, List: ListIcon, CheckSquare,
};

export default function ComponentPalette({ onAddComponent }) {
  const [customComponents, setCustomComponents] = useState([]);

  useEffect(() => {
    setCustomComponents(loadCustomComponents());
  }, []);

  const handleAdd = (type, isCustom = false, customData = null) => {
    if (isCustom && customData) {
      onAddComponent(type, customData);
    } else {
      onAddComponent(type);
    }
  };

  return (
    <div className="w-80 glass-panel border-r h-full flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-display font-semibold">Component Palette</h2>
            <p className="text-xs text-muted-foreground">Drag to add to canvas</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">Available Components</h3>
          <div className="space-y-3">
            {COMPONENT_DEFINITIONS.map((component, index) => {
              const Icon = iconMap[component.icon];
              return (
                <motion.div
                  key={component.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="glass-panel p-4 rounded-lg border cursor-pointer group hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gradient-accent rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium mb-1 group-hover:text-primary transition-colors">{component.label}</h4>
                      <p className="text-xs text-muted-foreground">{component.description}</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAdd(component.type)}
                    className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-all text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Add Component
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Custom Components Section */}
        {customComponents.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Your Custom Components
            </h3>
            <div className="space-y-3">
              {customComponents.map((component, index) => {
                const Icon = iconMap[component.icon] || FileText;
                return (
                  <motion.div
                    key={component.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="glass-panel p-4 rounded-lg border cursor-pointer group hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gradient-accent rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium mb-1 group-hover:text-primary transition-colors">{component.name}</h4>
                        <p className="text-xs text-muted-foreground">{component.description || `${component.fields.length} custom fields`}</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAdd('custom', true, component)}
                      className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-all text-sm font-medium"
                    >
                      <Plus className="w-4 h-4" />
                      Add Component
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Usage Tips */}
        <div className="mt-8 p-4 bg-secondary/50 rounded-lg border border-border">
          <h4 className="text-sm font-medium mb-2">💡 Quick Tips</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Click + to add components</li>
            <li>• Drag to reorder in canvas</li>
            <li>• Click to edit properties</li>
            <li>• Delete unwanted components</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
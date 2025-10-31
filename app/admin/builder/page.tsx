'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Menu, X } from 'lucide-react';
import ComponentPalette from '../components/Builder/ComponentPalette';
import BuilderCanvas from '../components/Builder/BuilderCanvas';
import { createComponent, Component, ComponentType, COMPONENT_TYPES } from '../components/Builder/types';
import Link from 'next/link';

export default function BuilderPage() {
  const [components, setComponents] = useState<Component[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleAddComponent = (type: ComponentType | string, isCustom?: boolean, customData?: any) => {
    if (isCustom && customData) {
      // Handle custom component
      const newComponent: Component = {
        id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: 'custom',
        data: {
          label: customData.name || 'Custom Component',
          value: '',
        },
      };
      setComponents([...components, newComponent]);
    } else if (type === COMPONENT_TYPES.TEXT || type === COMPONENT_TYPES.RICHTEXT || type === COMPONENT_TYPES.ENUM) {
      try {
        const newComponent = createComponent(type as ComponentType);
        setComponents([...components, newComponent]);
      } catch (error) {
        console.error('Failed to create component:', error);
      }
    }
  };

  const handleDeleteComponent = (id: string) => {
    setComponents(components.filter(c => c.id !== id));
  };

  const handleUpdateComponent = (id: string, newData: Component['data']) => {
    setComponents(components.map(c => 
      c.id === id ? { ...c, data: newData } : c
    ));
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient Background Effects */}
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
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-secondary rounded-lg transition-colors lg:hidden"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-61px)] relative">
        {/* Sidebar with Palette */}
        {sidebarOpen && (
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative z-30"
          >
            <ComponentPalette onAddComponent={handleAddComponent} />
          </motion.div>
        )}

        {/* Canvas */}
        <BuilderCanvas
          components={components}
          onUpdateComponents={setComponents}
          onDeleteComponent={handleDeleteComponent}
          onUpdateComponent={handleUpdateComponent}
        />
      </div>
    </div>
  );
}


'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Save, Eye, Code, FileJson } from 'lucide-react';
import DraggableComponent from './DraggableComponent';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Component } from './types';

interface BuilderCanvasProps {
  components: Component[];
  onUpdateComponents: (components: Component[]) => void;
  onDeleteComponent: (id: string) => void;
  onUpdateComponent: (id: string, newData: Component['data']) => void;
  builderType?: 'document' | 'component';
}

export default function BuilderCanvas({ components, onUpdateComponents, onDeleteComponent, onUpdateComponent, builderType = 'document' }: BuilderCanvasProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = components.findIndex((c) => c.id === active.id);
      const newIndex = components.findIndex((c) => c.id === over.id);
      onUpdateComponents(arrayMove(components, oldIndex, newIndex));
    }
  };

  const handleExportJSON = () => {
    const json = JSON.stringify(components, null, 2);
    console.log('Exported Document Schema:', json);
    alert('Document schema exported to console!');
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Canvas Header */}
      <div className="glass-panel border-b px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">
              {builderType === 'component' ? 'Component Builder' : 'Document Builder'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {builderType === 'component' 
                ? 'Create hybrid components from framework components' 
                : 'Compose your document visually with components'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExportJSON}
              className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg font-medium flex items-center gap-2 transition-all"
            >
              <FileJson className="w-4 h-4" />
              Export JSON
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg font-medium flex items-center gap-2 transition-all"
            >
              <Eye className="w-4 h-4" />
              Preview
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-accent text-primary-foreground rounded-lg font-medium flex items-center gap-2 glow-effect"
            >
              <Save className="w-4 h-4" />
              {builderType === 'component' ? 'Save Component' : 'Save Document'}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Canvas Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          {components.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="glass-panel p-12 rounded-2xl border-2 border-dashed border-border">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
                    <Plus className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-display font-semibold mb-3">Start Building</h3>
                  <p className="text-muted-foreground mb-6">
                    {builderType === 'component'
                      ? 'Add framework components from the palette to create your hybrid component. Drag and drop to reorder, click to edit properties.'
                      : 'Add components from the palette to start composing your document. Drag and drop to reorder, click to edit properties.'}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Code className="w-4 h-4" />
                    <span>Components are auto-saved as you work</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={components.map(c => c.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4">
                  <AnimatePresence>
                    {components.map((component) => (
                      <DraggableComponent
                        key={component.id}
                        component={component}
                        onDelete={onDeleteComponent}
                        onUpdate={onUpdateComponent}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </SortableContext>
            </DndContext>
          )}

          {/* Add More Hint */}
          {components.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Add more components from the palette
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}


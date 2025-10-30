'use client';

import { motion } from 'framer-motion';
import { GripVertical, Edit2, Trash2, Type, FileText, List, ChevronDown } from 'lucide-react';
import { COMPONENT_TYPES } from './types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const iconMap = {
  [COMPONENT_TYPES.TEXT]: Type,
  [COMPONENT_TYPES.RICHTEXT]: FileText,
  [COMPONENT_TYPES.ENUM]: List,
};

export default function DraggableComponent({ component, onDelete, onUpdate }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const Icon = iconMap[component.type];

  const handleChange = (field, value) => {
    onUpdate(component.id, {
      ...component.data,
      [field]: value,
    });
  };

  const renderComponentEditor = () => {
    switch (component.type) {
      case COMPONENT_TYPES.TEXT:
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1.5">Label</label>
              <input
                type="text"
                value={component.data.label}
                onChange={(e) => handleChange('label', e.target.value)}
                className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="Field label"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Placeholder</label>
              <input
                type="text"
                value={component.data.placeholder}
                onChange={(e) => handleChange('placeholder', e.target.value)}
                className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="Placeholder text"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Value</label>
              <input
                type="text"
                value={component.data.value}
                onChange={(e) => handleChange('value', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder={component.data.placeholder}
              />
            </div>
          </div>
        );

      case COMPONENT_TYPES.RICHTEXT:
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1.5">Label</label>
              <input
                type="text"
                value={component.data.label}
                onChange={(e) => handleChange('label', e.target.value)}
                className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="Field label"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Placeholder</label>
              <input
                type="text"
                value={component.data.placeholder}
                onChange={(e) => handleChange('placeholder', e.target.value)}
                className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="Placeholder text"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Content</label>
              <textarea
                value={component.data.value}
                onChange={(e) => handleChange('value', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                placeholder={component.data.placeholder}
              />
              <p className="text-xs text-muted-foreground mt-1">Rich text formatting placeholder</p>
            </div>
          </div>
        );

      case COMPONENT_TYPES.ENUM:
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1.5">Label</label>
              <input
                type="text"
                value={component.data.label}
                onChange={(e) => handleChange('label', e.target.value)}
                className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="Field label"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Options</label>
              <div className="space-y-2">
                {component.data.options.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...component.data.options];
                      newOptions[index] = e.target.value;
                      handleChange('options', newOptions);
                    }}
                    className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder={`Option ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Selected Value</label>
              <div className="relative">
                <select
                  value={component.data.value}
                  onChange={(e) => handleChange('value', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none"
                >
                  <option value="">Select an option...</option>
                  {component.data.options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div ref={setNodeRef} style={style}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass-panel p-5 rounded-xl border hover:border-primary/50 transition-all group"
      >
        {/* Component Header */}
        <div className="flex items-center gap-3 mb-4">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1.5 hover:bg-secondary rounded-lg transition-colors"
          >
            <GripVertical className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="p-2 bg-gradient-accent rounded-lg flex-shrink-0">
            <Icon className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium">{component.data.label || 'Unnamed Component'}</h4>
            <p className="text-xs text-muted-foreground capitalize">{component.type} Field</p>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <Edit2 className="w-4 h-4 text-muted-foreground" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(component.id)}
              className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </motion.button>
          </div>
        </div>

        {/* Component Editor */}
        <div className="pl-10">
          {renderComponentEditor()}
        </div>
      </motion.div>
    </div>
  );
}
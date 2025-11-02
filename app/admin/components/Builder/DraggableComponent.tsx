'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  GripVertical, Edit2, Trash2, Type, FileText, List, ChevronDown, 
  Link, Mail, Hash, CheckSquare, Image, User, Users, Star, Heart, 
  Calendar, Clock, MapPin, Phone, Camera, Video, Music, Book, 
  Bookmark, Tag, Folder, File, Archive, Package, Box, Grid, AlignLeft 
} from 'lucide-react';
import { COMPONENT_TYPES, Component, ComponentData } from './types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { loadCustomComponents, CustomComponent, FIELD_TYPES } from '@/lib/customComponentsStorage';

type LucideIcon = typeof Type;

const iconMap: Record<string, LucideIcon> = {
  [COMPONENT_TYPES.TEXT]: Type,
  [COMPONENT_TYPES.RICHTEXT]: FileText,
  [COMPONENT_TYPES.ENUM]: List,
  FileText, Image, User, Users, Star, Heart, Calendar,
  Clock, MapPin, Mail, Phone, Link, Camera, Video, Music,
  Book, Bookmark, Tag, Folder, File, Archive, Package, Box, Grid,
  AlignLeft, Hash, CheckSquare,
};

interface DraggableComponentProps {
  component: Component;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newData: ComponentData) => void;
}

export default function DraggableComponent({ component, onDelete, onUpdate }: DraggableComponentProps) {
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

  const [customComponentDef, setCustomComponentDef] = useState<CustomComponent | null>(null);
  
  useEffect(() => {
    if (component.type === 'custom' && component.data.customComponentId) {
      const customComponents = loadCustomComponents();
      const def = customComponents.find(c => c.id === component.data.customComponentId);
      setCustomComponentDef(def || null);
    }
  }, [component]);

  const Icon = component.type === 'custom' && customComponentDef 
    ? (iconMap[customComponentDef.icon] || FileText)
    : (iconMap[component.type] || Type);

  const handleChange = (field: keyof ComponentData, value: string | string[]) => {
    onUpdate(component.id, {
      ...component.data,
      [field]: value,
    });
  };

  const handleCustomFieldChange = (fieldName: string, value: string | boolean) => {
    const currentFieldValues = component.data.fieldValues || {};
    onUpdate(component.id, {
      ...component.data,
      fieldValues: {
        ...currentFieldValues,
        [fieldName]: value,
      },
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
                value={component.data.placeholder || ''}
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
                value={component.data.placeholder || ''}
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
                {component.data.options?.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...(component.data.options || [])];
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
                  {component.data.options?.map((option, index) => (
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

      case 'custom':
        if (!customComponentDef) {
          return (
            <div className="text-sm text-muted-foreground">
              Custom component definition not found
            </div>
          );
        }
        
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-3 text-sm text-muted-foreground">{customComponentDef.name}</h4>
              {customComponentDef.description && (
                <p className="text-xs text-muted-foreground mb-4">{customComponentDef.description}</p>
              )}
            </div>
            {customComponentDef.fields.map((field) => {
              const fieldValue = component.data.fieldValues?.[field.name] || field.defaultValue || '';
              
              switch (field.type) {
                case FIELD_TYPES.TEXT:
                  return (
                    <div key={field.name} className="space-y-1.5">
                      <label className="block text-sm font-medium">{field.label}</label>
                      <input
                        type="text"
                        value={fieldValue as string}
                        onChange={(e) => handleCustomFieldChange(field.name, e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder={field.defaultValue || `Enter ${field.label.toLowerCase()}`}
                      />
                    </div>
                  );
                
                case FIELD_TYPES.TEXTAREA:
                  return (
                    <div key={field.name} className="space-y-1.5">
                      <label className="block text-sm font-medium">{field.label}</label>
                      <textarea
                        value={fieldValue as string}
                        onChange={(e) => handleCustomFieldChange(field.name, e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                        placeholder={field.defaultValue || `Enter ${field.label.toLowerCase()}`}
                      />
                    </div>
                  );
                
                case FIELD_TYPES.NUMBER:
                  return (
                    <div key={field.name} className="space-y-1.5">
                      <label className="block text-sm font-medium">{field.label}</label>
                      <input
                        type="number"
                        value={fieldValue as string}
                        onChange={(e) => handleCustomFieldChange(field.name, e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder={field.defaultValue || `Enter ${field.label.toLowerCase()}`}
                      />
                    </div>
                  );
                
                case FIELD_TYPES.SELECT:
                  return (
                    <div key={field.name} className="space-y-1.5">
                      <label className="block text-sm font-medium">{field.label}</label>
                      <div className="relative">
                        <select
                          value={fieldValue as string}
                          onChange={(e) => handleCustomFieldChange(field.name, e.target.value)}
                          className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none"
                        >
                          <option value="">Select {field.label.toLowerCase()}...</option>
                          {field.options?.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                  );
                
                case FIELD_TYPES.CHECKBOX:
                  return (
                    <div key={field.name} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={fieldValue as boolean || false}
                        onChange={(e) => handleCustomFieldChange(field.name, e.target.checked)}
                        className="w-4 h-4 rounded border-border focus:ring-2 focus:ring-primary/50"
                      />
                      <label className="text-sm font-medium">{field.label}</label>
                    </div>
                  );
                
                case FIELD_TYPES.URL:
                  return (
                    <div key={field.name} className="space-y-1.5">
                      <label className="block text-sm font-medium">{field.label}</label>
                      <input
                        type="url"
                        value={fieldValue as string}
                        onChange={(e) => handleCustomFieldChange(field.name, e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder={field.defaultValue || `https://example.com`}
                      />
                    </div>
                  );
                
                case FIELD_TYPES.EMAIL:
                  return (
                    <div key={field.name} className="space-y-1.5">
                      <label className="block text-sm font-medium">{field.label}</label>
                      <input
                        type="email"
                        value={fieldValue as string}
                        onChange={(e) => handleCustomFieldChange(field.name, e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder={field.defaultValue || `example@email.com`}
                      />
                    </div>
                  );
                
                default:
                  return null;
              }
            })}
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
            <h4 className="font-medium">
              {component.type === 'custom' && customComponentDef
                ? customComponentDef.name
                : component.data.label || 'Unnamed Component'}
            </h4>
            <p className="text-xs text-muted-foreground capitalize">
              {component.type === 'custom' && customComponentDef
                ? customComponentDef.description || 'Custom Component'
                : `${component.type} Field`}
            </p>
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


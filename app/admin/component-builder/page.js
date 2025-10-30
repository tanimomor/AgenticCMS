'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Plus, Save, Trash2, Edit2, ChevronDown, X,
  FileText, Image, User, Users, Star, Heart, Calendar, 
  Clock, MapPin, Mail, Phone, Link, Camera, Video, Music,
  Book, Bookmark, Tag, Folder, File, Archive, Package, Box, Grid,
  Type, AlignLeft, Hash, List as ListIcon, CheckSquare, Sparkles
} from 'lucide-react';
import NextLink from 'next/link';
import {
  loadCustomComponents,
  addCustomComponent,
  deleteCustomComponent,
  updateCustomComponent,
  FIELD_TYPE_OPTIONS,
  FIELD_TYPES,
  ICON_OPTIONS,
} from '@/lib/customComponentsStorage';

const iconMap = {
  FileText, Image, User, Users, Star, Heart, Calendar,
  Clock, MapPin, Mail, Phone, Link, Camera, Video, Music,
  Book, Bookmark, Tag, Folder, File, Archive, Package, Box, Grid,
  Type, AlignLeft, Hash, List: ListIcon, CheckSquare,
};

export default function ComponentBuilderPage() {
  const [customComponents, setCustomComponents] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingComponent, setEditingComponent] = useState(null);

  // Form state
  const [componentName, setComponentName] = useState('');
  const [componentDescription, setComponentDescription] = useState('');
  const [componentIcon, setComponentIcon] = useState('FileText');
  const [fields, setFields] = useState([]);

  useEffect(() => {
    setCustomComponents(loadCustomComponents());
  }, []);

  const resetForm = () => {
    setComponentName('');
    setComponentDescription('');
    setComponentIcon('FileText');
    setFields([]);
    setIsCreating(false);
    setEditingComponent(null);
  };

  const addField = () => {
    setFields([
      ...fields,
      {
        id: `field-${Date.now()}`,
        name: '',
        label: '',
        type: FIELD_TYPES.TEXT,
        defaultValue: '',
        options: [], // for select type
      },
    ]);
  };

  const updateField = (id, updates) => {
    setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const removeField = (id) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const handleSaveComponent = () => {
    if (!componentName.trim()) {
      alert('Please enter a component name');
      return;
    }

    const componentData = {
      name: componentName,
      description: componentDescription,
      icon: componentIcon,
      fields: fields.map(f => ({
        name: f.name || f.label.toLowerCase().replace(/\s+/g, '_'),
        label: f.label || f.name,
        type: f.type,
        defaultValue: f.defaultValue,
        options: f.options,
      })),
    };

    if (editingComponent) {
      updateCustomComponent(editingComponent.id, componentData);
    } else {
      addCustomComponent(componentData);
    }

    setCustomComponents(loadCustomComponents());
    resetForm();
  };

  const handleEdit = (component) => {
    setEditingComponent(component);
    setComponentName(component.name);
    setComponentDescription(component.description);
    setComponentIcon(component.icon);
    setFields(component.fields.map((f, idx) => ({ ...f, id: `field-${idx}` })));
    setIsCreating(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this component?')) {
      deleteCustomComponent(id);
      setCustomComponents(loadCustomComponents());
    }
  };

  const getFieldIcon = (type) => {
    const option = FIELD_TYPE_OPTIONS.find(o => o.value === type);
    return option ? iconMap[option.icon] : Type;
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
            <NextLink href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-secondary rounded-lg transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back to Dashboard</span>
              </motion.button>
            </NextLink>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCreating(!isCreating)}
            className="px-4 py-2 bg-gradient-accent text-primary-foreground rounded-lg font-medium flex items-center gap-2 glow-effect"
          >
            {isCreating ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {isCreating ? 'Cancel' : 'Create Component'}
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-8">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-display font-bold mb-2">Component Builder</h1>
          <p className="text-muted-foreground text-lg">Create reusable custom components for your documents</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Component Creator/Editor */}
          <AnimatePresence>
            {isCreating && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="lg:col-span-2"
              >
                <div className="glass-panel p-6 rounded-xl border">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-accent rounded-lg">
                      <Sparkles className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h2 className="text-2xl font-display font-semibold">
                      {editingComponent ? 'Edit Component' : 'Create New Component'}
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {/* Basic Info */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Basic Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Component Name *</label>
                          <input
                            type="text"
                            value={componentName}
                            onChange={(e) => setComponentName(e.target.value)}
                            placeholder="e.g., Author Bio, Product Card, Testimonial"
                            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Description</label>
                          <input
                            type="text"
                            value={componentDescription}
                            onChange={(e) => setComponentDescription(e.target.value)}
                            placeholder="Brief description of what this component does"
                            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Icon</label>
                          <div className="relative">
                            <select
                              value={componentIcon}
                              onChange={(e) => setComponentIcon(e.target.value)}
                              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
                            >
                              {ICON_OPTIONS.map(icon => (
                                <option key={icon} value={icon}>{icon}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                          </div>
                          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                            Preview: 
                            {(() => {
                              const Icon = iconMap[componentIcon];
                              return <Icon className="w-4 h-4" />;
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Fields */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">Component Fields</h3>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={addField}
                          className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm font-medium flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add Field
                        </motion.button>
                      </div>

                      {fields.length === 0 ? (
                        <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
                          <p className="text-muted-foreground">No fields yet. Add fields to define your component structure.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {fields.map((field, index) => {
                            const FieldIcon = getFieldIcon(field.type);
                            return (
                              <motion.div
                                key={field.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-panel p-4 rounded-lg border"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="p-2 bg-secondary rounded-lg mt-1">
                                    <FieldIcon className="w-4 h-4" />
                                  </div>
                                  <div className="flex-1 space-y-3">
                                    <div className="grid grid-cols-2 gap-3">
                                      <div>
                                        <label className="block text-xs font-medium mb-1">Field Label</label>
                                        <input
                                          type="text"
                                          value={field.label}
                                          onChange={(e) => updateField(field.id, { label: e.target.value })}
                                          placeholder="e.g., Author Name"
                                          className="w-full px-3 py-1.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-xs font-medium mb-1">Field Type</label>
                                        <div className="relative">
                                          <select
                                            value={field.type}
                                            onChange={(e) => updateField(field.id, { type: e.target.value })}
                                            className="w-full px-3 py-1.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
                                          >
                                            {FIELD_TYPE_OPTIONS.map(opt => (
                                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                          </select>
                                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
                                        </div>
                                      </div>
                                    </div>

                                    {field.type === FIELD_TYPES.SELECT && (
                                      <div>
                                        <label className="block text-xs font-medium mb-1">Options (comma-separated)</label>
                                        <input
                                          type="text"
                                          value={field.options?.join(', ') || ''}
                                          onChange={(e) => updateField(field.id, { 
                                            options: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                                          })}
                                          placeholder="Option 1, Option 2, Option 3"
                                          className="w-full px-3 py-1.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        />
                                      </div>
                                    )}

                                    <div>
                                      <label className="block text-xs font-medium mb-1">Default Value</label>
                                      <input
                                        type="text"
                                        value={field.defaultValue}
                                        onChange={(e) => updateField(field.id, { defaultValue: e.target.value })}
                                        placeholder="Optional default value"
                                        className="w-full px-3 py-1.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                                      />
                                    </div>
                                  </div>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => removeField(field.id)}
                                    className="p-2 hover:bg-destructive/10 rounded-lg transition-colors mt-1"
                                  >
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                  </motion.button>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSaveComponent}
                        className="flex-1 px-4 py-2 bg-gradient-accent text-primary-foreground rounded-lg font-medium flex items-center justify-center gap-2 glow-effect"
                      >
                        <Save className="w-4 h-4" />
                        {editingComponent ? 'Update Component' : 'Save Component'}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={resetForm}
                        className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg font-medium"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Saved Components List */}
          <div className={isCreating ? 'lg:col-span-1' : 'lg:col-span-3'}>
            <div className="glass-panel p-6 rounded-xl border">
              <h2 className="text-xl font-display font-semibold mb-4">Your Custom Components</h2>
              
              {customComponents.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4 opacity-50">
                    <Sparkles className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <p className="text-muted-foreground mb-2">No custom components yet</p>
                  <p className="text-sm text-muted-foreground">Create your first component to get started!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {customComponents.map((component, index) => {
                    const Icon = iconMap[component.icon] || FileText;
                    return (
                      <motion.div
                        key={component.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="glass-panel p-4 rounded-lg border hover:border-primary/50 transition-all group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-gradient-accent rounded-lg flex-shrink-0">
                            <Icon className="w-5 h-5 text-primary-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium mb-1">{component.name}</h3>
                            {component.description && (
                              <p className="text-sm text-muted-foreground mb-2">{component.description}</p>
                            )}
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{component.fields.length} field{component.fields.length !== 1 ? 's' : ''}</span>
                              <span>•</span>
                              <span>Created {new Date(component.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleEdit(component)}
                              className="p-2 hover:bg-secondary rounded-lg transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(component.id)}
                              className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
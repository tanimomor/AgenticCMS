// Storage utilities for custom components

const STORAGE_KEY = 'artisan_cms_custom_components';

export const saveCustomComponents = (components) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(components));
  }
};

export const loadCustomComponents = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

export const addCustomComponent = (component) => {
  const components = loadCustomComponents();
  const newComponent = {
    ...component,
    id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    isCustom: true,
  };
  components.push(newComponent);
  saveCustomComponents(components);
  return newComponent;
};

export const updateCustomComponent = (id, updates) => {
  const components = loadCustomComponents();
  const index = components.findIndex(c => c.id === id);
  if (index !== -1) {
    components[index] = { ...components[index], ...updates };
    saveCustomComponents(components);
  }
};

export const deleteCustomComponent = (id) => {
  const components = loadCustomComponents();
  const filtered = components.filter(c => c.id !== id);
  saveCustomComponents(filtered);
};

export const FIELD_TYPES = {
  TEXT: 'text',
  TEXTAREA: 'textarea',
  NUMBER: 'number',
  SELECT: 'select',
  CHECKBOX: 'checkbox',
  URL: 'url',
  EMAIL: 'email',
};

export const FIELD_TYPE_OPTIONS = [
  { value: FIELD_TYPES.TEXT, label: 'Text (Single Line)', icon: 'Type' },
  { value: FIELD_TYPES.TEXTAREA, label: 'Text Area (Multi-line)', icon: 'AlignLeft' },
  { value: FIELD_TYPES.NUMBER, label: 'Number', icon: 'Hash' },
  { value: FIELD_TYPES.SELECT, label: 'Dropdown/Select', icon: 'List' },
  { value: FIELD_TYPES.CHECKBOX, label: 'Checkbox (Yes/No)', icon: 'CheckSquare' },
  { value: FIELD_TYPES.URL, label: 'URL/Link', icon: 'Link' },
  { value: FIELD_TYPES.EMAIL, label: 'Email', icon: 'Mail' },
];

export const ICON_OPTIONS = [
  'FileText', 'Image', 'User', 'Users', 'Star', 'Heart', 
  'Calendar', 'Clock', 'MapPin', 'Mail', 'Phone', 'Link',
  'Camera', 'Video', 'Music', 'Book', 'Bookmark', 'Tag',
  'Folder', 'File', 'Archive', 'Package', 'Box', 'Grid',
];
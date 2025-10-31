// Storage utilities for custom components

const STORAGE_KEY = 'artisan_cms_custom_components';

export interface CustomComponent {
  id: string;
  name: string;
  description?: string;
  icon: string;
  fields: ComponentField[];
  createdAt: string;
  isCustom: boolean;
}

export interface ComponentField {
  name: string;
  label: string;
  type: string;
  defaultValue?: string;
  options?: string[];
}

export const FIELD_TYPES = {
  TEXT: 'text',
  TEXTAREA: 'textarea',
  NUMBER: 'number',
  SELECT: 'select',
  CHECKBOX: 'checkbox',
  URL: 'url',
  EMAIL: 'email',
} as const;

export interface FieldTypeOption {
  value: string;
  label: string;
  icon: string;
}

export const FIELD_TYPE_OPTIONS: FieldTypeOption[] = [
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
] as const;

export const saveCustomComponents = (components: CustomComponent[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(components));
  }
};

export const loadCustomComponents = (): CustomComponent[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

export const addCustomComponent = (component: Omit<CustomComponent, 'id' | 'createdAt' | 'isCustom'>): CustomComponent => {
  const components = loadCustomComponents();
  const newComponent: CustomComponent = {
    ...component,
    id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    isCustom: true,
  };
  components.push(newComponent);
  saveCustomComponents(components);
  return newComponent;
};

export const updateCustomComponent = (id: string, updates: Partial<CustomComponent>): void => {
  const components = loadCustomComponents();
  const index = components.findIndex(c => c.id === id);
  if (index !== -1) {
    components[index] = { ...components[index], ...updates };
    saveCustomComponents(components);
  }
};

export const deleteCustomComponent = (id: string): void => {
  const components = loadCustomComponents();
  const filtered = components.filter(c => c.id !== id);
  saveCustomComponents(filtered);
};


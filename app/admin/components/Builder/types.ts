// Component type definitions and constants

export const COMPONENT_TYPES = {
  TEXT: 'text',
  RICHTEXT: 'richtext',
  ENUM: 'enum',
} as const;

export type ComponentType = typeof COMPONENT_TYPES[keyof typeof COMPONENT_TYPES];

export interface ComponentData {
  label: string;
  placeholder?: string;
  value: string;
  options?: string[];
  // For custom components - store field values as key-value pairs
  fieldValues?: Record<string, string | string[] | boolean>;
  customComponentId?: string; // Reference to the custom component definition
}

export interface Component {
  id: string;
  type: ComponentType | 'custom';
  data: ComponentData;
}

export interface ComponentDefinition {
  id: string;
  type: ComponentType;
  label: string;
  icon: string;
  description: string;
  defaultData: ComponentData;
}

export const COMPONENT_DEFINITIONS: ComponentDefinition[] = [
  {
    id: 'text',
    type: COMPONENT_TYPES.TEXT,
    label: 'Text Block',
    icon: 'Type',
    description: 'Simple single-line text',
    defaultData: {
      label: 'Text Field',
      placeholder: 'Enter text...',
      value: '',
    },
  },
  {
    id: 'richtext',
    type: COMPONENT_TYPES.RICHTEXT,
    label: 'Rich Text',
    icon: 'FileText',
    description: 'Multi-line rich text editor',
    defaultData: {
      label: 'Rich Text Field',
      placeholder: 'Enter rich text content...',
      value: '',
    },
  },
  {
    id: 'enum',
    type: COMPONENT_TYPES.ENUM,
    label: 'Select Field',
    icon: 'List',
    description: 'Dropdown with multiple options',
    defaultData: {
      label: 'Select Option',
      options: ['Option 1', 'Option 2', 'Option 3'],
      value: '',
    },
  },
];

export const createComponent = (type: ComponentType): Component => {
  const definition = COMPONENT_DEFINITIONS.find(def => def.type === type);
  if (!definition) {
    throw new Error(`Component type ${type} not found`);
  }
  return {
    id: `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    data: { ...definition.defaultData },
  };
};


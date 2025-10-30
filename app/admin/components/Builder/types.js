// Component type definitions and constants

export const COMPONENT_TYPES = {
  TEXT: 'text',
  RICHTEXT: 'richtext',
  ENUM: 'enum',
};

export const COMPONENT_DEFINITIONS = [
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

export const createComponent = (type) => {
  const definition = COMPONENT_DEFINITIONS.find(def => def.type === type);
  return {
    id: `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    data: { ...definition.defaultData },
  };
};
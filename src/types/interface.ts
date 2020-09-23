export interface BusinessObjectMeta {
  key: string;
  name: string;
  description: string;
  properties: { [key: string]: FieldMeta };
  titleKey: string;
  type?: string;
}

export interface FieldMeta {
  key: string;
  name: string;
  type: string;
  description?: string;
  options?: FieldOption[];
  refObjectId?: string;
  unique?: boolean;
  required?: boolean;
  maximum?: number;
  minimum?: number;
  exclusiveMaximum?: number;
  exclusiveMinimum?: number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  format?: string;
  titleKey?: string;
  properties?: { [key: string]: FieldMeta };
}

export interface FieldOption {
  label: string;
  value: string;
}

export type ColumnMeta = {
  objectComponent?: string;
  fixed?: boolean;
  align?: 'left' | 'right' | 'center';
} & FieldMeta

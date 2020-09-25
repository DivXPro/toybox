export interface BusinessObjectMeta {
  key: string;
  name: string;
  description: string;
  properties: { [key: string]: FieldMeta };
  titleKey: string;
  type?: FieldType;
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

export enum FieldType {
  INTEGER = 'integer',
  NUMBER = 'number',
  STRING = 'string',
  TEXT = 'text',
  DATE = 'date',
  DATETIME = 'datetime',
  BOOLEAN = 'boolean',
  ARRAY = 'array',
  OBJECT_ID = 'objectId',
  BUSINESS_OBJECT = 'businessObject',
  SINGLE_OPTION = 'singleOption',
  MULTI_OPTION = 'multiOption',
  DOCUMENT = 'document',
}
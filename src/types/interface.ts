import { ReactText } from "react";
import { OptionItem } from "../components/field/select";
import { FieldType } from "../components/field/interface";

export interface BusinessObjectMeta {
  key: string;
  idKey?: string;
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
  idKey?: string;
  titleKey?: string;
  properties?: { [key: string]: FieldMeta };
  index?: number;
  defaultValue?: any;
}

export interface FieldMetaProfile extends FieldMeta {
  disabled?: boolean;
  mode?: 'read' | 'update' | 'edit';
  remote?: (key: string, params?: any) => Promise<OptionItem[]>;
  remoteByValue?: (value: ReactText | ReactText[], params?: any) => Promise<OptionItem>;
}

export interface FieldOption {
  label: string;
  value: string;
}

export interface ColumnBaseType {
  key: string;
  name: string;
  fixed?: boolean;
  align?: 'left' | 'right' | 'center';
  show?: boolean;
}

export interface ColumnComponentType extends ColumnBaseType {
  link?: (...args: any) => string;
  component?: string;
}

export type ColumnMeta = ColumnComponentType & FieldMeta



export type MetaPageMode = 'list' | 'view';

export interface MetaRoute {
  objectKey: string;
  mode: MetaPageMode;
  objectId?: string;
  objectName?: string;
}
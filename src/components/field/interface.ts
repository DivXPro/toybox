export type FieldMode = 'read' | 'edit' | 'update';

export interface FieldProps {
  mode: FieldMode;
  fieldProps?: any;
  disabled?: boolean;
}
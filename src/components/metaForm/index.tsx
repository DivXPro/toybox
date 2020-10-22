import React, { FC, useMemo } from 'react';
import { Form } from 'antd';
import { FieldMetaProfile } from '../../types/interface';
import { FieldMode, FieldString, FieldText, FieldNumber, FieldSelect, FieldDate } from '../field';
import { FormProps, FormInstance } from 'antd/lib/form';
import { FieldBoolean } from '../field/boolean';
import { Store } from 'antd/lib/form/interface';

export interface MetaFormProps extends FormProps {
  fieldMetas: FieldMetaProfile[];
  initialValues?: any;
  onFinish?: (data: Store) => Promise<void>;
  userForm?: FormInstance;
}

export interface FormItemProps {
  type: string;
  mode?: FieldMode;
  disabled?: boolean;
  value?: any;
  onChange?: (...args: any) => void;
  fieldProps?: Record<string, any>;
}

const FormItem: FC<FormItemProps> = ({ type, mode = "edit", value, onChange, disabled, fieldProps }) => {
  switch(type) {
    case 'string':
      return <FieldString mode={mode} value={value} onChange={onChange} disabled={disabled} {...fieldProps} />
    case 'text':
      return <FieldText mode={mode} value={value} onChange={onChange} disabled={disabled} {...fieldProps} />
    case 'number':
      return <FieldNumber mode={mode} value={value} onChange={onChange} disabled={disabled} {...fieldProps} />
    case 'boolean':
      return <FieldBoolean mode={mode} value={value} onChange={onChange} disabled={disabled} {...fieldProps} />
    case 'singleOption':
      return <FieldSelect mode={mode} value={value} onChange={onChange} disabled={disabled} {...fieldProps} />;
    case 'date':
      return <FieldDate mode={mode} format="YYYY-MM-DD" value={value} disabled={disabled} onChange={onChange} {...fieldProps} />
    case 'datetime':
      return <FieldDate mode={mode} format="YYYY-MM-DD HH:mm:ss" value={value} disabled={disabled} onChange={onChange}{...fieldProps} />
    case 'businessObject':
      return <FieldSelect mode={mode} value={value} disabled={disabled} onChange={onChange} {...fieldProps} />;
    default:
      return null;
  }
}

export const MetaForm: FC<MetaFormProps> = ({ fieldMetas, onFinish, userForm, ...formProps }) => {
  const [form] = Form.useForm();
  const formItems = useMemo(() => {
    return fieldMetas.map((field, idx) => {
      const { type, key, name, mode, disabled, ...other } = field;
      return <Form.Item key={idx} name={key} label={name}>
        <FormItem type={type} mode={mode || 'edit'} disabled={disabled} {...other} />
      </Form.Item>
    });
  }, [fieldMetas]);
  // const formRef = useRef(userForm || form);
  return <Form form={userForm || form} onFinish={onFinish} {...formProps}>
    {formItems}
  </Form>;
}
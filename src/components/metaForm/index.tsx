import React, { FC, useMemo } from 'react';
import { Form } from 'antd';
import { FieldMeta } from '../../types/interface';
import { FieldMode, FieldString, FieldText, FieldNumber, FieldSelect, FieldDate } from '../field';
import { FormProps, FormInstance } from 'antd/lib/form';
import { FieldBoolean } from '../field/boolean';
import { Store } from 'antd/lib/form/interface';

export interface MetaFormProps extends FormProps {
  fieldMetas: FieldMeta[];
  initialValues?: any;
  onFinish?: (data: Store) => Promise<void>;
  userForm?: FormInstance;
}

export interface FormItemProps {
  type: string;
  mode?: FieldMode;
  value?: any;
  onChange?: (...args: any) => void;
}

const FormItem: FC<FormItemProps> = ({ type, mode = "edit", value, onChange, ...otherProps }) => {
  switch(type) {
    case 'string':
      return <FieldString mode={mode} value={value} onChange={onChange} {...otherProps} />
    case 'text':
      return <FieldText mode={mode} value={value} onChange={onChange} {...otherProps} />
    case 'number':
      return <FieldNumber mode={mode} value={value} onChange={onChange} {...otherProps} />
    case 'boolean':
      return <FieldBoolean mode={mode} value={value} onChange={onChange} {...otherProps} />
    case 'singleOption':
      return <FieldSelect mode={mode} value={value} onChange={onChange} {...otherProps} />;
    case 'date':
      return <FieldDate mode={mode} format="YYYY-MM-DD" value={value} onChange={onChange} {...otherProps} />
    case 'datetime':
      return <FieldDate mode={mode} format="YYYY-MM-DD HH:mm:ss" value={value} onChange={onChange}{...otherProps} />
    default:
      return null;
  }
}

export const MetaForm: FC<MetaFormProps> = ({ fieldMetas, onFinish, userForm, ...formProps }) => {
  const [form] = Form.useForm();
  const formItems = useMemo(() => {
    return fieldMetas.map((field, idx) => {
      const { type , key, name, ...other } = field;
      return <Form.Item key={idx} name={key} label={name}>
        <FormItem type={type} mode="edit" {...other} />
      </Form.Item>
    });
  }, [fieldMetas]);
  // const formRef = useRef(userForm || form);
  return <Form form={userForm || form} onFinish={onFinish} {...formProps}>
    {formItems}
  </Form>;
}
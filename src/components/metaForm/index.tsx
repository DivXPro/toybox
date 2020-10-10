import React, { FC, useMemo } from 'react';
import { Form, Button } from 'antd';
import { FieldMeta } from '../../types/interface';
import { FieldMode, FieldString, FieldText, FieldNumber, FieldSelect, FieldDate } from '../field';
import { FormProps } from 'antd/lib/form';
import { FieldBoolean } from '../field/boolean';

export interface MetaFormProps extends FormProps {
  fieldMetas: FieldMeta[];
  initialValues?: any;
  submitText: string;
  cancelText: string;
  onSubmit?: (data: Record<string, any>) => Promise<any>;
  onCancel?: (data: Record<string, any>) => Promise<any>;
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

export const MetaForm: FC<MetaFormProps> = ({ fieldMetas, submitText, cancelText, onSubmit, onCancel, ...formProps }) => {
  const [form] = Form.useForm();
  const formItems = useMemo(() => {
    return fieldMetas.map((field, idx) => {
      const { type , key, name, ...other } = field;
      return <Form.Item key={idx} name={key} label={name}>
        <FormItem type={type} mode="edit" {...other} />
      </Form.Item>
    });
  }, [fieldMetas]);
  console.log('formItems', formItems);
  return <Form form={form} onFinish={onSubmit} {...formProps}>
    {formItems}
    <Form.Item label=" " colon={false} key="buttons">
      <div className="botton-wapper">
        <Button type="primary" htmlType="submit">
          {submitText}
        </Button>
        <Button htmlType="button" onClick={onCancel} >
          {cancelText}
        </Button>
      </div>
    </Form.Item>
  </Form>;
}
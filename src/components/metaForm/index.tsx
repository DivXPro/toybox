import React, { FC, useCallback } from 'react';
import { Form, Button } from 'antd';
import { FieldMeta } from '../../types/interface';
import { FieldMode, FieldString, FieldText, FieldNumber, FieldSelect, FieldDate } from '../field';

export interface MetaFormProps {
  fieldMetas: FieldMeta[];
  initialValues?: any;
}

interface FormItemProps {
  type: string;
  mode?: FieldMode;
  onFinish?: (data: Record<string, any>) => void;
}

const FormItem: FC<FormItemProps> = ({ type, mode = "edit" }) => {
  switch(type) {
    case 'string':
      return <FieldString mode={mode} />;
    case 'text':
      return <FieldText mode={mode} />
    case 'number':
      return <FieldNumber mode={mode} />
    case 'singleOption':
      return <FieldSelect mode={mode} />;
    case 'date':
      return <FieldDate mode={mode} format="YYYY-MM-DD" />
    case 'datetime':
      return <FieldDate mode={mode} format="YYYY-MM-DD HH:mm:ss" />
    default:
      return null;
  }
}

export const MetaForm: FC<MetaFormProps> = ({ fieldMetas }) => {
  const [form] = Form.useForm();
  const formItems = useCallback(() => {
    fieldMetas.map((field, idx) => {
      return <Form.Item key={idx} name={field.key} label={field.name} >
        <FormItem type={field.type} mode="edit" />
      </Form.Item>
    });
  }, [fieldMetas]);

  return <Form form={form}>
    {formItems}
    <Form.Item>
      <Button type="primary" htmlType="submit">
        确定
      </Button>
      <Button htmlType="button">
        取消
      </Button>
    </Form.Item>
  </Form>;
}
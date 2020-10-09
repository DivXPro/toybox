import React, { FC } from 'react';
import { Form } from 'antd';
import { FieldMeta } from '../../types/interface';

export interface MetaFormProps {
  fieldMetas: FieldMeta[];
}

interface FormItemProps {
  type: string;
  initialValues: any;
  onFinish?: (data: Record<string, any>) => void;
}

const FormItem: FC<FormItemProps> = ({ type }) => {
  switch(type) {
    default:
      return <div></div>;
  }
}

export const MetaForm: FC = () => {

  const [form] = Form.useForm();
  return <Form form={form}>
    <Form.Item></Form.Item>
  </Form>
}
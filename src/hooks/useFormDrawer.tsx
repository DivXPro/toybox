import React, { FC, useCallback, ReactNode, useMemo } from 'react';
import { Drawer, Button } from 'antd';
import { DrawerProps } from 'antd/lib/drawer';
import useModal from './useModal';
import { MetaForm, MetaFormProps } from '../components/metaForm';
import { useForm } from 'antd/lib/form/Form';

export interface FormDrawerProps {
  title?: ReactNode;
  onFinish: (data: any) => Promise<any>;
  onCancel: () => void;
  drawerProps: Omit<Omit<DrawerProps, 'title'>, 'visible'>;
  formProps: Omit<MetaFormProps, 'onFinish'>;
  trigger?: ReactNode;
}

export default ({ title, drawerProps, formProps, onFinish, onCancel, trigger }: FormDrawerProps) => {
  const [visible, toggle] = useModal();
  const { ...other } = formProps;
  const [form] = useForm();

  const handleSubmit = useCallback(async () => {
    try {
      const values = await form.validateFields();
      onFinish && await onFinish(values);
      toggle();
    } catch (e) {
      console.warn(e);
    }
  }, [form, onFinish, toggle]);

  const handleCancel = useCallback(() => {
    try {
      onCancel && onCancel();
      toggle();
    } catch (e) {
      console.warn(e);
    }
  }, [onCancel, toggle]);

  const footer = useMemo(() => {
    return (
      <div
        style={{
          textAlign: 'right',
        }}
      >
        <Button onClick={handleCancel} style={{ marginRight: 8 }}>
          Cancel
              </Button>
        <Button onClick={handleSubmit} type="primary">
          Submit
        </Button>
      </div>
    )
  }, [handleCancel, handleSubmit]);

  const FormDrawer: FC = () => (
    <React.Fragment>
      <Drawer title={title} visible={visible} onClose={handleCancel} footer={footer} {...drawerProps}>
        <MetaForm userForm={form} onFinish={handleSubmit} {...other} />
      </Drawer>
      {trigger && <div onClick={toggle}>{trigger}</div>}
    </React.Fragment>

  )

  return { visible, toggle, FormDrawer };
}
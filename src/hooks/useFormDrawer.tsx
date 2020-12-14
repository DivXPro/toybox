import React, { FC, useCallback, ReactNode, useMemo, useState } from 'react';
import { Drawer, Button } from 'antd';
import { DrawerProps } from 'antd/lib/drawer';
import useModal from './useModal';
import { MetaForm, MetaFormProps } from '../components/metaForm';
import { useForm } from 'antd/lib/form/Form';
import { CloseIcon } from '../components/utils';

export interface FormDrawerProps {
  title?: ReactNode;
  onFinish: (data: any) => Promise<any>;
  onCancel: () => void;
  drawerProps: Omit<Omit<DrawerProps, 'title'>, 'visible'>;
  formProps: Omit<MetaFormProps, 'onFinish'>;
}

export default ({ title, drawerProps, formProps, onFinish, onCancel }: FormDrawerProps) => {
  const [visible, toggle] = useModal();
  const { ...other } = formProps;
  const [form] = useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);
      onFinish && await onFinish(values);
      setSubmitting(false);
      toggle();
    } catch (e) {
      setSubmitting(false);
      console.warn(e);
    }
  }, [form, onFinish, toggle]);

  const handleCancel = useCallback(() => {
    try {
      form.setFieldsValue(formProps.initialValues);
      onCancel && onCancel();
      toggle();
    } catch (e) {
      console.warn(e);
    }
  }, [form, formProps.initialValues, onCancel, toggle]);

  const footer = useMemo(() => {
    return (
      <div
        style={{
          textAlign: 'right',
        }}
      >
        <Button onClick={handleCancel} style={{ marginRight: 8 }} loading={submitting}>
          Cancel
              </Button>
        <Button onClick={handleSubmit} type="primary">
          Submit
        </Button>
      </div>
    )
  }, [handleCancel, handleSubmit, submitting]);

  const FormDrawer: FC = ({ children }) => {
    const { closeIcon, ...drawerOtherProps } = drawerProps;
    const drawerCloseIcon = closeIcon || <CloseIcon />
    return (
      <React.Fragment>
        <Drawer title={title} visible={visible} onClose={handleCancel} footer={footer} closeIcon={drawerCloseIcon} {...drawerOtherProps}>
          <MetaForm userForm={form} onFinish={handleSubmit} {...other} />
        </Drawer>
        {
          children && React.cloneElement(<span>{children}</span>, { onClick: toggle })
        }
      </React.Fragment>
    )
  }

  return [FormDrawer, visible, toggle] as [FC, boolean, () => void];
}
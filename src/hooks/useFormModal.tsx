import React, { FC, useCallback, ReactNode } from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import useModal from './useModal';
import { MetaForm, MetaFormProps } from '../components/metaForm';
import { useForm } from 'antd/lib/form/Form';

export interface FormModalProps {
  title?: ReactNode;
  onFinish: (data: any) => Promise<any>;
  onCancel: () => void;
  modalProps: Omit<Omit<ModalProps, 'title'>, 'visible'>;
  formProps: Omit<MetaFormProps, 'onFinish'>;
  trigger?: ReactNode;
}

export default ({ title, modalProps, formProps, onFinish, onCancel, trigger}: FormModalProps) => {
  const [visible, toggle] = useModal();
  const { ...other } = formProps;
  const [form] = useForm();

  const handleSubmit = useCallback(async () => {
    try {
      const values = await form.validateFields();
      onFinish && await onFinish(values);
      toggle();
    } catch(e) {
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

  const FormModal: FC = () => (
    <React.Fragment>
      <Modal title={title} visible={visible} onOk={handleSubmit} onCancel={handleCancel} {...modalProps}>
        <MetaForm userForm={form} onFinish={handleSubmit} {...other} />
      </Modal>
      {trigger && <div onClick={toggle}>{trigger}</div> }
    </React.Fragment>

  )

  return {visible, toggle, FormModal};
}
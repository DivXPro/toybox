import React, { FC, useCallback } from 'react';
import { Modal } from 'antd';
import useModal from './useModal';
import { MetaForm, MetaFormProps } from '../components/metaForm';
import { ModalProps } from 'antd/lib/modal';

export interface FormModalProps extends ModalProps {
  title: string;
  modalProps: Omit<Omit<Omit<ModalProps, 'title'>, 'visible'>, 'footer'>;
  formProps: MetaFormProps;
}

export default ({ title, modalProps, formProps}: FormModalProps) => {
  const [visible, toggle] = useModal();
  const { onSubmit, onCancel, ...other } = formProps;
  const handleSubmit = useCallback(async (data: Record<string, any>) => {
    try {
      onSubmit && await onSubmit(data);
      toggle();
    } catch(e) {
      console.warn(e);
    }
  }, [onSubmit, toggle]);

  const handleCancel = useCallback(async (data: Record<string, any>) => {
    try {
      onCancel && await onCancel(data);
      toggle();
    } catch (e) {
      console.warn(e);
    }
  }, [onCancel, toggle]);

  const FormModal: FC = () => (
    <Modal title={title} visible={visible} footer={null} onCancel={handleCancel} {...modalProps}>
      <MetaForm onSubmit={handleSubmit} onCancel={handleCancel} {...other} />
    </Modal>
  )

  return {visible, toggle, FormModal};
}
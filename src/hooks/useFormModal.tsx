import React, { FC, useCallback, ReactNode, useState } from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import useModal from './useModal';
import { MetaForm, MetaFormProps } from '../components/metaForm';
import { useForm } from 'antd/lib/form/Form';
import { CloseIcon } from '../components/utils';

export interface FormModalProps {
  title?: ReactNode;
  onFinish: (data: any) => Promise<any>;
  onCancel: () => void;
  modalProps: Omit<Omit<ModalProps, 'title'>, 'visible'>;
  formProps: Omit<MetaFormProps, 'onFinish'>;
}

export default ({ title, modalProps, formProps, onFinish, onCancel}: FormModalProps) => {
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
    } catch(e) {
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

  const FormModal: FC = ({ children }) => {
    const { closeIcon, ...modalOtherProps } = modalProps;
    const modalCloseIcon = closeIcon || <CloseIcon />
    return (
      <React.Fragment>
        <Modal title={title} visible={visible} onOk={handleSubmit} onCancel={handleCancel} closeIcon={modalCloseIcon} confirmLoading={submitting} {...modalOtherProps}>
          <MetaForm userForm={form} onFinish={handleSubmit} {...other} />
        </Modal>
        {
          children && React.cloneElement(<span>{children}</span>, { onClick: toggle })
        }
      </React.Fragment>
    )
  }

  return [FormModal, visible, toggle] as [FC, boolean, () => void];
}
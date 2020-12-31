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
  const [visible, setVisible, toggle] = useModal();
  const { ...other } = formProps;
  const [form] = useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    setSubmitting(true);
    form.validateFields().then((values) => {
      return onFinish(values);
    }).then(() => {
      setVisible(false);
      setSubmitting(false);
    });
  };

  const handleCancel = useCallback(() => {
    form.setFieldsValue(formProps.initialValues);
    onCancel && onCancel();
    setVisible(false);
  }, [form, formProps.initialValues, onCancel, setVisible]);

  const FormModal: FC = ({ children }) => {
    const { closeIcon, ...modalOtherProps } = modalProps;
    const modalCloseIcon = closeIcon || <CloseIcon />
    return (
      <React.Fragment>
        <Modal title={title} visible={visible} onOk={handleSubmit} onCancel={handleCancel} closeIcon={modalCloseIcon} confirmLoading={submitting} {...modalOtherProps}>
          <MetaForm userForm={form} {...other} />
        </Modal>
        {
          children && React.cloneElement(<span>{children}</span>, { onClick: () => setVisible(true) })
        }
      </React.Fragment>
    )
  }

  return [FormModal, visible, setVisible, toggle] as [FC, boolean, (visible: boolean) => void, () => void];
}
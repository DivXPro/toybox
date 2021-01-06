import React, { FC, useCallback, ReactNode, useState } from 'react';
import { Modal, Button } from 'antd';
import { convertLegacyProps } from 'antd/lib/button/button';
import { ModalProps } from 'antd/lib/modal';
import { ModalLocale } from 'antd/lib/modal/Modal';
import { getConfirmLocale } from 'antd/lib/modal/locale';
import LocaleReceiver from 'antd/lib/locale-provider/LocaleReceiver';
import useModal from './useModal';
import { MetaForm, MetaFormProps } from '../components/metaForm';
import { useForm } from 'antd/lib/form/Form';
import { CloseIcon } from '../components/utils';
export interface FormModalProps {
  title?: ReactNode;
  onFinish: (data: any) => Promise<any>;
  onCancel: () => void;
  modalProps: Omit<ModalProps, 'title' | 'visible' | 'footer' | 'onOk' | 'onCancel'>;
  formProps: Omit<MetaFormProps, 'onFinish'>;
}

export default ({ title, modalProps, formProps, onFinish, onCancel}: FormModalProps) => {
  const [visible, setVisible] = useModal();
  const { ...other } = formProps;
  const [form] = useForm();
  const [submitting, setSubmitting] = useState(false);


  const handleSubmit = useCallback(async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);
      if (typeof onFinish === 'function') {
        await onFinish(values);
      }
      form.setFieldsValue(formProps.initialValues);
      setVisible(false);
      setSubmitting(false);
    } catch(e) {
      setSubmitting(false);
      console.warn(e);
    }
  }, [form, formProps.initialValues, onFinish, setVisible]);

  const handleCancel = useCallback(() => {
    form.setFieldsValue(formProps.initialValues);
    if (typeof onCancel === 'function') {
      onCancel();
    }
    setVisible(false);
  }, [form, formProps.initialValues, onCancel, setVisible]);

  const renderFooter = (locale: ModalLocale) => {
    const { okText, okType, cancelText } = modalProps;
    return (
      <React.Fragment>
        <Button onClick={handleCancel}>
          {cancelText || locale.cancelText}
        </Button>
        <Button
          {...convertLegacyProps(okType || 'primary')}
          loading={submitting}
          onClick={handleSubmit}
          {...modalProps.okButtonProps}
        >
          {okText || locale.okText}
        </Button>
      </React.Fragment>
    );
  };

  const footer = (
    <LocaleReceiver componentName="Modal" defaultLocale={getConfirmLocale()}>
      {renderFooter}
    </LocaleReceiver>
  );


  const FormModal: FC = ({ children }) => {
    const { closeIcon, ...modalOtherProps } = modalProps;
    const modalCloseIcon = closeIcon || <CloseIcon />;
    return (
      <React.Fragment>
        <Modal
          title={title}
          visible={visible}
          closeIcon={modalCloseIcon}
          onCancel={handleCancel}
          confirmLoading={submitting}
          footer={footer}
          {...modalOtherProps}
        >
          <MetaForm userForm={form} onFinish={handleSubmit} {...other} />
        </Modal>
        {
          children && React.cloneElement(<span>{children}</span>, { onClick: () => setVisible(true) })
        }
      </React.Fragment>
    )
  }

  return [FormModal, visible, setVisible] as [FC, boolean, (visible: boolean) => void];
}
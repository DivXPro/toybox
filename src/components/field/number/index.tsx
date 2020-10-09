import { InputNumber } from 'antd';
import React, { useRef, useImperativeHandle, Ref } from 'react';

import { FieldProps } from '../interface';

export interface FieldNumberProps extends FieldProps {
  value: number;
  placeholder?: string;
}

const FieldNumber = ({ mode, value, placeholder, fieldProps, disabled }: FieldNumberProps, ref: Ref<any>) => {
  const inputRef = useRef();
  useImperativeHandle(
    ref,
    () => ({
      ...(inputRef.current || {}),
    }),
    [],
  );

  if (mode === 'read') {
    const dom = value || '-';
    return <span>{dom}</span>
  }
  if (mode === 'edit' || mode === 'update') {
    return <InputNumber
      value={value}
      placeholder={placeholder}
      ref={inputRef}
      disabled={disabled}
      style={{
        width: '100%',
      }}
      {...fieldProps}
    />
  }
  return null;
}

export default React.forwardRef(FieldNumber);
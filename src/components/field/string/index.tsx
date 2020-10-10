import { Input } from 'antd';
import React, { useRef, useImperativeHandle, Ref } from 'react';

import { FieldProps } from '../interface';

export interface FieldStringProps extends FieldProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

const FieldString = ({ mode, value, onChange, defaultValue, placeholder, fieldProps, disabled, onClick }: FieldStringProps, ref: Ref<any>) => {
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
    return <span onClick={onClick}>{dom}</span>
  }
  if (mode === 'edit' || mode === 'update') {
    return <Input
      ref={inputRef}
      value={value}
      onChange={onChange}
      defaultValue={defaultValue}
      placeholder={placeholder}
      disabled={disabled}
      {...fieldProps}
    />
  }
  return null;
}

export default React.forwardRef(FieldString);
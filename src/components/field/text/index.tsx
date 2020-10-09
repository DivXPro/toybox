import { Input } from 'antd';
import React, { useRef, useImperativeHandle, Ref } from 'react';

import { FieldProps } from '../interface';

export interface FieldTextProps extends FieldProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

const FieldString = ({ mode, value, defaultValue, onChange, placeholder, fieldProps, disabled }: FieldTextProps, ref: Ref<any>) => {
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
    return <Input.TextArea
      ref={inputRef}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      {...fieldProps}
    />
  }
  return null;
}

export default React.forwardRef(FieldString);

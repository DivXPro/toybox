import { Input } from 'antd';
import React, { useRef, useImperativeHandle, Ref } from 'react';

import { FieldProps } from '../interface';

export interface FieldTextProps extends FieldProps {
  value: string;
  placeholder?: string;
}

const FieldString = ({ mode, value, placeholder, fieldProps, disabled }: FieldTextProps, ref: Ref<any>) => {
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
    return <Input.TextArea value={value} placeholder={placeholder} ref={inputRef} disabled={disabled} {...fieldProps} />
  }
  return null;
}

export default React.forwardRef(FieldString);

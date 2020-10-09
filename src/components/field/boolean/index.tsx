import React, { FC, useMemo } from 'react';
import { Switch } from 'antd';
import { FieldProps } from '../interface';


export type FieldBooleanProps = FieldProps & {
  value?: boolean;
  textValues: [string, string];
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
}

export const FieldBoolean: FC<FieldBooleanProps> = ({ onChange, value, textValues, defaultValue, mode, fieldProps }) => {
  const textValue = useMemo(() => {
    if (value === true) {
      return textValues[1] || '是';
    } else if (value === false) {
      return textValues[0] || '否';
    }
    return null
  }, [textValues, value]);
  switch(mode) {
    case 'read':
      return <div>{textValue}</div>;
    case 'edit':
    case 'update':
      return <Switch onChange={onChange} checkedChildren={textValues[1]} unCheckedChildren={textValues[0]} checked={value} defaultChecked={defaultValue} {...fieldProps} />
    default:
      return null;
  }
}

import React, { FC, useMemo } from 'react';
import { FieldProps } from '../interface';


export type FieldBooleanProps = FieldProps & {
  value: boolean;
}

export const FieldBoolean: FC<FieldBooleanProps> = ({ value }) => {
  const textValue = useMemo(() => {
    if (value === true) {
      return '是'
    } else if (value === false) {
      return '否'
    }
    return null
  }, [value]);
  return <div>{textValue}</div>;
}

import React, { FC } from 'react';
import { FieldBoolean } from '../field/boolean';

interface BooleanColumnProps {
  text: boolean;
  record: { [key: string]: any };
  index: number;
}

export const DateColumn: FC<BooleanColumnProps> = ({ text }) => {
  return <FieldBoolean value={text} mode="read" />
}

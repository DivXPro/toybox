import React, { FC } from 'react';
import { ColumnMeta } from '../../types/interface';
import { FieldSelect } from '../field';

interface SingleOptionColumnProps {
  text: string;
  record: { [key: string]: any };
  index: number;
  columnMeta: ColumnMeta;
}

export const SingleOptionColumn: FC<SingleOptionColumnProps> = ({ text, columnMeta }) => {
  return <FieldSelect value={text} options={columnMeta.options} mode="read" />;
}

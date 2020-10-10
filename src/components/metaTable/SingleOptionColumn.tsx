import React, { FC } from 'react';
import { FieldSelect } from '../field';
import { ColumnFCProps } from './interface';
import useColumnLink from './hooks/columnLink';

interface SingleOptionColumnProps extends ColumnFCProps {
  text: string;
}

export const SingleOptionColumn: FC<SingleOptionColumnProps> = ({ text, record, columnMeta }) => {
  const linkHandle = useColumnLink(record, columnMeta.link);
  return <FieldSelect onClick={linkHandle} value={text} options={columnMeta.options} mode="read" />;
}

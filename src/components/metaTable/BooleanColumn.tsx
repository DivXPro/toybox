import React, { FC } from 'react';
import { FieldBoolean } from '../field/boolean';
import useColumnLink from './hooks/columnLink';
import { ColumnFCProps } from './interface';

interface BooleanColumnProps extends ColumnFCProps {
  text: boolean;
}

export const BooleanColumn: FC<BooleanColumnProps> = ({ text, record, columnMeta }) => {
  const linkHandle = useColumnLink(record, columnMeta.link);
  return <FieldBoolean onClick={linkHandle} value={text} mode="read" />
}

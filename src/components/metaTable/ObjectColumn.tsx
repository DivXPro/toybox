import React, { FC, useMemo } from 'react';
import { ColumnFCProps } from './interface';

export type ObjectColumnProps = ColumnFCProps;


export const ObjectColumn: FC<ObjectColumnProps> = ({ text, columnMeta }) => {
  const value = useMemo(
    () => text[columnMeta.titleKey || 'id'],
    [columnMeta.titleKey, text]
  );
  return <div>{value}</div>;
}

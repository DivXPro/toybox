import React, { FC, useMemo } from 'react';
import { ColumnMeta } from '../../types/interface';

interface ObjectColumnProps {
  text: { [key: string]: any };
  record: { [key: string]: any };
  index: number;
  columnMeta: ColumnMeta;
}

export const DateColumn: FC<ObjectColumnProps> = ({ text, columnMeta }) => {
  const value = useMemo(
    () => text[columnMeta.titleKey || 'id'],
    [columnMeta.titleKey, text]
  );
  return <div>{value}</div>;
}

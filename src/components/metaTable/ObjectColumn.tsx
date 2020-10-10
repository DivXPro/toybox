import React, { FC, useMemo } from 'react';
import { ColumnFCProps } from './interface';
import useColumnLink from './hooks/columnLink';

export type ObjectColumnProps = ColumnFCProps;


export const ObjectColumn: FC<ObjectColumnProps> = ({ text, record, columnMeta }) => {
  const linkHandle = useColumnLink(record, columnMeta.link);

  const value = useMemo(
    () => text != null ? text[columnMeta.titleKey || 'id'] : undefined,
    [columnMeta.titleKey, text]
  );
  if (columnMeta.link) {
    return <div className="tbox-column-link" onClick={linkHandle}>{value}</div>;
  }
  return <div>{value}</div>;
}
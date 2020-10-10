import React, { FC } from 'react';
import { ColumnFCProps } from './interface';
import useColumnLink from './hooks/columnLink';

export type DefaultColumnProps = ColumnFCProps;

export const DefaultColumn: FC<DefaultColumnProps> = ({ text, record, columnMeta }) => {
  const linkHandle = useColumnLink(record, columnMeta.link);
  if (columnMeta.link) {
    return <div className="tbox-column-link" onClick={linkHandle}>{text}</div>;
  }
  return <React.Fragment>{text}</React.Fragment>;
}
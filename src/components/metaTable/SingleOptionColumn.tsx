import React, { FC, useMemo } from 'react'
import { ColumnMeta } from '../../types/interface'

interface SingleOptionColumnProps {
  text: string;
  record: { [key: string]: any };
  index: number;
  columnMeta: ColumnMeta;
}

export const SingleOptionColumn: FC<SingleOptionColumnProps> = ({ text, columnMeta }) => {
  const option = useMemo(
    () => columnMeta.options ? columnMeta.options.find(opt => opt.value === text) : { label: text, value: text },
    [columnMeta.options, text]
  );
  return <div>{option?.label}</div>
}

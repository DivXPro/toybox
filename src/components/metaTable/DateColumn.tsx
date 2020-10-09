import React, { FC, useMemo } from 'react';
// import dayjs from 'dayjs';
// import RelativeTime from 'dayjs/plugin/relativeTime';
// import LocalizedFormat from 'dayjs/plugin/localizedFormat';

// import 'dayjs/locale/zh-cn';
import { ColumnFCProps } from './interface';
import { FieldDate } from '../field';

// dayjs.extend(RelativeTime);
// dayjs.extend(LocalizedFormat)
// dayjs.locale('zh-cn');

export interface DataColumnProps extends ColumnFCProps {
  text: string | Date | number;
}

export const DateColumn: FC<DataColumnProps> = ({ text, columnMeta }) => {
  const format = useMemo(() => {
    switch (columnMeta.type) {
      case 'yearMonth':
        return 'YYYY MMMM';
      case 'date':
        return 'LL';
      case 'datetime':
      default:
        return 'LLL';
    }
  }, [columnMeta.type]);
  return <FieldDate value={text} mode="read" format={format} />
}

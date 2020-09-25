import React, { FC, useMemo } from 'react';
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

import 'dayjs/locale/zh-cn';
import { ColumnFCProps } from './interface';

dayjs.extend(RelativeTime);
dayjs.extend(LocalizedFormat)
dayjs.locale('zh-cn');

export interface DataColumnProps extends ColumnFCProps {
  text: string | Date | number;
}

export const DateColumn: FC<DataColumnProps> = ({ text, columnMeta }) => {
  const value = useMemo(() => {
    switch (columnMeta.type) {
      case 'yearMonth':
        return dayjs(text).format('YYYY MMMM')
      case 'date':
        return dayjs(text).format('LL');
      case 'datetime':
      default:
        return dayjs(text).format('LLL')
    }
  }, [text, columnMeta]);
  return <div>{value}</div>;
}

import React, { FC, useMemo } from 'react';
// import dayjs from 'dayjs';
// import RelativeTime from 'dayjs/plugin/relativeTime';
// import LocalizedFormat from 'dayjs/plugin/localizedFormat';

// import 'dayjs/locale/zh-cn';
import { ColumnFCProps } from './interface';
import { FieldDate } from '../field';
import useColumnLink from './hooks/columnLink';

// dayjs.extend(RelativeTime);
// dayjs.extend(LocalizedFormat)
// dayjs.locale('zh-cn');

export interface DataColumnProps extends ColumnFCProps {
  text: string | Date | number;
}

export const DateColumn: FC<DataColumnProps> = ({ text, record, columnMeta }) => {
  const linkHandle = useColumnLink(record, columnMeta.link);

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
  return <FieldDate onClick={linkHandle} value={text} mode="read" format={format} />
}

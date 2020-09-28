import React, { useMemo } from 'react';
import { useAntdTable } from 'ahooks';
import { Form } from 'antd';
import { MetaTable } from '../metaTable';
import { Panel, PanelProps } from '../panel';
import { BusinessObjectMeta } from '../../types/interface';
import { OperateItem } from '../metaTable/OperateColumn';
import { Search } from '../search';

export interface TablePageProps {
  title: string;
  objectMeta: BusinessObjectMeta;
  panel?: PanelProps;
  operateItems?: OperateItem[];
  visibleColumns?: ColumnVisible[];
  loadData: () => Promise<{ list: {[key: string]: any}[], total: number }>;
}

export interface ColumnVisible {
  key: string;
  fixed?: boolean;
  align?: 'left' | 'right' | 'center';
  component?: string;
}

const TablePage = ({ title, objectMeta, panel, operateItems, visibleColumns, loadData }: TablePageProps) => {
  const columnMetas = useMemo(() => {
    if (visibleColumns != null) {
      return visibleColumns.map(col => {
        const fieldMeta = objectMeta.properties[col.key];
        return Object.assign(
          {
            key: col.key,
            fixed: col.fixed,
            align: col.align,
            component: col.component
          },
          fieldMeta,
        );
      });
    }
    return Object.keys(objectMeta.properties).map(key => objectMeta.properties[key])
  }, [objectMeta.properties, visibleColumns])

  const [form] = Form.useForm();
  const { tableProps } = useAntdTable(loadData, {
    defaultPageSize: 10,
    form
  });

  return (
    <div className='tbox-page'>
      <h1>{title}</h1>
      { panel ? <Panel {...panel} /> : undefined }
      <MetaTable rowKey="id" operateItems={operateItems} columnMetas={columnMetas} {...tableProps} />
    </div>
  )
}

TablePage.Search = Search;

export default TablePage;

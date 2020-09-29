import React, { useMemo } from 'react';
import { useAntdTable } from 'ahooks';
import { Form } from 'antd';
import { MetaTable } from '../metaTable';
import { Panel, PanelProps } from '../panel';
import { BusinessObjectMeta } from '../../types/interface';
import { OperateItem } from '../metaTable/OperateColumn';
import { TableSearch, SearchFindParam } from './Search';

export interface TablePageProps {
  title: string;
  objectMeta: BusinessObjectMeta;
  panel?: PanelProps;
  operateItems?: OperateItem[];
  visibleColumns?: ColumnVisible[];
  loadData: (params?: any) => Promise<{ list: {[key: string]: any}[], total: number }>;
  searchOption?: {
    findParams: SearchFindParam[];
  }
}

export interface ColumnVisible {
  key: string;
  fixed?: boolean;
  align?: 'left' | 'right' | 'center';
  component?: string;
}

const TablePage = ({ title, objectMeta, panel, operateItems, visibleColumns, loadData, searchOption }: TablePageProps) => {
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
  const { tableProps, search } = useAntdTable(loadData, {
    defaultPageSize: 10, 
    form,
  });
  const { submit } = search;

  const searchBar = useMemo(() => {
    return searchOption ? <TableSearch form={form} submit={submit}  findParams={searchOption.findParams} /> : undefined
  }, [form, searchOption, submit]);

  return (
    <div className='tbox-page'>
      <h1>{title}</h1>
      {
        panel
          ? <Panel leftRender={searchBar}  rightRender={panel.rightRender} />
          : undefined
      }
      <MetaTable rowKey="id" operateItems={operateItems} columnMetas={columnMetas} {...tableProps} />
    </div>
  )
}

TablePage.Search = TableSearch;

export default TablePage;

import React, { useMemo } from 'react';
import { Form } from 'antd';
import useAntdTable from './useTable';
import { MetaTable } from '../metaTable';
import { Panel, PanelProps } from '../panel';
import { BusinessObjectMeta } from '../../types/interface';
import { OperateItem } from '../metaTable/OperateColumn';
import { TableSearch, SearchFindParam } from './TableSearch';
import { MetaPageHeader } from '../metaPageHeader';
import { ContentWrapper } from './ContentWrapper';

export interface TablePageProps {
  title: string;
  objectMeta: BusinessObjectMeta;
  panel?: PanelProps;
  operateItems?: OperateItem[];
  visibleColumns?: ColumnVisible[];
  loadData: (pageable: { pageSize: number, current: number}, fieldsValue: Record<string, any>) => Promise<{ list: {[key: string]: any}[], total: number }>;
  searchOption?: {
    findParams: SearchFindParam[];
  }
  viewLink?: (...arg: any) => string;
}

export interface ColumnVisible {
  key: string;
  fixed?: boolean;
  align?: 'left' | 'right' | 'center';
  component?: string;
}

const TablePage = ({ title, objectMeta, panel, operateItems, visibleColumns, loadData, searchOption, viewLink }: TablePageProps) => {
  const columnMetas = useMemo(() => {
    if (visibleColumns != null) {
      return visibleColumns.map(col => {
        const fieldMeta = objectMeta.properties[col.key];
        return Object.assign(
          {
            key: col.key,
            fixed: col.fixed,
            align: col.align,
            component: col.component,
            link: fieldMeta.key === objectMeta.titleKey ? viewLink : undefined
          },
          fieldMeta,
        );
      });
    }
    return Object.keys(objectMeta.properties)
      .map(key => Object.assign(objectMeta.properties[key], { link: key === objectMeta.titleKey ? viewLink : undefined}))
  }, [objectMeta.properties, objectMeta.titleKey, viewLink, visibleColumns]);
  const [form] = Form.useForm();
  const { tableProps, search } = useAntdTable(loadData, {
    defaultPageSize: 10, 
    form,
  });
  const { submit } = search;

  const searchBar = useMemo(() => {
    return searchOption
      ? <TableSearch form={form} submit={submit} findParams={searchOption.findParams} />
      : undefined;
  }, [form, searchOption, submit]);
  const tablePanel = useMemo(() => panel
    ? <Panel leftRender={searchBar} rightRender={panel.rightRender} />
    : null,
    [panel, searchBar]
  );
  return (
    <div className='tbox-page'>
      <MetaPageHeader title={title} footer={tablePanel} />
      <ContentWrapper>
        <MetaTable rowKey="id" operateItems={operateItems} columnMetas={columnMetas} {...tableProps} />
      </ContentWrapper>
    </div>
  )
}

TablePage.Search = TableSearch;

export default TablePage;

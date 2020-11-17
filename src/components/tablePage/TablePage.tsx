import React, { useMemo, useImperativeHandle, Ref, useState } from 'react';
import { Form, Button } from 'antd';
import useAntdTable from './useTable';
import { MetaTable } from '../metaTable';
import { Panel, PanelProps } from '../panel';
import { BusinessObjectMeta } from '../../types/interface';
import { OperateItem } from '../metaTable/OperateColumn';
import { TableSearch, SearchFindParam } from './TableSearch';
import { MetaPageHeader } from '../metaPageHeader';
import { ContentWrapper } from './ContentWrapper';
import { Icon } from '../icon';


export interface PageResult {
  list: Record<string, any>[];
  total: number;
}

export interface Pageable {
  pageSize: number;
  current: number;
}

export interface TablePageProps {
  title: string;
  objectMeta: BusinessObjectMeta;
  panel?: PanelProps;
  operateItems?: OperateItem[];
  visibleColumns?: ColumnVisible[];
  loadData: (pageable: Pageable, fieldsValue: Record<string, any>) => Promise<PageResult>;
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

const TablePage = ({ title, objectMeta, panel, operateItems, visibleColumns, loadData, searchOption, viewLink }: TablePageProps, ref: Ref<any>) => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>();

  const { tableProps, search } = useAntdTable(loadData, {
    defaultPageSize: 10,
    form,
  });
  const { submit } = search;

  const rowSelection = useMemo(
    () => selectionType != null
      ? ({
        selectedRowKeys,
        selectionType,
        onChange: (keys: (string | number)[]) => setSelectedRowKeys(keys),
      })
      : undefined,
    [selectedRowKeys, selectionType, setSelectedRowKeys]
  )

  useImperativeHandle(
    ref,
    () => ({
      reload: () => submit(),
    }),
    [submit],
  );
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

  const leftPanel = useMemo(() => {
    return searchOption
      ? <React.Fragment>
          <Button type="text" onClick={() => setSelectionType('checkbox')} icon={<Icon name="ri-checkbox-line" />} />
          <TableSearch form={form} submit={submit} findParams={searchOption.findParams} />
        </React.Fragment>
      : <Button type="text" onClick={() => setSelectionType('checkbox')} icon={<Icon name="ri-checkbox-line" />}/>;
  }, [form, searchOption, submit]);

  const tablePanel = useMemo(() => panel
    ? <Panel leftRender={leftPanel} rightRender={panel.rightRender} />
    : null,
    [panel, leftPanel]
  );

  return (
    <div className='tbox-page'>
      <MetaPageHeader title={title} footer={tablePanel} />
      <ContentWrapper>
        <MetaTable
          rowKey="id"
          operateItems={operateItems}
          columnMetas={columnMetas}
          rowSelection={rowSelection}
          {...tableProps}
        />
      </ContentWrapper>
    </div>
  )
}

TablePage.Search = TableSearch;

export default React.forwardRef(TablePage);

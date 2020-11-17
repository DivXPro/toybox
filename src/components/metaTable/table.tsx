import React, { FC, useMemo, useCallback, ReactNode } from 'react';
import { Table } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table';
import { DateColumn } from './DateColumn';
import { ObjectColumn } from './ObjectColumn';
import { DefaultColumn } from './DefaultColumn';
import { BooleanColumn } from './BooleanColumn';
import { SingleOptionColumn } from './SingleOptionColumn';
import { OperateItem, OperateDropdown, operateFactory } from './OperateColumn';
import { ExpandableConfig, TableRowSelection } from 'antd/lib/table/interface';
import { ColumnFCProps } from './interface';
import { ColumnMeta } from '../../types/interface';

export type RowData = Record<string, any>;

export interface MetaTableProps {
  rowKey?: string | ((record: RowData, index: number) => string);
  rowClassName?: (record: RowData, index: number) => string; 
  size?:  'middle' | 'small';
  columnMetas: ColumnMeta[];
  columnComponents?: Record<string, React.FunctionComponent>;
  dataSource: RowData[];
  loading: boolean;
  onChange: (pagination: TablePaginationConfig, filters?: any, sorter?: any) => void;
  pagination?: TablePaginationConfig | false;
  operateItems?: OperateItem[];
  summary?: (dataSource: RowData[]) => ReactNode;
  title?: (dataSource: RowData[]) => ReactNode;
  showHeader?: boolean;
  expandable?: ExpandableConfig<RowData>;
  bordered?: boolean;
  rowSelection?: TableRowSelection<RowData>;
}

export const columnFactory = (columnMeta: ColumnMeta, fc: FC<ColumnFCProps>) => {
  return (text: any, record: { [key: string]: any }, index: number) => {
    return fc({ text, record, index, columnMeta });
  };
}

const defaultColumnsComponents: Record<string, React.FunctionComponent> = {
  businessObject: ObjectColumn,
  date: DateColumn,
  datetime: DateColumn,
  document: ObjectColumn,
  object: ObjectColumn,
  singleOptionColumn: SingleOptionColumn,
  boolean: BooleanColumn,
  string: DefaultColumn,
  number: DefaultColumn
}

export const MetaTable: FC<MetaTableProps> = ({
  rowKey,
  rowClassName,
  size,
  columnMetas,
  dataSource,
  columnComponents = {},
  onChange,
  pagination,
  operateItems,
  summary,
  title,
  showHeader,
  expandable,
  bordered,
  rowSelection
}) => {

  const mergeColumnComponents = useMemo(() => {
    return Object.assign(defaultColumnsComponents, columnComponents);
  }, [columnComponents]);

  const pickComponent = useCallback((columnMeta: ColumnMeta) => {
    if (columnMeta.component != null) {
      return columnFactory(columnMeta, mergeColumnComponents[columnMeta.component])
    }
    if (columnMeta.type === 'businessObject' || columnMeta.type === 'object' || columnMeta.type === 'document') {
      return columnFactory(columnMeta, mergeColumnComponents[columnMeta.key] || mergeColumnComponents['businessObject']);
    }
    return columnFactory(columnMeta, mergeColumnComponents[columnMeta.type] || DefaultColumn);
  }, [mergeColumnComponents]);

  const makeColumns = useCallback((columnMetas: ColumnMeta[]) => {
    const columns = columnMetas.map(columnMeta => ({
      key: columnMeta.key,
      title: columnMeta.name,
      dataIndex: columnMeta.key,
      render: pickComponent(columnMeta),
    }));
    if (operateItems != null && operateItems.length > 0) {
      columns.push({
        key: 'meta-table-operate',
        title: '',
        dataIndex: 'meta-table-operate',
        render: operateFactory(operateItems, OperateDropdown),
      });
    } 
    return columns;
  }, [operateItems, pickComponent]);

  const columns = useMemo(
    () => makeColumns(columnMetas),
    [columnMetas, makeColumns]
  );
  return (
    <Table
      rowKey={rowKey}
      rowClassName={rowClassName}
      size={size}
      columns={columns}
      onChange={onChange}
      dataSource={dataSource}
      pagination={pagination}
      summary={summary}
      title={title}
      showHeader={showHeader}
      expandable={expandable}
      bordered={bordered}
      rowSelection={rowSelection}
    />
  )
}

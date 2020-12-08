import React, { FC, useMemo, useCallback, ReactNode } from 'react';
import { Table } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table';
import { DateColumn } from './DateColumn';
import { ObjectColumn } from './ObjectColumn';
import { DefaultColumn } from './DefaultColumn';
import { BooleanColumn } from './BooleanColumn';
import { SingleOptionColumn } from './SingleOptionColumn';
import { OperateItem, OperateDropdown, operateFactory } from './OperateColumn';
import { ExpandableConfig, TableRowSelection, ColumnType, ColumnsType } from 'antd/lib/table/interface';
import { ColumnFCProps } from './interface';
import { ColumnMeta } from '../../types/interface';

export type RowData = Record<string, any>;

export interface MetaTableProps {
  rowKey?: string | ((record: RowData, index: number) => string);
  size?:  'middle' | 'small';
  columnMetas: ColumnMeta[];
  columnComponents?: Record<string, (...args: any) => React.ReactNode>;
  dataSource: RowData[];
  loading: boolean;
  pagination?: TablePaginationConfig | false;
  operateItems?: OperateItem[];
  showHeader?: boolean;
  expandable?: ExpandableConfig<RowData>;
  bordered?: boolean;
  rowSelection?: TableRowSelection<RowData>;
  onChange: (pagination: TablePaginationConfig, filters?: any, sorter?: any) => void;
  rowClassName?: (record: RowData, index: number) => string;
  title?: (dataSource: RowData[]) => ReactNode;
  summary?: (dataSource: RowData[]) => ReactNode;
}

export const columnFactory = (columnMeta: ColumnMeta, render: FC<ColumnFCProps>) => {
  return (text: any, record: { [key: string]: any }, index: number) => {
    return render({ text, record, index, columnMeta });
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
  size,
  columnMetas,
  dataSource,
  columnComponents = {},
  pagination,
  operateItems,
  showHeader,
  expandable,
  bordered,
  rowSelection,
  summary,
  title,
  onChange,
  rowClassName,
}) => {

  const mergeColumnComponents = useMemo(() => {
    return Object.assign(defaultColumnsComponents, columnComponents);
  }, [columnComponents]);

  const pickComponent = useCallback((columnMeta: ColumnMeta) => {
    if (columnMeta.component != null) {
      return columnFactory(columnMeta, mergeColumnComponents[columnMeta.component])
    }
    if (
      columnMeta.type === 'businessObject'
      || columnMeta.type === 'object'
      || columnMeta.type === 'document'
    ) {
      return columnFactory(columnMeta, mergeColumnComponents[columnMeta.key] || mergeColumnComponents['businessObject']);
    }
    return columnFactory(columnMeta, mergeColumnComponents[columnMeta.type] || DefaultColumn);
  }, [mergeColumnComponents]);

  const makeColumns = useCallback((columnMetas: ColumnMeta[]) => {
    const columns: ColumnsType<Record<string, any>> = columnMetas.map(columnMeta => {
      return {
        key: columnMeta.key,
        title: columnMeta.name,
        dataIndex: columnMeta.key,
        render: pickComponent(columnMeta),
      };
    });
    if (operateItems != null && operateItems.length > 0) {
      columns.push({
        key: 'meta-table-operate',
        title: '',
        dataIndex: 'meta-table-operate',
        align: 'right',
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

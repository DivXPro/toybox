import React, { FC, useMemo, useCallback } from 'react'
import { Table } from 'antd'
import { DateColumn } from './DateColumn'
import { ColumnMeta } from '../../types/interface'
import { TablePaginationConfig } from 'antd/lib/table'
import { PaginationConfig } from 'antd/lib/pagination';

export interface MetaTableProps {
  columnMetas: ColumnMeta[];
  components?: React.FunctionComponent[];
  dataSource: { [key: string]: any }[];
  loading: boolean;
  onChange: (pagination: PaginationConfig, filters?: any, sorter?: any) => void;
  pagination?: TablePaginationConfig | false;
}


export const columnFactory = (columnMeta: ColumnMeta, fc: FC<{ text: any; record: { [key: string]: any }; index: number, columnMeta: ColumnMeta }>) => {
  return (text: any, record: { [key: string]: any }, index: number) => {
    return fc({ text, record, index, columnMeta })
  }
}

export const MetaTable: FC<MetaTableProps> = ({ columnMetas, dataSource, components = [], pagination }) => {
  const pickComponent = useCallback((columnMeta: ColumnMeta) => {
    switch (columnMeta.type) {
      case 'date':
        return DateColumn
      case 'object':
        return columnFactory(columnMeta, components[columnMeta.objectComponent || columnMeta.key])
      case 'string':
      default:
        return undefined
    }
  },[components])

  const makeColumn = useCallback((columnMetas: ColumnMeta[]) => {
    return columnMetas.map(columnMeta => ({
      key: columnMeta.key,
      title: columnMeta.name,
      dataIndex: columnMeta.key,
      render: pickComponent(columnMeta)
    }))
  }, [pickComponent])

  const columns = useMemo(() => makeColumn(columnMetas), [columnMetas, makeColumn])

  return <Table rowKey="id" columns={columns} dataSource={dataSource} pagination={pagination} />
}

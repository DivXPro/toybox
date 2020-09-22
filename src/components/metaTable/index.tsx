import React, { FC, useMemo, useCallback } from 'react'
import { Table } from 'antd'
import { DateColumn } from './DateColumn'
import { SingleOptionColumn } from './SingleOptionColumn'
import { ColumnMeta } from '../../types/interface'
import { TablePaginationConfig } from 'antd/lib/table'

export interface MetaTableProps {
  rowKey: string;
  columnMetas: ColumnMeta[];
  components?: React.FunctionComponent[];
  dataSource: { [key: string]: any }[];
  loading: boolean;
  onChange: (pagination: TablePaginationConfig, filters?: any, sorter?: any) => void;
  pagination?: TablePaginationConfig | false;
}


export const columnFactory = (columnMeta: ColumnMeta, fc: FC<{ text: any; record: { [key: string]: any }; index: number, columnMeta: ColumnMeta }>) => {
  return (text: any, record: { [key: string]: any }, index: number) => {
    return fc({ text, record, index, columnMeta })
  }
}

export const MetaTable: FC<MetaTableProps> = ({ rowKey, columnMetas, dataSource, components = [], onChange, pagination }) => {
  const pickComponent = useCallback((columnMeta: ColumnMeta) => {
    if (columnMeta.objectComponent != null) {
      return columnFactory(columnMeta, components[columnMeta.objectComponent])
    }
    switch (columnMeta.type) {
      case 'date':
        return DateColumn
      case 'singleOption':
        return SingleOptionColumn
      case 'object':
        return columnFactory(columnMeta, components[columnMeta.key])
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

  return <Table
          rowKey={rowKey}
          columns={columns}
          onChange={onChange}
          dataSource={dataSource}
          pagination={pagination}
        />
}

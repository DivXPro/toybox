import React, { FC, useMemo } from 'react'
import { useAntdTable } from 'ahooks'
import { Form } from 'antd'
import { MetaTable } from '../metaTable'
import { Panel, PanelProps } from '../panel'
import { BusinessObjectMeta } from '../../types/interface'
import { OperateItem } from '../metaTable/OperateColumn'

export interface TablePageProps {
  title: string;
  objectMeta: BusinessObjectMeta;
  panel?: PanelProps;
  operateItems?: OperateItem[];
  loadData: () => Promise<{ list: {[key: string]: any}[], total: number }>;
}


export const TablePage: FC<TablePageProps> = ({ title, objectMeta, panel, operateItems, loadData }) => {
  const columnMetas = useMemo(() => {
    return Object.keys(objectMeta.properties).map(key => objectMeta.properties[key])
  }, [objectMeta.properties])

  const [form] = Form.useForm()
  const { tableProps } = useAntdTable(loadData, {
    defaultPageSize: 10,
    form
  })

  return (
    <div className='tbox-page'>
      <h1>{title}</h1>
      { panel ? <Panel {...panel} /> : undefined }
      <MetaTable rowKey="id" operateItems={operateItems} columnMetas={columnMetas} {...tableProps} />
    </div>
  )
}

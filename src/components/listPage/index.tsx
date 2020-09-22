import React, { FC } from 'react';
import { useAntdTable } from 'ahooks';
import { Form } from 'antd';
import { MetaList } from '../metaList';
import { Panel, PanelProps } from '../panel';
import { BusinessObjectMeta } from '../../types/interface';

export type ListPageProps = {
  title: string;
  objectMeta: BusinessObjectMeta;
  panel?: PanelProps;
  loadData: () => Promise<{ list: { [key: string]: any }[], total: number }>;
}

export const ListPage: FC<ListPageProps> = ({ title, panel, loadData }) => {
  const [form] = Form.useForm()
  const { tableProps } = useAntdTable(loadData, {
    defaultPageSize: 10,
    form
  });

  return (
    <div className='tbox-page'>
      <h1>{title}</h1>
      {panel ? <Panel {...panel} /> : undefined}
      <MetaList content={() => <div>123</div>} {...tableProps} />
    </div>
  )
}

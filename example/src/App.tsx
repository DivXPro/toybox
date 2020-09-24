import React, { FC, useMemo } from 'react'
import { TablePage, ListPage, PanelItem, IconSearch } from 'toybox'
import 'antd/dist/antd.css';
import 'toybox/dist/index.css';
import 'remixicon/fonts/remixicon.css';

const objectMeta = {
  key: 'bill',
  name: '账单',
  description: '账单',
  properties: {
    id: {
      key: 'id',
      name: 'ID',
      description: 'ID',
      type: 'string',
    },
    name: {
      key: 'name',
      name: '名称',
      type: 'string'
    },
    billCycle: {
      key: 'billCycle',
      name: '账期',
      type: 'string'
    },
    amount: {
      key: 'amount',
      name: '金额',
      type: 'number'
    },
  },
  titleKey: 'name',
}

const list = [
  {
    id: '1234',
    name: '销售',
    billCycle: '202001',
    amount: 2000
  },
  {
    id: '1235',
    name: '销售',
    billCycle: '202002',
    amount: 1300
  },
  {
    id: '1236',
    name: '实收',
    billCycle: '202003',
    amount: 1500
  },
  {
    id: '1237',
    name: '销售',
    billCycle: '202004',
    amount: 1800
  },
  {
    id: '1238',
    name: '实收',
    billCycle: '202005',
    amount: 2311
  },
  {
    id: '1239',
    name: '销售',
    billCycle: '202006',
    amount: 1608
  },
  {
    id: '1240',
    name: '实收',
    billCycle: '202007',
    amount: 2305
  },
  {
    id: '1241',
    name: '销售',
    billCycle: '202008',
    amount: 1660
  },
  {
    id: '1242',
    name: '实收',
    billCycle: '202008',
    amount: 2310
  },
  {
    id: '1243',
    name: '应收',
    billCycle: '202009',
    amount: 3310
  }
]

const loadData = () => {
  const promise = new Promise<{ list: { [key: string]: any }[], total: number }>(function (resolve) {
    setTimeout(function () {
      resolve({ list, total: 20 });
    }, 300);
  });
  return promise;
}

const panel = {
  right: [
    {
      type: 'button',
      content: '新增',
      props: {
        type: 'primary',
        onClick: () => console.log('create')
      },
    },
    {
      type: 'button',
      content: '删除',
      props: {
        danger: true,
        onClick: () => console.log('delete')
      },
    }
  ]
}

const App: FC = () => {
  const rightRender = useMemo(() =>
  (panel.right).map((item, idx) => {
    return <PanelItem key={idx} {...item} />;
  }), [])

  return (
    <div>
      <TablePage
        title="Example Table Page"
        objectMeta={objectMeta}
        loadData={loadData}
        operateItems={[
          { text: 'view', type: 'primary', size: 'small' },
          { text: 'edit', type: 'dashed', size: 'small' },
          { text: 'remove', type: 'text', size: 'small', danger: true }
        ]}
        panel={{ leftRender: <IconSearch type="nav-search" placeholder="请输入关键词" />, rightRender }}
      />
      <ListPage
        title="Example List Page"
        objectMeta={objectMeta}
        loadData={loadData}
        panel={{ rightRender}}
      />
    </div>
  )
}

export default App

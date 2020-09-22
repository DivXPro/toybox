import React from 'react'
import { TablePage } from 'toybox'
import 'antd/dist/antd.css';
import 'toybox/dist/index.css'

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

// const columnMetas = [
//   {
//     key: 'name',
//     name: '名称',
//     type: 'string'
//   }, {
//     key: 'billCycle',
//     name: '账期',
//     type: 'string'
//   }, {
//     key: 'amount',
//     name: '金额',
//     type: 'number'
//   }
// ];

// const dataSource = [{
//     name: '销售',
//     billCycle: '202001',
//     amount: 2000
//   }, {
//     name: '实收',
//     billCycle: '202001',
//     amount: 1000
//   }, {
//     name: '应收',
//     billCycle: '202001',
//     amount: 1000
//   }];

// const rightBtns = [{
//     type: 'button',
//     content: 'Submit',
//     callback: () => { console.log('submit' )},
//     props: {
//       type: 'primary'
//     }
//   }, {
//     type: 'button',
//     content: 'cancel',
//     callback: () => { console.log('cancel') }
//   }] as { type: 'button', content: string, callback: () => void }[];

const App = () => {
  return <TablePage title="Example Table Page" objectMeta={objectMeta} loadData={loadData} />
}

export default App

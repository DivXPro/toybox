import { OptionItem } from "../../dist/components/tablePage/TableSearch";
import { ReactText } from "react";

export const objectMeta = {
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
    open: {
      key: 'open',
      name: '开放状态',
      type: 'boolean'
    },
    name: {
      key: 'name',
      name: '名称',
      type: 'string'
    },
    billCycle: {
      key: 'billCycle',
      name: '账期',
      type: 'date'
    },
    amount: {
      key: 'amount',
      name: '金额',
      type: 'number'
    },
    user: {
      key: 'user',
      name: '用户',
      type: 'businessObject',
      titleKey: 'name',
      properties: {
        id: {
          key: 'id',
          name: 'ID',
          type: 'string'
        },
        name: {
          key: 'name',
          name: '用户名',
          type: 'string'
        }
      }
    },
  },
  titleKey: 'name',
}

export const list = [
  {
    id: '1234',
    name: '销售',
    billCycle: '2020-01-01',
    amount: 2000,
    user: {
      id: 'xxx',
      name: '熊丽'
    }
  },
  {
    id: '1235',
    name: '销售',
    billCycle: '2020-02-01',
    amount: 1300,
    user: {
      id: 'xxx2',
      name: '熊丽2'
    }
  },
  {
    id: '1236',
    name: '实收',
    billCycle: '2020-03-03',
    amount: 1500
  },
  {
    id: '1237',
    name: '销售',
    billCycle: '2020/04/04',
    amount: 1800
  },
  {
    id: '1238',
    name: '实收',
    billCycle: '2020/05/10',
    amount: 2311
  },
  {
    id: '1239',
    name: '销售',
    billCycle: '2020/06/11',
    amount: 1608
  },
  {
    id: '1240',
    name: '实收',
    billCycle: '2020/07/12',
    amount: 2305
  },
  {
    id: '1241',
    name: '销售',
    billCycle: '2020/08/18',
    amount: 1660
  },
  {
    id: '1242',
    name: '实收',
    billCycle: '2020/08/1',
    amount: 2310
  },
  {
    id: '1243',
    name: '应收',
    billCycle: '2020/09/12',
    amount: 3310
  }
];

export const msgs = [
  {
    id: '1233451',
    title: '普通通知',
    content: '请去看一下员工花名册',
    link: 'https://www.163.com',
    userId: 'string',
    creator: {
      userId: 'string',
      avatarUrl: 'string',
      name: 'string',
      isSystem: true,
    },
    type: 'Core',
    icon: 'core',
    createdAt: new Date(),
    updatedAt: new Date(),
    haveRead: false,
  },
  {
    id: '1233452',
    title: '普通通知2',
    content: '请去看一下员工花名册',
    link: '/users',
    userId: 'string',
    creator: {
      userId: 'string',
      avatarUrl: 'string',
      name: 'string',
      isSystem: true,
    },
    type: 'Core',
    icon: 'core',
    createdAt: new Date(),
    updatedAt: new Date(),
    haveRead: false,
  },
  {
    id: '1233453',
    title: '普通通知',
    content: '请去看一下员工花名册',
    link: '/users',
    userId: 'string',
    creator: {
      userId: 'string',
      avatarUrl: 'string',
      name: 'string',
      isSystem: true,
    },
    type: 'Core',
    icon: 'core',
    createdAt: new Date(),
    updatedAt: new Date(),
    haveRead: false,
  },
  {
    id: '1233454',
    title: '普通通知2',
    content: '请去看一下员工花名册',
    link: '/users',
    userId: 'string',
    creator: {
      userId: 'string',
      avatarUrl: 'string',
      name: 'string',
      isSystem: true,
    },
    type: 'Core',
    icon: 'core',
    createdAt: new Date(),
    updatedAt: new Date(),
    haveRead: false,
  },
  {
    id: '1233455',
    title: '普通通知',
    content: '请去看一下员工花名册',
    link: '/users',
    userId: 'string',
    creator: {
      userId: 'string',
      avatarUrl: 'string',
      name: 'string',
      isSystem: true,
    },
    type: 'Core',
    icon: 'core',
    createdAt: new Date(),
    updatedAt: new Date(),
    haveRead: false,
  },
  {
    id: '1233456',
    title: '普通通知2',
    content: '请去看一下员工花名册',
    link: '/users',
    userId: 'string',
    creator: {
      userId: 'string',
      avatarUrl: 'string',
      name: 'string',
      isSystem: true,
    },
    type: 'Core',
    icon: 'core',
    createdAt: new Date(),
    updatedAt: new Date(),
    haveRead: false,
  }
];

export const visibleColumns = [
  {
    key: 'name'
  }, {
    key: 'billCycle'
  }, {
    key: 'amount'
  }, {
    key: 'user',
  }
];


export const options = [
  { label: 'A', value: 'a' },
  { label: 'B', value: 'b' },
  { label: 'C', value: 'c' }
]

export const loadOptions = () => {
  const promise = new Promise<OptionItem[]>(function (resolve) {
    setTimeout(() => {
      resolve([
        { label: 'DD', value: 'd' },
        { label: 'BB', value: 'b' },
        { label: 'CC', value: 'c' }
      ]);
    }, 300);
  });
  return promise;
}

export const loadOptionByValue = (value: ReactText | ReactText[]) => {
  const promise = new Promise<OptionItem | OptionItem[]>(function (resolve) {
    setTimeout(() => {
      if (Array.isArray(value)) {
        resolve(value.map((v, i) => ({ label: `new label ${i}`, value: v})));
      } else {
        resolve({ label: 'new lable', value });
      }
    }, 300);
  });
  return promise;
}
---
name: TablePage
route: /table_page
menu: 组件
---

import { Playground, Props } from 'docz';
import { TablePage } from './index.tsx';

# Icon
### Basic usage
<Playground>
  <TablePage
    title="Example Table Page"
    objectMeta={{
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
          type: 'date'
        },
        amount: {
          key: 'amount',
          name: '金额',
          type: 'number'
        },
      },
      titleKey: 'name',
    }}
    loadData={
      () => {
        const promise = new Promise(function (resolve) {
          setTimeout(function () {
            resolve({ list, total: 20 });
          }, 1000);
        });
        return promise;
      }
    }
    visibleColumns={
      [
        {
          key: name,
        },
        {
          key: billCycle,
        },
        {
          key: amount
        }
      ]
    }
    operateItems={[
      { text: 'view', type: 'primary', size: 'small' },
      { text: 'edit', type: 'dashed', size: 'small' },
      { text: 'remove', type: 'text', size: 'small', danger: true }
    ]}
  />
</Playground>

### Icon Props
<Props of={TablePage} />


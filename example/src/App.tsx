import React, { FC, useMemo, useRef } from 'react';
import { useBusinessObjectMeta, useFormModal, TablePage, ListPage, PanelItem, ProHeader, Avatar, MetaDescriptons, FieldString, FieldDate, FieldSelect } from 'toybox';
import { Button, Layout, Menu } from 'antd';
import { objectMeta, list, visibleColumns, options } from './data';
import 'antd/dist/antd.css';
import 'toybox/dist/index.css';

const { Content, Sider } = Layout;

const loadData = () => {
  const promise = new Promise<{ list: { [key: string]: any }[], total: number }>(function (resolve) {
    setTimeout(function () {
      resolve({ list, total: 20 });
    }, 1000);
  });
  return promise;
}

// const loadMore: (unread: boolean, offset: number, limit: number, timestamp: number, type?: string) => Promise<NotificationMessage[]> = () => {
//   const promise = new Promise<NotificationMessage[]>(function (resolve) {
//     setTimeout(function () {
//       resolve(msgs);
//     }, 1000);
//   });
//   return promise;
// }

// const loadMessages: (unread: boolean, limit: number, type?: string) => Promise<NotificationMessage[]> = (): Promise<NotificationMessage[]> => {
//   const promise = new Promise<NotificationMessage[]>(function (resolve) {
//     setTimeout(function () {
//       resolve(msgs);
//     }, 1000);
//   });
//   return promise;
// }

// const loadBadge: () => Promise<number> = () => {
//   const promise = new Promise<number>(function (resolve) {
//     setTimeout(function () {
//       resolve(20);
//     }, 1000);
//   });
//   return promise;
// }

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

const viewLink = ({ id }: { id: string }) => {
  return `talents/${id}`;
}

const App: FC = () => {
  const inputRef = useRef<any>();
  const tableRef = useRef<any>();
  const rightRender = useMemo(() =>
  (panel.right).map((item, idx) => {
    return <PanelItem key={idx} {...item} />;
  }), []);

  const fieldMetas = useBusinessObjectMeta(objectMeta);
  const [,,FormModal] = useFormModal({
    title: 'FormModal',
    modalProps: {},
    formProps: {
      fieldMetas: fieldMetas,
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
      labelAlign: 'left',
    },
    onFinish: async (data: any) => {
      console.log('data:', data);
    },
    onCancel: () => undefined,
    trigger: <Button>123</Button>,
  });

  return (
    <Layout>
      <ProHeader
        brand="DEMO"
        rightRender={
          <React.Fragment>
            <Avatar.AvatarWithName name="小林" img="https://teambition-file.alibaba-inc.com/thumbnail/011he036f61ebeb2f1e09c0e586b4788a195/w/200/h/200" />
          </React.Fragment>
        }
      />
      <Layout>
        <Sider theme="light" width={200}>
          <Menu defaultSelectedKeys={['2']} mode="inline" style={{ marginTop: '12px', height: '100%' }}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content>
            <FieldString mode="read" value="abcText" />
            <FieldString fieldProps={{ style: { width: '300px' } }} mode="edit" value="abcText" />
            <FieldDate mode="read" value="2020-12-1" format="YYYY-MM-DD" />
            <FieldDate mode="edit" value="2020-12-1" format="YYYY-MM-DD" />
            <FieldDate mode="edit" value="2020-12-1 12:30:00" format="YYYY-MM-DD HH:mm:ss" showTime />
            <FieldSelect mode="edit" value="a" options={options} />
            <FieldString ref={inputRef} mode="edit" value="s" />
            <TablePage
              ref={tableRef}
              title="Example Table Page"
              objectMeta={objectMeta}
              loadData={loadData}
              visibleColumns={visibleColumns}
              viewLink={viewLink}
              operateItems={[
                { text: 'view', type: 'primary', size: 'small' },
                { text: 'edit', type: 'dashed', size: 'small' },
                { text: 'remove', type: 'text', size: 'small', danger: true }
              ]}
              panel={{ rightRender }}
              panelItems={[{ text: 'add', callback: () => undefined }]}
            />
            <ListPage
              title="Example List Page"
              objectMeta={objectMeta}
              loadData={loadData}
              panel={{ rightRender }}
            />
            <MetaDescriptons fieldItemMetas={fieldMetas} data={list[0]} mode="read" />
            <FormModal />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default App;

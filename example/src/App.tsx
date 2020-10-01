import React, { FC, useMemo } from 'react';
import { TablePage, ListPage, PanelItem, ProHeader, Avatar, InboxButton, NotificationMessage, FieldString, FieldDate, FieldSelect } from 'toybox';
import { Layout, Menu } from 'antd';
import { objectMeta, list, msgs, visibleColumns, options, loadOptions, loadOptionByValue } from './data';
import 'antd/dist/antd.css';
import 'toybox/dist/index.css';
import 'remixicon/fonts/remixicon.css';

const { Content, Sider } = Layout;

const loadData = () => {
  const promise = new Promise<{ list: { [key: string]: any }[], total: number }>(function (resolve) {
    setTimeout(function () {
      resolve({ list, total: 20 });
    }, 1000);
  });
  return promise;
}

const loadMore: (unread: boolean, offset: number, limit: number, timestamp: number, type?: string) => Promise<NotificationMessage[]> = () => {
  const promise = new Promise<NotificationMessage[]>(function (resolve) {
    setTimeout(function () {
      resolve(msgs);
    }, 1000);
  });
  return promise;
}

const loadMessages: (unread: boolean, limit: number, type?: string) => Promise<NotificationMessage[]> = (): Promise<NotificationMessage[]> => {
  const promise = new Promise<NotificationMessage[]>(function (resolve) {
    setTimeout(function () {
      resolve(msgs);
    }, 1000);
  });
  return promise;
}

const loadBadge: () => Promise<number> = () => {
  const promise = new Promise<number>(function (resolve) {
    setTimeout(function () {
      resolve(20);
    }, 1000);
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
  }), []);

  return (
    <Layout>
      <ProHeader
        brand="DEMO"
        rightRender={
          <React.Fragment>
            <InboxButton
              placement="bottomLeft"
              loadBadge={loadBadge}
              onPick={() => undefined}
              loadMore={loadMore}
              reload={loadMessages}
              remove={() => undefined}
              read={() => undefined}
              bundle={6}
            />
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
            <FieldSelect mode="edit" value="a" options={options} />
            <FieldSelect mode="edit" value="a" remote={loadOptions} remoteByValue={loadOptionByValue} />
            <TablePage
              title="Example Table Page"
              objectMeta={objectMeta}
              loadData={loadData}
              visibleColumns={visibleColumns}
              operateItems={[
                { text: 'view', type: 'primary', size: 'small' },
                { text: 'edit', type: 'dashed', size: 'small' },
                { text: 'remove', type: 'text', size: 'small', danger: true }
              ]}
              panel={{ rightRender }}
            />
            <ListPage
              title="Example List Page"
              objectMeta={objectMeta}
              loadData={loadData}
              panel={{ rightRender }}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default App;

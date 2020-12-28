import React, { FC, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useBusinessObjectMeta, useFormModal, IndexPage, ProHeader, ListPage, Avatar, MetaDescriptons, SearchFindParam } from 'toybox';
import { Button, Layout, Menu } from 'antd';
import { objectMeta, list, visibleColumns } from './data';
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

const viewLink = ({ id }: { id: string }) => {
  return `talents/${id}`;
}

const findParams: SearchFindParam[] = [
  {
    name: '名称',
    type: 'string',
    key: 'name',
  }, {
    name: '名称2',
    type: 'string',
    key: 'name2',
    advance: true,
  }
];

const App: FC = () => {
  const tableRef = useRef<any>();
  const fieldMetas = useBusinessObjectMeta(objectMeta);
  const [FormModal] = useFormModal({
    title: 'FormModal',
    modalProps: {},
    formProps: {
      fieldMetaProfiles: fieldMetas,
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
      labelAlign: 'left',
    },
    onFinish: async (data: any) => {
      console.log('data:', data);
    },
    onCancel: () => undefined,
  });

  const showSelected = useCallback(() => {
    console.log('rows', tableRef.current.selectedRows);
  }, [tableRef]);

  return (
    <Router>
      <Switch>
        <Route>
          <Layout>
            <ProHeader
              brand="DEMO"
              rightRender={
                <React.Fragment>
                  <Avatar name="小林光" size="xs" />
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
                  <IndexPage
                    ref={tableRef}
                    title="Example Table Page"
                    objectMeta={objectMeta}
                    loadData={loadData}
                    visibleColumns={visibleColumns}
                    viewLink={viewLink}
                    mode="table"
                    renderContent={() => <div>item</div>}
                    viewMode={['table', 'list']}
                    operateItems={[
                      { text: 'view', type: 'primary', size: 'small' },
                      { text: 'edit', type: 'dashed', size: 'small' },
                      { text: 'remove', type: 'text', size: 'small', danger: true }
                    ]}
                    panelItems={[
                      {
                        type: 'button',
                        props: {
                          items: [
                            {
                              text: '新增',
                              type: 'primary',
                              onClick: () => console.log('create')
                            }
                          ]
                        },
                      }, {
                        type: 'dropdownMenu',
                        selection: true,
                        props: {
                          items: [
                            {
                              text: '批量修改',
                              type: 'primary',
                              callback: showSelected,
                            }, {
                              text: '批量删除',
                              danger: true,
                              callback: () => console.log('delete')
                            }
                          ]
                        },
                      }
                    ]}
                    searchOption={{ findParams }}
                  />
                  <ListPage
                    title="Example List Page"
                    objectMeta={objectMeta}
                    loadData={loadData}
                  />
                  <MetaDescriptons fieldItemMetas={fieldMetas} data={list[0]} mode="read" />
                  <FormModal>
                    <Button>open form</Button>
                  </FormModal>
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;

import React, { FC, useCallback, useMemo } from 'react';
import { Form, Select, Input, Col, Row, Button } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { SearchFindParam, OptionItem } from './IndexSearch';
import { RemoteSelect } from './RemoteSelect';

export interface AdvanceSearchProps {
  form: FormInstance<any>;
  findParams: SearchFindParam[];
  submit: () => void;
  className?: string;
  style?: any;
}

export const AdvanceSearch: FC<AdvanceSearchProps> = ({ className, style, form, findParams, submit }) => {
  const findItem = useCallback((findParam: SearchFindParam) => {
    switch (findParam.type) {
      case 'string':
        return <Input placeholder={findParam.name} />
      case 'singleOption':
        return <Select placeholder={findParam.name} options={findParam.options} />
      case 'remoteSingleOption':
        return <RemoteSelect placeholder={findParam.name} remote={findParam.remote as (query: string) => Promise<OptionItem[]>}  />;
      default:
        return <Select placeholder={findParam.name} options={findParam.options} />
    }
  }, []);

  const findItems = useMemo(
    () => 
      findParams.map((param, idx) => {
        return <Col span={8} key={idx}>
          <Form.Item name={param.key} label={param.name}>
            {findItem(param)}
          </Form.Item>
        </Col>
      }),
    [findItem, findParams]
  );

  return <Form className={className} style={style} form={form}>
    <Row gutter={24}>
      {findItems}
    </Row>
    <Row>
      <Col span={24} style={{ textAlign: 'right' }}>
        <Button type="primary" htmlType="submit" size="small" onClick={submit}>
          搜索
        </Button>
        <Button
          style={{ marginLeft: '8px' }}
          size="small"
          onClick={() => {
            form.resetFields();
          }}
        >
          重置
        </Button>
      </Col>
    </Row>
  </Form>
}
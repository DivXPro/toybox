import React, { FC, useMemo, useCallback } from 'react';
import { Form, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { RemoteSelect } from './RemoteSelect';
import { Search } from '../search';
import { Button } from '../button';

export interface IndexSearchProps {
  form: FormInstance<any>;
  findParams: SearchFindParam[];
  submit: () => void;
  showAdvance?: boolean;
  triggerAdvance?: () => void;
}

export interface OptionItem {
  label: string;
  value: string | number;
}

export interface SearchFindParam {
  name: string;
  type: 'singleOption' | 'remoteSingleOption' | 'string';
  key: string;
  options?: OptionItem[];
  advance?: boolean;
  remote?: (query: string) => Promise<OptionItem[]>;
}

export const IndexSearch: FC<IndexSearchProps> = ({ form, findParams, showAdvance, submit, triggerAdvance }) => {
  const handleSearch = useCallback(() => {
    submit();
  }, [submit]);

  const hasAdvance = useMemo(() => triggerAdvance && findParams.filter(param => param.advance).length > 0, [findParams, triggerAdvance]);

  const findItem = useCallback((findParam: SearchFindParam) => {
    switch (findParam.type) {
      case 'string':
        return <Search.IconSearch placeholder={findParam.name} onSearch={handleSearch} onClear={handleSearch} />
      case 'singleOption':
        return <Select style={{ minWidth: 160 }} placeholder={findParam.name} options={findParam.options} onChange={handleSearch} allowClear />
      case 'remoteSingleOption':
        return <RemoteSelect style={{ minWidth: 160 }} placeholder={findParam.name} remote={findParam.remote as (query: string) => Promise<OptionItem[]>} onChange={handleSearch} allowClear />;
      default:
        return <Select style={{ minWidth: 160 }} placeholder={findParam.name} options={findParam.options} onChange={handleSearch} allowClear />
    }
  }, [handleSearch]);
  
  const findItems = useMemo(() => {
    return findParams
      .filter(param => !param.advance)
      .map((param, index) => {
        return (
          <Form.Item key={index} name={param.key}>
            {findItem(param)}
          </Form.Item>
        );
      });
  }, [findItem, findParams]);
  
  return (
    <React.Fragment>
      <Form form={form} layout="inline">
        {!showAdvance && findItems}
        {hasAdvance && <Form.Item><Button type="text" onClick={triggerAdvance}>高级搜索</Button></Form.Item>}
      </Form>
    </React.Fragment>
  );
}

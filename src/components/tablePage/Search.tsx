import React, { FC, useMemo, useCallback } from 'react';
import { Form, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { RemoteSelect } from './RemoteSelect';
import { Search } from '../search';

export interface TableSearchProps {
  form: FormInstance<any>;
  search: (params: Record<string, any>) => void;
  findParams: SearchFindParam[];
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
  remote?: (query: string) => Promise<OptionItem[]>;
}

export const TableSearch: FC<TableSearchProps> = ({ form, findParams, search }) => {
  const handleSearch = useCallback(() => {
    search(form.getFieldsValue());
  }, [form, search]);

  const findItems = useMemo(() => {
    return findParams.map((param, index) => {
      let search;
      switch(param.type) {
        case 'string':
          search = <Search placeholder={param.name} onSearch={handleSearch} onClear={handleSearch} />
          break;
        case 'singleOption':
          search = <Select placeholder={param.name} options={param.options} onChange={handleSearch} />
          break;
        case 'remoteSingleOption':
          search = <RemoteSelect placeholder={param.name} remote={param.remote as (query: string) => Promise<OptionItem[]>} onChange={handleSearch} />;
          break;
        default:
          search = <Select placeholder={param.name} options={param.options} onChange={handleSearch} />
          break;
      }
      return (
        <Form.Item key={index} name={param.key}>
          {search}
        </Form.Item>
      );
    });
  }, [findParams, handleSearch]);

  return (
    <Form form={form} layout="inline">
      {findItems}
    </Form>
  );
}

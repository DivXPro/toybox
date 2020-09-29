import React, { FC, useCallback, useState } from 'react';
import { Select } from 'antd';
import { OptionItem } from './TableSearch';

export interface RemoteSelectProps {
  placeholder?: string;
  remote: (query: string) => Promise<OptionItem[]>;
  onChange: (value: string | number) => void;
}

export const RemoteSelect: FC<RemoteSelectProps> = ({ placeholder, remote, onChange }) => {
  const [options, setOptions] = useState<OptionItem[]>();
  const handleSearch = useCallback((query: string) => {
    remote(query).then((data) => {
      setOptions(data);
    });
  }, [remote]);
  return <Select placeholder={placeholder} options={options} onSearch={handleSearch} onChange={onChange}></Select>
}

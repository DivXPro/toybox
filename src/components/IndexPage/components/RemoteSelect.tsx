import React, { FC, useCallback, useState } from 'react';
import { Select } from 'antd';
import { OptionItem } from './IndexSearch';

export interface RemoteSelectProps {
  placeholder?: string;
  remote: (query: string) => Promise<OptionItem[]>;
  onChange?: (value: string | number) => void;
  style?: any;
  allowClear?: boolean;
}

export const RemoteSelect: FC<RemoteSelectProps> = ({ placeholder, style, allowClear, remote, onChange }) => {
  const [options, setOptions] = useState<OptionItem[]>();
  const handleSearch = useCallback((query: string) => {
    remote(query).then((data) => {
      setOptions(data);
    });
  }, [remote]);
  return <Select style={style} placeholder={placeholder} options={options} onSearch={handleSearch} onChange={onChange} allowClear={allowClear} />
}

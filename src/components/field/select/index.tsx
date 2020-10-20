import React, {
  Ref,
  useRef,
  useMemo,
  useContext,
  useImperativeHandle,
  useState,
  useEffect,
  useCallback
} from 'react';
import { Select, Spin } from 'antd';
import SizeContext from 'antd/lib/config-provider/SizeContext';
import { FieldProps } from '../interface';
import useFetchOptions from './hooks/useFetchOptions';

export interface OptionItem {
  label: React.ReactNode;
  value: React.ReactText;
}

export interface FieldSelectProps extends FieldProps {
  value?: string | number;
  defaultValue?: string | number;
  remote?: (key: string, params?: any) => Promise<OptionItem[]>;
  remoteByValue?: (value: string | number, params?: any) => Promise<OptionItem>;
  options?: OptionItem[];
  placeholder?: string;
  params?: any;
  onChange?: (value: string | number, options?: OptionItem | OptionItem[]) => void;
}

const defaultRemote = () => new Promise<OptionItem[]>((resolve) => {
  resolve([]);
});

const FieldSelect = ({ defaultValue, value, onChange, mode, fieldProps, remote, remoteByValue, options, placeholder, params, onClick }: FieldSelectProps, ref: Ref<any>) => {
  const [loading, remoteOptions, fetchData] = useFetchOptions(remote || defaultRemote, params);
  const [initOption, setInitOption] = useState<OptionItem>();
  const [initial, setInitial] = useState(false);
  const inputRef = useRef<any>();
  const size = useContext(SizeContext);

  useImperativeHandle(ref, () => ({
    ...(inputRef.current || {}),
    fetchData,
  }));

  const mergeOptions = useMemo(() => {
    if (remote == null) {
      return options;
    }
    if (remoteOptions.some(opt => opt.value === initOption?.value)) {
      return remoteOptions;
    }
    if (initOption != null) {
      return ([initOption]).concat(...remoteOptions);
    }
    return remoteOptions;
  }, [initOption, options, remote, remoteOptions])

  const current = useMemo(
    () => mergeOptions ? mergeOptions.find(opt => opt.value === value) : undefined,
    [mergeOptions, value]
  );

  const innerValue = useMemo(() => {
    if (remote && !initial) {
      return null;
    }
    return value;
  }, [initial, remote, value])

  useEffect(() => {
    const init = async () => {
      if (value != null && current == null && !initial && remoteByValue) {
        const option = await remoteByValue(value, params);
        setInitOption(option);
      }
      if (remote != null && !initial) {
        await fetchData('');
      }
      setInitial(true)
    }
    init();
  }, [current, initial, fetchData, params, remote, remoteByValue, value]);
  
  const handleChange = useCallback((value: React.ReactText, options: OptionItem | OptionItem[]) => {
    onChange && onChange(value, options);
  }, [onChange]);

  if (mode === 'read') {
    if (loading) {
      return <Spin />;
    }
    return <span onClick={onClick}>{current?.label}</span>;
  }
  if (mode === 'edit') {
    return <Select
            value={innerValue}
            onChange={handleChange}
            defaultValue={defaultValue}
            showSearch={remote != null}
            size={size}
            onSearch={fetchData}
            loading={loading}
            placeholder={placeholder}
            ref={inputRef}
            options={mergeOptions}
            filterOption={false}
            {...fieldProps}
          />
  }
  return null;
}

export default React.forwardRef(FieldSelect);
 
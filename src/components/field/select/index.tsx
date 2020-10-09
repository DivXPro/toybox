import React, {
  Ref,
  useRef,
  useMemo,
  useContext,
  useImperativeHandle,
  useState,
  useEffect
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
  value: string | number;
  remote?: (key: string, params?: any) => Promise<OptionItem[]>;
  remoteByValue?: (value: string | number, params?: any) => Promise<OptionItem>;
  options?: OptionItem[];
  placeholder?: string;
  params?: any;
}

const defaultRemote = () => new Promise<OptionItem[]>((resolve) => {
  resolve([]);
});

const FieldSelect = ({ value, mode, fieldProps, remote, remoteByValue, options, placeholder, params }: FieldSelectProps, ref: Ref<any>) => {
  const [loading, remoteOptions, loadData] = useFetchOptions(remote || defaultRemote, params);
  const [initOption, setInitOption] = useState<OptionItem>();
  const [initial, setInitial] = useState(false);
  const inputRef = useRef<any>();
  const size = useContext(SizeContext);

  useImperativeHandle(ref, () => ({
    ...(inputRef.current || {}),
    fetchData: () => loadData,
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

  useEffect(() => {
    const init = async () => {
      if (value != null && current == null && !initial && remoteByValue) {
        const option = await remoteByValue(value, params);
        setInitOption(option);
      }
      if (remote != null) {
        await loadData('');
      }
      setInitial(true)
    }
    init();
  }, [current, initial, loadData, params, remote, remoteByValue, value]);
  
  if (mode === 'read') {
    if (loading) {
      return <Spin />;
    }
    return <span>{current?.label}</span>;
  }
  if (mode === 'edit') {
    return <Select
            value={value}
            showSearch={remote != null}
            size={size}
            onSearch={loadData}
            loading={loading}
            placeholder={placeholder}
            ref={inputRef}
            options={mergeOptions}
            {...fieldProps}
          />
  }
  return null;
}

export default React.forwardRef(FieldSelect);
 
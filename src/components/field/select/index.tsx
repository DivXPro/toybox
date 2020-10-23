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
import debounce from 'lodash/debounce';
import intersection from 'lodash/intersection';
import { FieldProps } from '../interface';
import useFetchOptions from './hooks/useFetchOptions';

export interface OptionItem {
  label: React.ReactNode;
  value: React.ReactText;
}

type SelectValue = React.ReactText | React.ReactText[];

export interface FieldSelectProps extends FieldProps {
  value?: SelectValue;
  defaultValue?: SelectValue;
  multiple?: boolean;
  remote?: (key: string, params?: any) => Promise<OptionItem[]>;
  remoteByValue?: (value: SelectValue, params?: any) => Promise<OptionItem | OptionItem[]>;
  options?: OptionItem[];
  placeholder?: string;
  params?: any;
  onChange?: (value: SelectValue, options?: OptionItem | OptionItem[]) => void;
}

const defaultRemote = () => new Promise<OptionItem[]>((resolve) => {
  resolve([]);
});

const FieldSelect = ({
  defaultValue,
  value,
  onChange,
  mode,
  fieldProps,
  remote,
  remoteByValue,
  options,
  placeholder,
  params,
  onClick,
  multiple,
}: FieldSelectProps, ref: Ref<any>) => {
  const [loading, remoteOptions, fetchData] = useFetchOptions(remote || defaultRemote, params);
  const [initOptions, setInitOptions] = useState<OptionItem[]>([]);
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
    if (intersection(remoteOptions.map(o => o.value), (initOptions || []).map(io => io.value)).length === initOptions.length) {
      return remoteOptions;
    }
    if (initOptions != null && initOptions.length > 0) {
      return ([...initOptions]).concat(...remoteOptions);
    }
    return remoteOptions;
  }, [initOptions, options, remote, remoteOptions])

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
        const options = await remoteByValue(value, params);
        if (Array.isArray(options)) {
          setInitOptions(options);
        } else {
          setInitOptions([options]);
        }
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
            onChange={debounce(handleChange, 500)}
            defaultValue={defaultValue}
            showSearch={remote != null}
            size={size}
            onSearch={fetchData}
            loading={loading}
            placeholder={placeholder}
            ref={inputRef}
            options={mergeOptions}
            filterOption={false}
            mode={ multiple ? 'multiple' : undefined }
            {...fieldProps}
          />
  }
  return null;
}

export default React.forwardRef(FieldSelect);
 
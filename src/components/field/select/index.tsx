import React, {
  Ref,
  ForwardRefRenderFunction,
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
  options?: OptionItem[];
  placeholder?: string;
  params?: any;
  onChange?: (value: SelectValue, options?: OptionItem | OptionItem[]) => void;
}

const defaultRemote = () => new Promise<OptionItem[]>((resolve) => {
  resolve([]);
});

const FieldSelect: ForwardRefRenderFunction<any, FieldSelectProps> = ({
  defaultValue,
  value,
  mode,
  fieldProps,
  options,
  placeholder,
  params,
  multiple,
  disabled,
  onChange,
  onClick,
  remote,
  remoteByValue,
}, ref) => {
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

  const innerValue = useMemo(() => {
    if (remote && !initial) {
      return null;
    }
    return value;
  }, [initial, remote, value]);


  const current = useMemo(
    () => mergeOptions ? mergeOptions.find(opt => opt.value === innerValue) : undefined,
    [mergeOptions, innerValue]
  );

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
    return (
      <Select
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
        disabled={disabled}
        {...fieldProps}
      />
    );
  }
  return null;
}

export default React.forwardRef(FieldSelect);

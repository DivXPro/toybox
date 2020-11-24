import React, { FC, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Search2Line } from '@airclass/icons';
import { Button, Input } from 'antd';
import classNames from 'classnames';
import { SearchProps } from './Search';

export interface IconSearchProps extends SearchProps {
  searchClassName?: string;
  direction?: 'ltr' | 'rtl';
  triggerTooltipProps?: string;
}

export const IconSearch: FC<IconSearchProps> = ({
  addonAfter,
  autoFocus = false,
  defaultValue,
  value,
  onChange,
  onSearch,
  placeholder,
  allowClear = true,
  disabled = false
}) => {
  const [focus, setFocus] = useState(autoFocus);
  const inputRef = useRef<Input>(null);

  useEffect(() => {
    autoFocus && inputRef?.current?.focus();
  }, [autoFocus])

  const innerOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.value);
  }, [onChange]);

  const innerOnSearch = useCallback((event: any) => {
    onSearch && onSearch(event.target.value);
  }, [onSearch]);


  const prefix = useMemo(() => {
    return <Search2Line />
  }, []);

  const handleFocus = useCallback(() => {
    setFocus(true);
  }, []);
  const handleBlur = useCallback(() => {
    setFocus(false);
  }, []);

  const holdInput = useMemo(() => {
    return focus || (inputRef?.current?.input.value != null && inputRef?.current?.input.value !== '');
  }, [focus])

  return (
    <div className="tbox-icon-search">
      {
        holdInput
          ? null
          : <Button
              className="tbox-icon-search-icon"
              type="text"
              onClick={() => inputRef.current?.focus()}
              icon={<Search2Line />}
            />
      }
      <div className={classNames('tbox-search', holdInput ? 'tbox-search-hold' : 'tbox-search-fold')}>
        <Input
          className='tbox-search-input'
          ref={inputRef}
          prefix={prefix}
          defaultValue={defaultValue}
          value={value}
          placeholder={placeholder}
          onPressEnter={innerOnSearch}
          onChange={innerOnChange}
          addonAfter={addonAfter}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          allowClear={allowClear}
        />
      </div>
    </div>
  )
}

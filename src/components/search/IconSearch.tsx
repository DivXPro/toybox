import React, { FC, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { SearchProps } from './Search';
import { Button, Input } from 'antd';
import { Icon } from '../icon';
import classNames from 'classnames'

const SEARCH_ICON_NAME = 'ri-search-2-line';

export interface IconSearchProps extends SearchProps {
  searchClassName?: string;
  direction?: 'ltr' | 'rtl';
  triggerTooltipProps?: string;
}

export const IconSearch: FC<IconSearchProps> = ({ addonAfter, autoFocus = false, defaultValue, value, onChange, onSearch, placeholder, allowClear = true, disabled = false }) => {
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
    return <Icon name={SEARCH_ICON_NAME} />
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
      {holdInput ? null : <Button className="tbox-icon-search-icon" type="text" onClick={() => inputRef.current?.focus()} icon={<i className={SEARCH_ICON_NAME} />} />}
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

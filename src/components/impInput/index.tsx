import React, { FC, useState, useMemo } from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';

export type ImpInputProps = {
  onSave: (value: string | number | readonly string[] | undefined) => void;
} & InputProps;

export const ImpInput: FC<ImpInputProps> = (props) => {
  const { value, onSave, onPressEnter, onChange, onBlur, ...other } = props;

  const [active, setActive] = useState(false);
  const [innerValue, setInnerValue] = useState(props.value);

  const disabled = useMemo(() => {
    return props.disabled;
  }, [props.disabled]);

  const activeHandle = () => {
    if (props.disabled) {
      return;
    }
    setActive(true);
  }

  const onPressEnterHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setActive(false);
    if (onPressEnter != null && typeof onPressEnter === 'function') {
      onPressEnter(e);
    }
    onSave(innerValue);
  }

  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInnerValue(e.target.value);
    if (onChange != null && typeof onChange === 'function') {
      onChange(e);
    }
  }

  const onBlurHandle = (e: React.FocusEvent<HTMLInputElement>) => {
    setActive(false);
    if (onBlur != null && typeof onBlur === 'function') {
      onBlur(e);
    }
    setInnerValue(value);
  }


  return (
    <div className='imp-input'>
      {
        active
          ? <Input onBlur={onBlurHandle} onPressEnter={onPressEnterHandle} onChange={onChangeHandle} value={innerValue} {...other} />
          : <div className={`${disabled ? 'disabled' : ' '} imp-input-text`} onClick={activeHandle} >{props.value}</div>
      }
    </div>
  );
}
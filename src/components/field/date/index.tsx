import { DatePicker } from 'antd';
import React, { Ref, useCallback, useMemo } from 'react';
import moment from 'moment';

import { FieldProps } from '../interface';
import { DatePickerProps } from 'antd/lib/date-picker';
import { parseValueToMoment } from '../../../utls';

export interface FieldDateProps extends FieldProps {
  placeholder?: string;
  format?: string;
  showTime?: boolean;
  picker?: DatePickerProps['picker'];
  onChange?: (date: moment.Moment, dateString?: string) => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  value: string;
  bordered?: boolean;
}


const FieldDate = ({ disabled, value, placeholder, mode, format = 'YYYY-MM-DD', fieldProps, picker, onChange, onOpenChange, open, bordered, showTime }: FieldDateProps, ref: Ref<any>) => {
  const innerOnChange = useCallback((date: moment.Moment, dateString: string) => {
    onChange && onChange(date, dateString);
  }, [onChange]);

  const innerValue = useMemo(() => parseValueToMoment(value, format), [format, value]);

  if (mode === 'read') {
    return <span ref={ref}>{moment(value).format(format) || '-'}</span>
  }
  if (mode === 'edit' || mode === 'update') {
    return <DatePicker
            ref={ref}
            value={innerValue}
            bordered={bordered}
            placeholder={placeholder}
            disabled={disabled}
            onChange={innerOnChange}
            picker={picker}
            open={open}
            onOpenChange={onOpenChange}
            showTime={showTime}
            {...fieldProps}
          />
  }
  return null;
}

export default React.forwardRef(FieldDate);

import React, { FC, useMemo } from 'react';
import { FieldMeta } from '../../types/interface';
import { FieldMode, FieldDate, FieldString, FieldText, FieldNumber, FieldSelect } from '../field';


export const FieldItem: FC<{ field: FieldMeta, mode: FieldMode, value: any }> = ({ field, mode = 'read', value }) => {
  const fieldItem = useMemo(() => {
    switch (field.type) {
      case 'string':
        return <FieldString mode={mode} value={value} />
      case 'text':
        return <FieldText mode={mode} value={value} />
      case 'number':
        return <FieldNumber mode={mode} value={value} />
      case 'date':
        return <FieldDate mode={mode} value={value} />
      case 'datetime':
        return <FieldDate mode={mode} value={value} format="YYYY-MM-DD HH:mm:ss" />
      case 'singleOption':
        return <FieldSelect mode={mode} value={value} options={field.options} />
      case 'businessObject':
        return <FieldString mode={mode} value={value[field.titleKey || 'id']} />
      default:
        return null;
    }
  }, [field, mode, value]);
  return fieldItem;
}

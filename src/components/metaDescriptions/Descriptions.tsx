import React, { FC, useMemo } from 'react';
import { Descriptions } from 'antd';
import { DescriptionsProps } from 'antd/lib/descriptions';
import { FieldMeta } from '../../types/interface';
import { FieldMode } from '../field';
import { FieldItem } from './FieldItem';

export type ItemMeta = FieldMeta &  {
  mode?: FieldMode;
}

export type MetaDescriptonsProps = DescriptionsProps & {
  fieldItemMetas: ItemMeta[];
  mode: FieldMode;
  data: Record<string, any>;
}


export const MetaDescriptons: FC<MetaDescriptonsProps> = ({ fieldItemMetas, mode, data, ...otherProps }) => {
  const fields = useMemo(() => {
    return fieldItemMetas.map(
      (field, idx) => 
        <Descriptions.Item key={idx} label={field.name}>
          <FieldItem field={field} mode={mode} value={data[field.key]} />
        </Descriptions.Item>
    )
  }, [data, fieldItemMetas, mode]);

  return <Descriptions {...otherProps} >
    {fields}
  </Descriptions>
}
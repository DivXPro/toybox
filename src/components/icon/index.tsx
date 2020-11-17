import React, { FC } from 'react';
import classNames from 'classnames'

export interface IconProps {
  name: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export const Icon: FC<IconProps> = ({ name, size = 'small', color = '#8c8c8c' }) => {
  return <i className={classNames('tbox-icon', name, `tbox-${size}`)} style={{ color }}/>
}
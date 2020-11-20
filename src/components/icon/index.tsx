import React, { FC } from 'react';
import classNames from 'classnames'

export interface IconProps {
  name: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
}

export const Icon: FC<IconProps> = ({ name, size = 'small', color, className }) => {
  return <i className={classNames('tbox-icon', name, `tbox-${size}`, className)} style={{ color }}/>
}
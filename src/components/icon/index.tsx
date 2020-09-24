import React, { FC } from 'react';
import classNames from 'classnames'

export interface IconProps {
  name: string;
  size?: 'small' | 'medium' | 'large';
}

export const Icon: FC<IconProps> = ({ name, size = 'small' }) => {
  return <i className={classNames('tbox-icon', name, `tbox-${size}`)} />
}
import React, { FC } from 'react';
import { Button } from 'antd';
import { ItemProps } from './interface';

export const PanelItem: FC<ItemProps> = ({ type, props, content }) => {
  switch (type) {
    case 'button':
      return <Button {...props}>{content}</Button>;
    default:
      return <React.Fragment>{content}</React.Fragment>;
  }
}
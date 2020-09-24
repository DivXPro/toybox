import React, { FC } from 'react';
import { Button, Tooltip } from 'antd';
import { ItemProps } from './interface';

export const PanelItem: FC<ItemProps> = ({ type, props, content }) => {
  switch (type) {
    case 'button':
      return <Button {...props}>{content}</Button>;
    case 'iconButton':
      return <Tooltip title={content}><Button {...props}>{content}</Button></Tooltip>
    default:
      return <React.Fragment>{content}</React.Fragment>;
  }
}
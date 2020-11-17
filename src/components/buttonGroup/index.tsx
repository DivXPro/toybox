import React, { FC } from 'react';
import { Button } from 'antd';
import { Icon } from '../icon';

export interface ButtonGroupProps {
  buttonItems: ButtonItem[];
}

export interface ButtonItem {
  text: string;
  icon?: string;
  color?: string;
  callback: (...args: any) => void;
}

export const ButtonGroup: FC<ButtonGroupProps> = ({ buttonItems }) => {
  return <React.Fragment>
    {
      buttonItems.map((item, idx) => <Button key={idx} onClick={item.callback} icon={ item.icon != null ? <Icon name={item.icon} /> : undefined}>{item.text}</Button>)
    }
  </React.Fragment>
}
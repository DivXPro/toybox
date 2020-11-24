import React, { FC, ReactNode } from 'react';
import { Button } from 'antd';

export interface ButtonGroupProps {
  buttonItems: ButtonItem[];
}

export interface ButtonItem {
  text: string;
  icon?: ReactNode;
  color?: string;
  callback: (...args: any) => void;
}

export const ButtonGroup: FC<ButtonGroupProps> = ({ buttonItems }) => {
  return <React.Fragment>
    {
      buttonItems.map(
        (item, idx) =>
          <Button
            key={idx}
            onClick={item.callback}
            icon={item.icon}
          >
            {item.text}
          </Button>
      )
    }
  </React.Fragment>
}
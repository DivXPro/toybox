import React, { FC, ReactNode } from 'react';
import { Button } from 'antd';
import { ButtonType, ButtonSize } from 'antd/lib/button';

export interface ButtonGroupProps {
  buttonItems: ButtonItem[];
}

export interface ButtonItem {
  text: string;
  icon?: ReactNode;
  color?: string;
  type?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
  callback: (...args: any) => void;
}

export const ButtonGroup: FC<ButtonGroupProps> = ({ buttonItems }) => {
  return <React.Fragment>
    {
      buttonItems.map(
        (item, idx) =>
          <Button
            key={idx}
            type={item.type}
            onClick={item.callback}
            icon={item.icon}
            size={item.size}
            disabled={item.disabled}
          >
            {item.text}
          </Button>
      )
    }
  </React.Fragment>
}
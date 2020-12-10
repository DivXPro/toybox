import React, { FC, ReactNode, useMemo } from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { MoreFill } from '@airclass/icons';

export interface DropdownMenuProps {
  items: MenuItem[];
}

export interface MenuItem {
  text: ReactNode;
  icon?: ReactNode;
  color?: string;
  danger?: boolean;
  disabled?: boolean;
  callback: (...args: any) => void;
}

export const DropdownMenu: FC<DropdownMenuProps> = ({ items, children }) => {
  const menu = useMemo(() => {
    return <Menu>
      {
        items.map((item, idx) =>
          <Menu.Item
            key={idx}
            onClick={item.callback}
            icon={item.icon}
            disabled={item.disabled}
            danger={item.danger}
          >
            {item.text}
          </Menu.Item>)
      }
    </Menu>
  }, [items]);

  return <Dropdown overlay={menu}>
    {children || <Button type="text"><MoreFill /></Button>}
  </Dropdown>
}
import React, { FC } from 'react';
import { PanelItemProps } from './interface';
import { DropdownMenu, DropdownMenuProps } from '../dropdownMenu';
import { ButtonGroup, ButtonGroupProps } from '../buttonGroup';

export const PanelItem: FC<PanelItemProps> = ({ type, props, content }) => {
  switch (type) {
    case 'button':
      return <ButtonGroup items={(props as ButtonGroupProps).items} />
    case 'dropdownMenu':
      return <DropdownMenu {...props as DropdownMenuProps}>{content}</DropdownMenu>
    default:
      return <React.Fragment>{content}</React.Fragment>;
  }
}
import { ReactNode } from 'react';
import { ButtonGroupProps } from '../buttonGroup';
import { DropdownMenuProps } from '../dropdownMenu';


export type PanelItemType = 'button' | 'dropdownMenu' | undefined;

export type PanelItemProps = {
  type?: string;
  content?: ReactNode;
  props?: ButtonGroupProps | DropdownMenuProps | Record<string, any>;
}

export interface PanelProps {
  left?: ReactNode;
  right?: ReactNode;
}

import React, { FC, ReactNode, useMemo } from 'react'
import { Button } from 'antd'

export interface PanelProps {
  left?: ReactNode;
  right?: ItemType[];
}

export type ItemType = ButtonItemType | ComponentItemType;

export interface ButtonItemType {
  type: 'button';
  content: string;
  props?: { [key: string]: any };
  callback: () => void;
}

export interface ComponentItemType {
  type: 'component';
  content: ReactNode;
}

export const Panel: FC<PanelProps> = ({ left, right }) => {
  const rightRender = useMemo(() =>
    (right || []).map((item, idx) => {
      if (item.type === 'button') {
        return <Button key={idx} onClick={item.callback} {...item.props}>{item.content}</Button>
      } else if (item.type === 'component') {
        return (item as ComponentItemType).content
      }
      return null
    }), [right])

  return (
    <div className='tbox-panel'>
      <div className='tbox-panel--left'>{left}</div>
      <div className='tbox-panel--right'>
        {rightRender}
      </div>
    </div>
  )
}

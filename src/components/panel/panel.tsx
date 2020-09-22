import React, { FC, ReactNode, useMemo } from 'react'
import { ItemProps } from './interface'
import { PanelItem } from './panelItem'

export interface PanelProps {
  left?: ReactNode;
  right?: ItemProps[];
}

export const Panel: FC<PanelProps> = ({ left, right }) => {
  const rightRender = useMemo(() =>
    (right || []).map((item, idx) => {
      return <PanelItem key={idx} {...item} />;
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

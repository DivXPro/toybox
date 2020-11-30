import React, { FC, ReactNode } from 'react'

export interface PanelProps {
  left?: ReactNode;
  right?: ReactNode;
}

export const Panel: FC<PanelProps> = ({ left, right }) => {
  return (
    <div className='tbox-panel'>
      <div className='tbox-panel--left'>{left}</div>
      <div className='tbox-panel--right'>{right}</div>
    </div>
  )
}

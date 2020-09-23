import React, { FC, ReactNode } from 'react'

export interface PanelProps {
  leftRender?: ReactNode;
  rightRender?: ReactNode;
}

export const Panel: FC<PanelProps> = ({ leftRender, rightRender }) => {
  return (
    <div className='tbox-panel'>
      <div className='tbox-panel--left'>{leftRender}</div>
      <div className='tbox-panel--right'>
        {rightRender}
      </div>
    </div>
  )
}

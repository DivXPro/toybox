import React, { FC, ReactNode } from 'react';

export interface HeaderProps {
  brand?: ReactNode;
  content?: ReactNode;
  rightRender?: ReactNode;
}

export const ProHeader: FC<HeaderProps> = ({ brand, content, rightRender }) => {
  return <div id="header" className='tbox-header'>
    <div className='tbox-header--brand'>{brand}</div>
    <div className='tbox-header--content'>{content}</div>
    <div className='tbox-header--right'>{rightRender}</div>
  </div>
}
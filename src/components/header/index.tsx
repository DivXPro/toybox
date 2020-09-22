import React, { FC, ReactNode } from 'react';

export interface HeaderProps {
  title: string;
  content?: ReactNode;
}

export const Header: FC<HeaderProps> = ({ title, content }) => {
  return <div className='tbox-header'>
    <div className='tbox-header--title'>{title}</div>
    <div className='tbox-header--content'>{content}</div>
  </div>
}
import React, { FC, ReactNode } from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

export interface HeaderProps {
  brand?: ReactNode;
  content?: ReactNode;
  rightRender?: ReactNode;
}

export const ProHeader: FC<HeaderProps> = ({ brand, content, rightRender }) => {
  return <Header className='tbox-header'>
    <div className='tbox-header--brand'>{brand}</div>
    <div className='tbox-header--content'>{content}</div>
    <div className='tbox-header--right'>{rightRender}</div>
  </Header>
}
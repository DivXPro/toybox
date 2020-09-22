import React, { FC } from 'react';
import { Spin } from 'antd';

export const LoadingWrapper: FC = () => {
  return (
    <div className="loading-wrapper">
      <Spin />
    </div>
  );
}

import React, { FC } from 'react';
import { Spin } from 'antd';


export interface LoadingWrapperProps {
  size?: 'small' | 'default' | 'large';
  loading: boolean;
}

export const LoadingWrapper: FC<LoadingWrapperProps> = ({ size, loading, children }) => {
  return (
    <React.Fragment>
      {
        loading
          ?
          <div className="loading-wrapper">
            <Spin size={size} />
          </div>
          : children
      }
    </React.Fragment>
  );
}

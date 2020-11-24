import React, { FC, ReactNode } from 'react';
import { Badge } from 'antd';
import classNames from 'classnames';
import { Notification4Line } from '@airclass/icons';


export type InboxBadgeProps = {
  className?: string;
  style?: Record<string, any>;
  icon?: ReactNode;
  count: number;
};

export const InboxBadge: FC<InboxBadgeProps> = ({ count, style, className, icon }) => {
  return (
    <div className={classNames('tbox-inbox-badge', className)} style={style}>
      <Badge count={count}>
        {icon || <Notification4Line />}
      </Badge>
    </div>
  );
}
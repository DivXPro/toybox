import React, { FC, ReactNode, useState, useEffect, useCallback } from 'react';
import { Badge } from 'antd';
import { Icon } from '../icon';

const INTERVAL_TIME = 10000;

export type InboxBadgeProps = {
  className?: string;
  style?: Record<string, any>;
  loadBadge: (nowTotal?: number) => Promise<number>;
  icon?: ReactNode;
  intervalTime?: number;
  value?: number;
};

export const InboxBadge: FC<InboxBadgeProps> = ({ loadBadge, style, className, icon, intervalTime = INTERVAL_TIME, value = 0 }) => {
  const [unreadCount, setUnreadCount] = useState(value);
  const reLoadBadge = useCallback(async () => {
    try {
      const count = await loadBadge(unreadCount);
      setUnreadCount(count);
    } catch (error) {
      reLoadBadge();
    }
  }, [loadBadge, unreadCount]);

  useEffect(() => {
    reLoadBadge();
    const interval = setInterval(reLoadBadge, intervalTime);
    return () => {
      clearInterval(interval);
    }
  }, [reLoadBadge, intervalTime]);

  return (
    <div className={className} style={style}>
      <Badge count={unreadCount}>
        {icon || <Icon name="ri-notification-4-line" size="large" />}
      </Badge>
    </div>
  );
}
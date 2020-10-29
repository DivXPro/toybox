import React, { FC, ReactNode, useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { Badge, Popover } from 'antd';
import { TooltipPlacement } from 'antd/lib/tooltip';
import { Inbox, InboxProps } from './Inbox';
import { Icon } from '../icon';

export type InboxButtonProps = InboxProps & {
  placement?: TooltipPlacement;
  className?: string;
  style?: Record<string, any>;
  loadBadge: () => Promise<number>;
  icon?: ReactNode;
  interval?: number;
};

export const InboxButton: FC<InboxButtonProps> = ({ remove, read, loadMore, reload, loadBadge, style, className, placement, bundle, icon, interval = 10000 }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  const reLoadBadge = useCallback(async () => {
    try {
      const count = await loadBadge();
      setUnreadCount(count);
    } catch (error) {
      reLoadBadge();
    }
  }, [loadBadge]);

  useEffect(() => {
    reLoadBadge();
    setInterval(reLoadBadge, interval);
  }, [reLoadBadge, interval]);

  const handleRead = useCallback(async (id: string) => {
    await read(id);
    reLoadBadge();
  }, [reLoadBadge, read]);

  return (
    <Popover placement={placement}
      destroyTooltipOnHide={true}
      overlayClassName="popover-no-padding popover-no-arrow"
      content={<Inbox read={handleRead} remove={remove} onPick={() => undefined} loadMore={loadMore} reload={reload} bundle={bundle} />}
      trigger="click"
    >
      <div className={classNames('inbox-button', className)} style={style}>
        <Badge count={unreadCount}>
          { icon || <Icon name="ri-notification-4-line" size="large" />}
        </Badge>
      </div>
    </Popover>
  );
}
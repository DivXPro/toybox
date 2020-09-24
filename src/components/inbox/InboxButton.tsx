import React, { FC, useState, useEffect } from 'react';
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
};

export const InboxButton: FC<InboxButtonProps> = ({ loadMore, reload, loadBadge, style, className, placement }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  useEffect(() => {
    const reLoadBadge = async () => {
      try {
        const count = await loadBadge();
        setUnreadCount(count);
      } catch (error) {
        reLoadBadge();
      }
    }
    reLoadBadge();
  }, [loadBadge]);

  return (
    <Popover placement={placement}
      overlayClassName="popover-no-padding"
      content={<Inbox onPick={() => undefined} loadMore={loadMore} reload={reload} />}
      trigger="click"
    >
      <div className={classNames('inbox-button', className)} style={style}>
        <Badge count={unreadCount}>
          <Icon name="ri-notification-4-line" />
        </Badge>
      </div>
    </Popover>
  );
}
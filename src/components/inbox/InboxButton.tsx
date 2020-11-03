import React, { FC, ReactNode, useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { Popover } from 'antd';
import { TooltipPlacement } from 'antd/lib/tooltip';
import { Inbox, InboxProps } from './Inbox';
import { InboxBadge } from './InboxBadge';

export type InboxButtonProps = InboxProps & {
  placement?: TooltipPlacement;
  className?: string;
  style?: Record<string, any>;
  loadBadge: () => Promise<number>;
  icon?: ReactNode;
  intervalTime?: number;
};

export const InboxButton: FC<InboxButtonProps> = ({ remove, read, loadMore, reload, loadBadge, style, className, placement, bundle, icon, intervalTime = 10000 }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const reLoadBadge = useCallback(async () => {
    try {
      const count = await loadBadge();
      setUnreadCount(count);
    } catch (error) {
      reLoadBadge();
    }
  }, [loadBadge]);

  const handleRead = useCallback(async (id: string) => {
    await read(id);
    reLoadBadge();
  }, [reLoadBadge, read]);

  return (
    <Popover
      placement={placement}
      destroyTooltipOnHide={true}
      overlayClassName="popover-no-padding popover-no-arrow"
      content={
        <Inbox
          read={handleRead}
          remove={remove}
          onPick={() => undefined}
          loadMore={loadMore}
          reload={reload}
          bundle={bundle}
        />
      }
      trigger="click"
    >
      <InboxBadge
        className={classNames('inbox-button', className)}
        style={style}
        loadBadge={loadBadge}
        value={unreadCount}
      />
    </Popover>
  );
}
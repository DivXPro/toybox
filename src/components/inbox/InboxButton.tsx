import React, { FC, ReactNode, useCallback } from 'react';
import classNames from 'classnames';
import { Popover } from 'antd';
import { TooltipPlacement } from 'antd/lib/tooltip';
import { Inbox, InboxProps } from './Inbox';
import { InboxBadge } from './InboxBadge';

export type InboxButtonProps = InboxProps & {
  placement?: TooltipPlacement;
  className?: string;
  style?: Record<string, any>;
  badge: number;
  icon?: ReactNode;
  intervalTime?: number;
};

export const InboxButton: FC<InboxButtonProps> = ({
  remove,
  read,
  loadMore,
  reload,
  badge,
  style,
  className,
  placement,
  bundle,
  icon,
  intervalTime = 10000
}) => {
  const handleRead = useCallback(async (id: string) => {
    await read(id);
  }, [read]);

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
        icon={icon}
        intervalTime={intervalTime}
        className={classNames('inbox-button', className)}
        style={style}
        badge={badge}
      />
    </Popover>
  );
}
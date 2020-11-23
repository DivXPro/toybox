import React, { FC, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { Icon } from '../icon';
import { Time } from '../time';
import { Badge } from 'antd';

export interface NotificationMessage {
  id: string;
  title: string;
  content: string;
  link: string;
  userId: string;
  creator: {
    userId: string;
    avatarUrl: string;
    name: string;
    isSystem: boolean;
  };
  type: string;
  icon: string;
  createdAt: Date | string | number;
  updatedAt: Date | string | number;
  haveRead: boolean;
  mode: 'link' | 'view';
  props?: Record<string, any>;
  badge?: number;
  appId?: string;
}

export interface NotificationProps {
  message: NotificationMessage;
  remove: (id: string) => void;
  read: (id: string) => void;
  onPick: (message: NotificationMessage) => void;
  selected?: boolean;
  style?: any;
}

export const Notification: FC<NotificationProps> = ({ message, remove, read, onPick, style, selected = false }) => {
  const handleClick = useCallback(() => {
    onPick(message);
  }, [message, onPick]);

  const handleRemove = useCallback(() => {
    if (typeof remove === 'function') {
      remove(message.id);
    }
  }, [message.id, remove]);

  const handleRead = useCallback(() => {
    if (!message.haveRead && typeof read === 'function') {
      read(message.id);
    }
  }, [message.haveRead, message.id, read]);

  const operate = useMemo(() => {
    return (
      <div className="notification-operate">
        {
          message.haveRead
            ? null
            :
            <div className="notification-operate--item" onClick={handleRead} key="read">
              <Icon name="ri-check-double-line" size="medium" />
            </div>
        }
        <div className="notification-operate--item" onClick={handleRemove} key="remove">
          <Icon name="ri-close-line" size="medium" />
        </div>
      </div>
    )
  }, [handleRead, handleRemove, message.haveRead]);

  const badgeItem = useMemo(() => {
    if (message.haveRead) {
      return null;
    }
    return <Badge className="notification-not-read" count={message.badge} dot={message.badge == null} />
  }, [message.badge, message.haveRead]);

  return (
    <div className={classNames('tbox-notification', { selected })} style={style}>
      <div className="notification-header">
        <div className="notification-type">{message.type}</div>
        { operate }
        { badgeItem }
      </div>
      <div className="notification-body" onClick={handleClick}>
        <p>{message.content}</p>
        <Time time={message.createdAt} />
      </div>
    </div>
  )
}
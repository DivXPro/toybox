import React, { FC, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
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
  viewProps?: any;
  badge?: number;
}

export interface NotificationProps {
  message: NotificationMessage;
  remove: (id: string) => void;
  read: (id: string) => void;
  onPick: (message?: NotificationMessage) => void;
  style?: any;
}

function isAbsolutePath(path: string) {
  return /^([a-zA-Z]*):\/\/[^\s]+/.test(path);
}

export const Notification: FC<NotificationProps> = ({ message, remove, read, onPick, style }) => {
  const history = useHistory();
  const isAbsolute = useMemo(() => isAbsolutePath(message?.link), [message]);
  const handleClick = useCallback(() => {
    onPick(message);
    if (message?.link == null || message.mode !== 'link') {
      return;
    }
    if (isAbsolute) {
      window.open(message.link, '_target');
    } else {
      history.push(message.link);
    }
  }, [history, isAbsolute, message, onPick]);

  const handleRemove = useCallback(() => {
    if (typeof remove === 'function') {
      remove(message.id);
    }
  }, [message.id, remove]);

  const handleRead = useCallback(() => {
    if (typeof read === 'function') {
      read(message.id);
    }
  }, [message.id, read]);

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
    if (message.badge != null && message.badge > 0) {
      return <Badge count={message.badge} />
    }
    return <div className="notification-not-read" />;
  }, [message.badge, message.haveRead]);

  return (
    <div className="tbox-notification" style={style}>
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
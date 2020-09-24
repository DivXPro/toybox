import React, { FC, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router';
import { Icon } from '../icon';

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
}

export interface NotificationProps {
  message: NotificationMessage;
  remove: (id: string) => void;
  read: (id: string) => void;
  onPick: () => void;
  style?: any;
}

function isAbsolutePath(path: string) {
  return /^([a-zA-Z]*):\/\/[^\s]+/.test(path);
}

export const Notification: FC<NotificationProps> = ({ message, remove, read, onPick, style }) => {
  const history = useHistory();
  const handleClick = useCallback(() => {
    onPick();
    if (message?.link == null) {
      return;
    }
    history.push(message.link);
  }, [history, message, onPick]);

  const isAbsolute = useMemo(() => isAbsolutePath(message?.link), [message]);

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

  return (
    <div className="tbox-notification" style={style}>
      <div className="notification-header">
        <div className="notification-type">{message.type}</div>
        <div className="notification-operate">
          {
            message.haveRead
              ? null
              :
              <div className="notification-operate--item" onClick={handleRead} key="read">
                <Icon name="ri-check-double-line" />
              </div>
          }
          <div className="notification-operate--item" onClick={handleRemove} key="remove">
            <Icon name="ri-close-line" />
          </div>
        </div>
        {message.haveRead ? null : <div className="notification-not-read" />}
      </div>
      {
        isAbsolute
          ?
            <div className="notification-body" onClick={handleClick}>
              {message.content}
            </div>
          : <a className="notification-body" href={message.link} target="_blank" rel="noreferrer">{message.content}</a>
      }
    </div>
  )
}
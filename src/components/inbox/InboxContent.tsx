import React, { FC, useMemo, useState, useRef, useCallback } from 'react';
import { Empty } from 'antd';
import { FixedSizeList as List } from 'react-window';
import { useSize } from 'ahooks';
import { Notification, NotificationMessage } from './Notification';


export interface InboxContentProps {
  onPick: () => void;
}
export const InboxContent: FC<InboxContentProps> = ({ onPick }) => {
  const [notifications, setNotifications] = useState<NotificationMessage[]>([
    {
      id: '1233456',
      title: '普通通知',
      content: '请去看一下员工花名册',
      link: '/users',
      userId: 'string',
      creator: {
        userId: 'string',
        avatarUrl: 'string',
        name: 'string',
        isSystem: true,
      },
      type: 'Core',
      icon: 'core',
      createdAt: new Date(),
      updatedAt: new Date(),
      haveRead: false,
    }
  ]);
  const ref = useRef<HTMLDivElement>(null);
  const size = useSize(ref);
  const handleRemove = useCallback((id: string) => {
    const idx = notifications.findIndex(n => n.id === id);
    if (idx > -1) {
      setNotifications(notifications.filter(n => n.id !== id));
    }
  }, [notifications, setNotifications]);

  const handleRead = useCallback((id: string) => {
    const idx = notifications.findIndex(n => n.id === id);
    if (idx > -1) {
      setNotifications(notifications.map((n, i) => {
        if (i === idx) {
          n.haveRead = true;
        }
        return n;
      }));
    }
  }, [notifications, setNotifications]);

  const list = useMemo(() => {
    if (notifications != null && notifications.length > 0) {
      return (
        <List
          height={size?.height || 400}
          width={size.width || 240}
          itemCount={notifications.length}
          itemSize={100}
        >
          {
            ({ index }) => <Notification onPick={onPick} message={notifications[index]} remove={handleRemove} read={handleRead} key={index} />
          }
        </List>
      );
    }
    return <div style={{ marginTop: '50px', marginBottom: '50px' }}><Empty description="没发现消息通知" /></div>
  }, [handleRemove, handleRead, notifications, size, onPick]);

  return (
    <div className="inbox-content" ref={ref}>
      {list}
    </div>
  );
}
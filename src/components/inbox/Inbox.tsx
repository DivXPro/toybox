import React, { FC, useState, useCallback, useMemo } from 'react';
import { Badge, Button } from 'antd';
import classNames from 'classnames';
import { MoreFill, CheckDoubleFill, DeleteBinLine } from '@airclass/icons';
import { InboxContent } from './InboxContent';
import { NotificationMessage } from './Notification';
import { DropdownMenu } from '../dropdownMenu';

export interface InboxProps {
  badge: number;
  messages?: NotificationMessage[];
  loading?: boolean;
  hasMore: boolean;
  onPick: (message: NotificationMessage) => void;
  read: (id: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
  loadMore: (unread: boolean, offset: number, timestamp: number, type?: string) => void;
  reload: (unread: boolean, type?: string) => void;
  readAll?: () => Promise<void>;
  removeAll?: () => Promise<void>;
}

export const Inbox: FC<InboxProps> = ({ badge, messages, loading, hasMore, onPick, reload, loadMore, remove, read, readAll, removeAll }) => {
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(new Date().getTime());
  const [unRead, setUnread] = useState(false);
  const [selectedId, setSelectedId] = useState<string | number>();

  const reloadMsgs = useCallback((isUnread: boolean) => {
    setUnread(isUnread);
    reload(isUnread);
  }, [reload]); 

  const handleLoadMore = useCallback(async (offset: number) => {
    if (messages == null  || messages.length === 0) {
      reload(unRead);
    } else {
      setCurrentTimestamp(new Date().getTime());
      loadMore(unRead, offset, currentTimestamp);
    }
  }, [messages, reload, unRead, loadMore, currentTimestamp]);

  const handleRemove = useCallback((id: string) => {
    remove(id);
  }, [remove]);

  const handleRead = useCallback((id: string) => {
    const idx = (messages || []).findIndex(msg => msg.id === id && !msg.haveRead);
    if (idx > -1) {
      read(id);
    }
  }, [messages, read]);

  const handlePick = useCallback((message: NotificationMessage) => {
    setSelectedId(message.id);
    onPick(message);
    handleRead(message.id);
  }, [handleRead, onPick]);

  const showMessages = useMemo(() => unRead ? (messages || []).filter(msg => !msg.haveRead) : messages, [messages, unRead])
  const menuItems = useMemo(() => (
    [
      {
        text: '标记所有消息为已读',
        icon: <CheckDoubleFill />,
        callback: () => readAll && readAll(),
      },
      {
        text: '删除所有已读消息',
        icon: <DeleteBinLine />,
        danger: true,
        callback: () => removeAll && removeAll(),
      }
    ]
  ), [readAll, removeAll]);

  const InBoxPanel = () => {
    return <div className="tbox-inbox-panel">
      <div className="inbox-panel--tabs">
        <div className={classNames('inbox-panel--tab', { active: !unRead })} onClick={() => reloadMsgs(false)}>
          <span>全部</span>
          <Badge count={badge} />
        </div>
        <div className={classNames('inbox-panel--tab', { active: unRead })} onClick={() => reloadMsgs(true)}>
          <span>未读</span>
        </div>
      </div>
      <DropdownMenu items={menuItems} placement="bottomRight">
        <Button type="text" icon={<MoreFill />} />
      </DropdownMenu>
    </div>;
  };

  return (
    <div className="tbox-inbox">
      <InBoxPanel />
      <InboxContent
        onPick={handlePick}
        messages={showMessages}
        loadMore={handleLoadMore}
        hasMore={hasMore}
        loading={loading}
        remove={handleRemove}
        selectedId={selectedId}
        read={handleRead}
      />
    </div>
  );
}
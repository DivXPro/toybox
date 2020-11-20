import React, { FC, useState, useCallback } from 'react';
import classNames from 'classnames';
import { InboxContent } from './InboxContent';
import { NotificationMessage } from './Notification';
import { Badge } from 'antd';

export interface InboxProps {
  badge: number;
  onPick: (message: NotificationMessage) => void;
  read: (id: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
  messages: NotificationMessage[];
  hasMore: boolean;
  loadMore: (unread: boolean, offset: number, timestamp: number, type?: string) => void;
  reload: (unread: boolean, type?: string) => void;
}

export const Inbox: FC<InboxProps> = ({ badge, messages, hasMore, onPick, reload, loadMore, remove, read }) => {
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(new Date().getTime());
  const [unRead, setUnread] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedId, setSelectedId] = useState<string | number>();

  const reloadMsgs = useCallback((isUnread: boolean) => {
    setLoading(true);
    setUnread(isUnread);
    reload(isUnread);
  }, [reload]); 

  const handleLoadMore = useCallback(async (offset: number) => {
    if (messages.length === 0) {
      setLoading(true);
      reload(unRead);
      setLoading(false);
    } else {
      setCurrentTimestamp(new Date().getTime());
      setLoading(true);
      loadMore(unRead, offset, currentTimestamp);
      setLoading(false);
    }
  }, [messages.length, reload, unRead, loadMore, currentTimestamp]);

  const handleRemove = useCallback((id: string) => {
    remove(id);
  }, [remove]);

  const handleRead = useCallback((id: string) => {
    const idx = messages.findIndex(msg => msg.id === id);
    if (idx > -1) {
      read(id);
    }
  }, [messages, read]);

  const handlePick = useCallback((message: NotificationMessage) => {
    setSelectedId(message.id);
    onPick(message);
    handleRead(message.id);
  }, [handleRead, onPick]);

  const InBoxPanel = () => {
    return <div className="tbox-inbox-panel">
      <div className={classNames('inbox-panel--tab', { active: !unRead })} onClick={() => reloadMsgs(false)}>
        <span>全部</span>
        <Badge count={badge} />
      </div>
      <div className={classNames('inbox-panel--tab', { active: unRead })} onClick={() => reloadMsgs(true)}>
        <span>未读</span>
      </div>
    </div>;
  };

  return (
    <div className="tbox-inbox">
      <InBoxPanel />
      <InboxContent
        onPick={handlePick}
        messages={messages}
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
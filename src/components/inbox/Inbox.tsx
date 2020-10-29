import React, { FC, useState, useCallback } from 'react';
import classNames from 'classnames';
import update from 'immutability-helper';
import { InboxContent } from './InboxContent';
import { NotificationMessage } from './Notification';

export interface InboxProps {
  bundle?: number;
  onPick: () => void;
  read: (id: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
  loadMore: (unread: boolean, offset: number, limit: number, timestamp: number, type?: string) => Promise<NotificationMessage[]>;
  reload: (unread: boolean, limit: number, type?: string) => Promise<NotificationMessage[]>;
}

const DEFAULT_BUNDLE = 10;

export const Inbox: FC<InboxProps> = ({ bundle = DEFAULT_BUNDLE, onPick, reload, loadMore, remove, read }) => {
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(new Date().getTime());
  const [unRead, setUnread] = useState(false);
  const [messages, setMessages] = useState<NotificationMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const reloadMsgs = useCallback((isUnread: boolean) => {
    setLoading(true);
    setMessages([]);
    setUnread(isUnread);
    reload(isUnread, bundle).then((msgs) => {
      setHasMore(msgs.length == bundle);
      setLoading(false);
      setMessages(msgs);
    });
  }, [bundle, reload]); 

  const handleLoadMore = useCallback(async (offset: number, limit = bundle) => {
    if (messages.length === 0) {
      setLoading(true);
      const msgs = await reload(unRead, bundle);
      setHasMore(msgs.length == bundle);
      setLoading(false);
      setMessages(msgs);
    } else {
      setCurrentTimestamp(new Date().getTime());
      setLoading(true);
      const msgs = await loadMore(unRead, offset, limit, currentTimestamp);
      setHasMore(msgs.length == bundle);
      setLoading(false);
      setMessages([...messages].concat(msgs));
    }
  }, [bundle, messages, reload, unRead, loadMore, currentTimestamp]);

  const handleRemove = useCallback((id: string) => {
    setMessages(messages.filter(msg => msg.id !== id))
    remove(id);
  }, [messages, remove]);

  const handleRead = useCallback((id: string) => {
    const idx = messages.findIndex(msg => msg.id === id);
    if (idx > -1) {
      setMessages(update(messages, { [idx]: { haveRead: { $set: true } }}));
      if (unRead) {
        setMessages(messages.filter(msg => msg.id !== id))
      }
      read(id);
    }
  }, [messages, read, unRead]);

  const InBoxPanel = () => {
    return <div className="tbox-inbox-panel">
      <div className={classNames('inbox-panel--tab', { active: !unRead })} onClick={() => reloadMsgs(false)}>全部</div>
      <div className={classNames('inbox-panel--tab', { active: unRead })} onClick={() => reloadMsgs(true)}>未读</div>
    </div>;
  };

  return (
    <div className="tbox-inbox">
      <InBoxPanel />
      <InboxContent
        onPick={onPick}
        messages={messages}
        loadMore={handleLoadMore}
        hasMore={hasMore}
        loading={loading}
        remove={handleRemove}
        read={handleRead}
      />
    </div>
  );
}
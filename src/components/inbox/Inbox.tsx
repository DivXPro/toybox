import React, { FC, useState, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { InboxContent } from './InboxContent';
import { NotificationMessage } from './Notification';

export interface InboxProps {
  bundle?: number;
  onPick: () => void;
  loadMore: (unread: boolean, offset: number, limit: number, timestamp: number, type?: string) => Promise<NotificationMessage[]>;
  reload: (unread: boolean, limit: number, type?: string) => Promise<NotificationMessage[]>;
}

const DEFAULT_BUNDLE = 6;

export const Inbox: FC<InboxProps> = ({ bundle = DEFAULT_BUNDLE, onPick, reload, loadMore }) => {
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(new Date().getTime());
  const [unRead, setUnread] = useState(false);
  const [messages, setMessages] = useState<NotificationMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const reloadMsgs = useCallback((unread: boolean) => {
    setLoading(true);
    setMessages([]);
    setUnread(unread);
    reload(unRead, bundle).then((msgs) => {
      setHasMore(msgs.length == bundle);
      setLoading(false);
      setMessages(msgs);
    });
  }, [bundle, reload, unRead]); 

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

  const InBoxPanel = () => {
    return <div className="tbox-inbox-panel">
      <div className={classNames('inbox-panel--tab', { active: !unRead })} onClick={() => reloadMsgs(false)}>全部</div>
      <div className={classNames('inbox-panel--tab', { active: unRead })} onClick={() => reloadMsgs(true)}>未读</div>
    </div>;
  };

  return (
    <div className="tbox-inbox">
      <InBoxPanel />
      <InboxContent onPick={onPick} messages={messages} loadMore={handleLoadMore} hasMore={hasMore} loading={loading}/>
    </div>
  );
}
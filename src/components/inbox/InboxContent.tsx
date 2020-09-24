import React, { FC, useMemo, useState, useCallback } from 'react';
import { Empty } from 'antd';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { Notification, NotificationMessage } from './Notification';


export interface InboxContentProps {
  onPick: () => void;
  loading?: boolean;
  hasMore: boolean;
  messages: NotificationMessage[];
  loadMore: (offset: number, limit: number) => Promise<any>;
}
export const InboxContent: FC<InboxContentProps> = ({ loading = false, hasMore, onPick, messages = [], loadMore }) => {
  const [notifications, setNotifications] = useState<NotificationMessage[]>(messages);
  const isItemLoaded = useCallback((index: number) => !hasMore || index < messages.length, [hasMore, messages.length]);
  const itemCount = useMemo(() => hasMore ? messages.length + 1 : messages.length, [hasMore, messages.length]);

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

  const Item = useCallback(({index, style} : { index: number, style: any}) => {
    if (isItemLoaded(index)) {
      return <Notification style={style} onPick={onPick} message={messages[index]} remove={handleRemove} read={handleRead} key={index} />
    }
    return <div style={style}></div>
  }, [handleRead, handleRemove, isItemLoaded, messages, onPick])

  const loadMoreItems = useCallback((start: number, stop: number) => {
    if (!loading) {
      return loadMore(start, stop);
    }
    return null;
  }, [loadMore, loading]);

  const list = useMemo(() => {
    return (
      <React.Fragment>
        <InfiniteLoader isItemLoaded={isItemLoaded} itemCount={itemCount} loadMoreItems={loadMoreItems}>
          {
            ({onItemsRendered, ref}) => (
              <List
                ref={ref}
                onItemsRendered={onItemsRendered}
                height={400}
                width={360}
                itemSize={100}
                itemCount={itemCount}
              >
                {Item}
              </List>
            )
          }
        </InfiniteLoader>
        { (messages == null || messages.length === 0) ? <div style={{ marginTop: '50px', marginBottom: '50px' }}><Empty description="没发现消息通知" /></div> : null }
      </React.Fragment>
    );
  }, [isItemLoaded, itemCount, loadMoreItems, messages, Item]);

  return (
    <div className="tbox-inbox-content">
      {list}
    </div>
  );
}
import React, { FC, useMemo, useCallback } from 'react';
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
  remove: (id: string) => void;
  read: (id: string) => void;
}
export const InboxContent: FC<InboxContentProps> = ({ loading = false, hasMore, onPick, messages = [], loadMore, read, remove }) => {
  const isItemLoaded = useCallback((index: number) => !hasMore || index < messages.length, [hasMore, messages.length]);
  const itemCount = useMemo(() => hasMore ? messages.length + 1 : messages.length, [hasMore, messages.length]);

  const Item = useCallback(({index, style} : { index: number, style: any}) => {
    if (isItemLoaded(index)) {
      return <Notification style={style} onPick={onPick} message={messages[index]} remove={remove} read={read} key={index} />
    }
    return <div style={style}></div>
  }, [read, remove, isItemLoaded, messages, onPick])

  const loadMoreItems = useCallback((start: number, stop: number) => {
    if (!loading) {
      return loadMore(start, stop);
    }
    return null;
  }, [loadMore, loading]);

  const isEmpty = useMemo(() => {
    return (messages == null || messages.length === 0) && !loading
  }, [loading, messages]);

  const messageList = useMemo(() => {
    return (
      <React.Fragment>
        <div style={isEmpty ? {display: 'none'} : undefined}>
          <InfiniteLoader isItemLoaded={isItemLoaded} itemCount={itemCount} loadMoreItems={loadMoreItems}>
            {
              ({ onItemsRendered, ref }) => (
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
        </div>
        {isEmpty ? <div style={{ paddingTop: '60px', }}><Empty description="没发现消息通知" /></div> : null}
      </React.Fragment>
    );
  }, [isEmpty, isItemLoaded, itemCount, loadMoreItems, Item]);

  return (
    <div className="tbox-inbox-content">
      {messageList}
    </div>
  );
}
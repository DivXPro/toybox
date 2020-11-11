import React, { FC, useMemo, useCallback, useRef } from 'react';
import { Empty } from 'antd';
import { useSize } from 'ahooks';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { Notification, NotificationMessage } from './Notification';


const WIDTH = 360;
const HEIGHT = 400;
const ITEM_HEIGHT = 124;

export interface InboxContentProps {
  onPick: (message?: NotificationMessage) => void;
  loading?: boolean;
  hasMore: boolean;
  messages: NotificationMessage[];
  selectedId?: string | number;
  loadMore: (offset: number, limit: number) => Promise<any>;
  remove: (id: string) => void;
  read: (id: string) => void;
}

export const InboxContent: FC<InboxContentProps> = ({ loading = false, hasMore, onPick, messages = [], selectedId, loadMore, read, remove }) => {
  const ref = useRef<any>();
  const size = useSize(ref);
  const isItemLoaded = useCallback((index: number) => !hasMore || index < messages.length, [hasMore, messages.length]);
  const itemCount = useMemo(() => hasMore ? messages.length + 1 : messages.length, [hasMore, messages.length]);

  const Item = useCallback(({index, style} : { index: number, style: any}) => {
    if (isItemLoaded(index)) {
      return (
        <Notification
          key={index}
          style={style}
          onPick={onPick}
          selected={messages[index].id === selectedId}
          message={messages[index]}
          remove={remove}
          read={read}
        />
      )
    }
    return <div style={style}></div>
  }, [isItemLoaded, onPick, messages, selectedId, remove, read])

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
                  height={size.height || HEIGHT}
                  width={size.width || WIDTH}
                  itemSize={ITEM_HEIGHT}
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
  }, [isEmpty, isItemLoaded, itemCount, loadMoreItems, size.height, size.width, Item]);

  return (
    <div className="tbox-inbox-content" ref={ref} >
      {messageList}
    </div>
  );
}
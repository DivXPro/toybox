import React, { FC, useMemo, useCallback, useRef, useEffect } from 'react';
import { Empty } from 'antd';
import { useSize, useScroll, useThrottleFn } from 'ahooks';
// import { FixedSizeList as List } from 'react-window';
// import InfiniteLoader from 'react-window-infinite-loader';
import { Notification, NotificationMessage } from './Notification';
import { LoadingWrapper } from '../utils';
// import Item from 'antd/lib/list/Item';


// const WIDTH = 360;
// const HEIGHT = 400;
// const ITEM_HEIGHT = 124;

export interface InboxContentProps {
  onPick: (message?: NotificationMessage) => void;
  loading?: boolean;
  hasMore: boolean;
  messages?: NotificationMessage[];
  selectedId?: string | number;
  loadMore: (offset: number, limit: number) => Promise<any>;
  remove: (id: string) => void;
  read: (id: string) => void;
}

export const InboxContent: FC<InboxContentProps> = ({ loading, hasMore, onPick, messages = [], selectedId, loadMore, read, remove }) => {
  const ref = useRef<any>();
  const size = useSize(ref);
  const scroll = useScroll(ref);
  // const isItemLoaded = useCallback((index: number) => !hasMore || index < messages.length, [hasMore, messages.length]);
  // const itemCount = useMemo(() => hasMore ? messages.length + 1 : messages.length, [hasMore, messages.length]);

  const isTouchButton = useMemo(() => {
    return scroll.top >= (size.height || 0);
  }, [scroll.top, size.height]);

  
  // const Item = useCallback(({index, style} : { index: number, style: any}) => {
  //   if (isItemLoaded(index)) {
  //     return (
  //       <Notification
  //         key={index}
  //         style={style}
  //         onPick={onPick}
  //         selected={messages[index].id === selectedId}
  //         message={messages[index]}
  //         remove={remove}
  //         read={read}
  //       />
  //     )
  //   }
  //   return <div style={style}></div>
  // }, [isItemLoaded, onPick, messages, selectedId, remove, read])


  const loadMoreItems = useCallback((start: number, stop: number) => {
    if (!loading) {
      return loadMore(start, stop);
    }
    return null;
  }, [loadMore, loading]);

  const { run } = useThrottleFn(
    (start: number, stop: number) => loadMoreItems(start, stop),
    { wait: 500 }
  );

  useEffect(() => {
    if (isTouchButton && hasMore) {
      run(messages.length, 10);
    }
  }, [isTouchButton, messages.length, hasMore, run]);

  const isEmpty = useMemo(() => {
    return (messages == null || messages.length === 0) && !loading
  }, [loading, messages]);

  const messageList = useMemo(() => {
    return (
      <LoadingWrapper loading={messages == null}>
        <div className="notification-list" style={isEmpty ? {display: 'none'} : undefined} ref={ref}>
          {
            messages.map((message, index) => (
              <Notification
                key={index}
                onPick={onPick}
                selected={message.id === selectedId}
                message={message}
                remove={remove}
                read={read}
              />
            ))
          }

          {/* <InfiniteLoader isItemLoaded={isItemLoaded} itemCount={itemCount} loadMoreItems={loadMoreItems}>
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
          </InfiniteLoader> */}
        </div>
        {isEmpty ? <div style={{ paddingTop: '60px', }}><Empty description="没发现消息通知" /></div> : null}
      </LoadingWrapper>
    );
  }, [messages, isEmpty, onPick, selectedId, remove, read]);

  return (
    <div className="tbox-inbox-content">
      {messageList}
    </div>
  );
}
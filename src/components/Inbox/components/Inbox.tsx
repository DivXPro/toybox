import React, { FC, useCallback, useEffect, useState, useMemo, ReactNode } from 'react';
import { Badge, Button, Dropdown, Menu } from 'antd';
import classNames from 'classnames';
import { Filter3Line, MoreFill, CheckDoubleFill, DeleteBinLine, CheckLine } from '@airclass/icons';
import { InboxContent } from './InboxContent';
import { NotificationMessage } from './Notification';
import DropdownMenu, { MenuItem } from '../../DropdownMenu';

export interface MessageType {
  type: string;
  name: string;
}
export interface InboxProps {
  badge: number;
  messages?: NotificationMessage[];
  loading?: boolean;
  hasMore: boolean;
  icons?: Record<string, ReactNode>;
  messageTypes?: MessageType[];
  onPick: (message: NotificationMessage) => void;
  read: (id: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
  loadMore: (unread: boolean, offset: number, timestamp: number, type?: string) => void;
  reload: (unread: boolean, type?: string) => void;
  readAll?: () => Promise<void>;
  removeAll?: () => Promise<void>;
}

const Inbox: FC<InboxProps> = ({ badge, messages, loading, hasMore, messageTypes = [], onPick, reload, loadMore, remove, read, readAll, removeAll, icons }) => {
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(new Date().getTime());
  const [unRead, setUnread] = useState(false);
  const [selectedId, setSelectedId] = useState<string | number>();
  const [type, setType] = useState<string>();

  const handleLoadMore = useCallback(async (offset: number) => {
    if (messages == null  || messages.length === 0) {
      reload(unRead);
    } else {
      setCurrentTimestamp(new Date().getTime());
      loadMore(unRead, offset, currentTimestamp, type);
    }
  }, [messages, reload, unRead, loadMore, currentTimestamp, type]);

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

  useEffect(() => {
    reload(unRead, type);
  }, [reload, type, unRead]);

  const showMessages = useMemo(() => unRead ? (messages || []).filter(msg => !msg.haveRead) : messages, [messages, unRead]);

  const messageTypeItems = useMemo(() =>
    messageTypes.length > 1
      ?
        <React.Fragment>
          <Menu.Item>
          <CheckLine style={{ opacity: type != null ? 0 : 1 } } />全部应用
          </Menu.Item>
          <Menu.Divider />
          {
            messageTypes.map((mt, idx) => 
              <Menu.Item key={idx} onClick={() => setType(mt.type)}>
                <CheckLine style={{ opacity: type === mt.type ? 1 : 0 }}/>{mt.name}
              </Menu.Item>
            )
          }
        </React.Fragment>
      : undefined
  , [messageTypes, type]);

  const menuItems: MenuItem[] = useMemo(() => (
    [
      {
        text: '标记所有消息为已读',
        icon: <CheckDoubleFill />,
        callback: async () => {
          if (readAll != null) {
            await readAll();
            reload(unRead, type);
          }
        },
      },
      {
        text: '删除所有已读消息',
        icon: <DeleteBinLine />,
        danger: true,
        callback: async () => {
          if (removeAll != null) {
            await removeAll();
            reload(unRead, type);
          }
        },
      }
    ]
  ), [readAll, reload, removeAll, type, unRead]);

  const InBoxPanel = () => {
    return <div className="tbox-inbox-panel">
      <div className="inbox-panel--tabs">
        <div className={classNames('inbox-panel--tab', { active: !unRead })} onClick={() => setUnread(false)}>
          <span>全部</span>
          <Badge count={badge} />
        </div>
        <div className={classNames('inbox-panel--tab', { active: unRead })} onClick={() => setUnread(true)}>
          <span>未读</span>
        </div>
      </div>
      <div>
        {
          messageTypeItems && 
            <Dropdown overlay={messageTypeItems} placement="bottomRight">
              <Button type="text" icon={<Filter3Line />} />
            </Dropdown>
        }
        <DropdownMenu items={menuItems} placement="bottomRight">
          <Button type="text" icon={<MoreFill />} />
        </DropdownMenu>
      </div>
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
        icons={icons}
      />
    </div>
  );
}

export default Inbox;

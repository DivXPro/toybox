import React, { FC } from 'react';
import { InboxContent } from './InboxContent';
import './style.less';

export interface InboxProps {
  onPick: () => void;
}

export const Inbox: FC<InboxProps> = ({ onPick }) => {
  const InBoxPanel = () => {
    return <div className="inbox-panel">
      <div className="inbox-panel--tab">全部</div>
    </div>;
  };

  return (
    <div className="inbox">
      <InBoxPanel />
      <InboxContent onPick={onPick} />
    </div>
  );
}
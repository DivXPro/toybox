import React, { FC } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';

export interface OperateColumnProps {
  text: { [key: string]: any };
  record: { [key: string]: any };
  index: number;
  operateItems: OperateItem[];
}

export type OperateItem = ButtonProps & {
  text?: string;
  callback?: (record: Record<string, any> , index: number) => void;
  disabled?: (text: any, record: Record<string, any>, index: number) => boolean | boolean;
}

export const operateFactory = (operateItems: OperateItem[], fc: FC<{ text: any; record: { [key: string]: any }; index: number, operateItems: OperateItem[] }>) => {
  return (text: any, record: { [key: string]: any }, index: number) => {
    return fc({ text, record, index, operateItems });
  };
}

export const OperateColumn: FC<OperateColumnProps> = ({ text, record, index, operateItems }) => {
  return <div className="tbox-operate-column">
    {
      operateItems.map((item, idx) => {
        const doDisabled = typeof item.disabled === 'function'
          ? item.disabled(text, record, index)
          : item.disabled;
        return (
          <Button
            key={idx}
            disabled={doDisabled}
            onClick={() => item.callback && item.callback(record, index)}
            {...item}
          >
            {item.text}
          </Button>
        );
      })
    }
  </div>
}

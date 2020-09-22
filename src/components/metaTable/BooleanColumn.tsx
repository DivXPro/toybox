import React, { FC, useMemo } from 'react';

interface BooleanColumnProps {
  text: boolean;
  record: { [key: string]: any };
  index: number;
}

export const DateColumn: FC<BooleanColumnProps> = ({ text }) => {
  const value = useMemo(() => {
    if (text === true) {
      return '是'
    } else if (text === false) {
      return '否'
    }
    return null
  }, [text]);
  return <div>{value}</div>;
}

import React, { FC } from 'react';

interface DataColumnProps {
  text: string;
  record: string;
  index: number;
}

export const DateColumn: FC<DataColumnProps> = ({ record }) => {
  return <div>{record}</div>;
}

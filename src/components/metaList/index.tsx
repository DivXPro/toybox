import React, { FC, useCallback, ReactNode } from 'react';
import { List } from 'antd';
import { ListItemMetaProps } from 'antd/lib/list/Item';
import { ListGridType } from 'antd/lib/list';
import { PaginationConfig } from 'antd/lib/pagination';
import usePagination from './hooks/usePagination';

export interface MetaListProps {
  dataSource: Record<string, any>[];
  loading?: boolean;
  itemMata?: ListItemMetaProps;
  grid?: ListGridType
  content?: (item: Record<string, any>) => ReactNode;
  onChange?: (pagination: PaginationConfig) => void;
  pagination?: PaginationConfig | false;
}

export const MetaList: FC<MetaListProps> = ({ dataSource, loading, itemMata, content, grid, onChange, pagination }) => {
  const onPaginationChange = useCallback((current: number, pageSize: number) => {
    onChange && onChange({current, pageSize});
  }, [onChange]);

  const [mergedPagination] = usePagination(
    dataSource.length,
    pagination,
    onPaginationChange,
  );
  const renderItem = useCallback((item: Record<string, any>) => {
    return <List.Item>
      { (grid || !itemMata) ? null : <List.Item.Meta {...itemMata} />}
      { content ? content(item) : null }
    </List.Item>
  }, [content, grid, itemMata]);
  return <List dataSource={dataSource} loading={loading} renderItem={renderItem} grid={grid} pagination={mergedPagination} />
}
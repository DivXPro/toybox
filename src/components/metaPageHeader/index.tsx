import React, { FC } from 'react';
import { PageHeader } from 'antd';
import { PageHeaderProps } from 'antd/lib/page-header';
import { MetaRoute } from '../../types/interface';
import useMetaRoute from '../../hooks/useMetaRoute';

export type MetaPageHeaderProps = PageHeaderProps & {
  metaRoutes?: MetaRoute[];
}

export const MetaPageHeader: FC<MetaPageHeaderProps> = ({ metaRoutes, title, ...other }) => {
  const routes = useMetaRoute(metaRoutes);
  return title ? <PageHeader breadcrumb={routes ? { routes } : undefined} title={title} {...other} /> : null;
}

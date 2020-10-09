import React, { FC } from 'react';
import { PageHeader } from 'antd';
import { PageHeaderProps } from 'antd/lib/page-header';
import { MetaRoute } from '../../types/interface';
import useMetaRoute from '../../hooks/useMetaRoute';

export type MetaPageHeaderProps = PageHeaderProps & {
  metaRoutes?: MetaRoute[];
}

export const MetaPageHeader: FC<MetaPageHeaderProps> = ({ metaRoutes, ...other }) => {
  const routes = useMetaRoute(metaRoutes);
  return <PageHeader breadcrumb={routes ? { routes } : undefined} {...other} />
}

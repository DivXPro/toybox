import React, { FC, useMemo, ReactNode } from 'react';
import { Tabs } from 'antd';
import styled from 'styled-components';
import { MetaPageHeader } from '../metaPageHeader';
import { BusinessObjectMeta } from '../../types/interface';
import { MetaDescriptons } from '../metaDescriptions';
import useObjectMeta from '../../hooks/useBusinessObjectMeta';

const { TabPane } = Tabs;

const ContentWrapper = styled.div`
  padding: 12px 24px;
`;

export interface MetaObjectPageProps {
  businessObjectMeta: BusinessObjectMeta;
  data: Record<string, any>;
  onBack?: () => void;
  extend?: ExtendRender[];
}


export interface ExtendRender {
  name: string;
  render: (businessObjectMeta: BusinessObjectMeta, data: Record<string, any>) => ReactNode;
}

const ExtendContent: FC<{views: { name: string, node: ReactNode }[]}> = ({views}) => {
  return <Tabs defaultActiveKey="1">
    {views.map((v, idx) => <TabPane key={idx.toString()} tab={v.name}>{v.node}</TabPane>)}
  </Tabs>
};

export const MetaObjectPage: FC<MetaObjectPageProps> = ({ businessObjectMeta, data, onBack, extend }) => {
  const title = useMemo(() => data[businessObjectMeta.titleKey], [businessObjectMeta.titleKey, data]);
  const fieldItemsMeta = useObjectMeta(businessObjectMeta);
  const extendContent = useMemo(() => {
    if (extend != null && extend.length > 0) {
      const views: { name: string, node: ReactNode }[] = [];
      views.push({
        name: '详细信息',
        node: <MetaDescriptons fieldItemMetas={fieldItemsMeta} mode="read" data={data} />
      });
      return <ExtendContent views={views} />;
    } 
    return <MetaDescriptons fieldItemMetas={fieldItemsMeta} mode="read" data={data} />
  }, [data, extend, fieldItemsMeta]);
  return (
    <div className='tbox-page'>
      <MetaPageHeader title={title} onBack={onBack} />
      <ContentWrapper>
        { extendContent }
      </ContentWrapper>
    </div>
  );
}
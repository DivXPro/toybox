import React, { useMemo, useImperativeHandle, Ref, useState, useCallback, ReactNode, ForwardRefRenderFunction } from 'react';
import { Form, Button, Dropdown, Menu } from 'antd';
import classNames from 'classnames';
import { CheckboxMultipleLine, CheckboxMultipleFill, ListUnordered, TableLine, ArrowDownSLine } from '@airclass/icons';
import useAntdTable from './hooks/useTable';
import { ContentWrapper } from './ContentWrapper';
import { MetaTable } from '../metaTable';
import { Panel, PanelProps } from '../panel';
import { BusinessObjectMeta } from '../../types/interface';
import { OperateItem } from '../metaTable/OperateColumn';
import { IndexSearch, SearchFindParam } from './IndexSearch';
import { MetaPageHeader } from '../metaPageHeader';
import { ButtonGroup, ButtonItem } from '../buttonGroup';
import { FieldType } from '../field/interface';

const LIST_RENDER = 'listRender';

export interface PageResult {
  list: Record<string, any>[];
  total: number;
}

export interface Pageable {
  pageSize: number;
  current: number;
}

export type IndexMode = 'table' | 'list' | 'card';

export interface IndexPageProps {
  title: string;
  objectMeta: BusinessObjectMeta;
  panel?: PanelProps;
  operateItems?: OperateItem[];
  visibleColumns?: ColumnVisible[];
  searchOption?: {
    findParams: SearchFindParam[];
  }
  panelItems?: PanelOperateItem[];
  mode?: IndexMode;
  viewMode?: IndexMode[];
  className?: string;
  columnComponents?: Record<string, (...args: any) => ReactNode>;
  renderContent?: (...args: any) => ReactNode;
  loadData: (pageable: Pageable, fieldsValue: Record<string, any>) => Promise<PageResult>;
  viewLink?: (...arg: any) => string;
}

export interface ColumnVisible {
  key: string;
  fixed?: boolean;
  align?: 'left' | 'right' | 'center';
  component?: string;
}

export interface PanelOperateItem extends ButtonItem {
  selection?: boolean;
}

const IndexPage: ForwardRefRenderFunction<any, IndexPageProps>  = ({
  title,
  objectMeta,
  operateItems,
  visibleColumns,
  panelItems,
  mode = 'table',
  viewMode,
  searchOption,
  className,
  columnComponents = {},
  renderContent,
  viewLink,
  loadData
}, ref: Ref<any>) => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>();
  const [currentMode, setCurrentMode] = useState<IndexMode>(mode);
  const { tableProps, search } = useAntdTable(loadData, {
    defaultPageSize: 10,
    form,
  });
  const { submit } = search;

  const toggleSelection = useCallback(() => {
    if (selectionType == null) {
      setSelectionType('checkbox');
    } else {
      setSelectionType(undefined);
    }
  }, [selectionType]);

  const rowSelection = useMemo(
    () => selectionType != null
      ? ({
        selectedRowKeys,
        selectionType,
        onChange: (keys: (string | number)[]) => setSelectedRowKeys(keys),
      })
      : undefined,
    [selectedRowKeys, selectionType, setSelectedRowKeys]
  )

  useImperativeHandle(
    ref,
    () => ({
      reload: () => submit(),
    }),
    [submit],
  );

  const columnMetas = useMemo(() => {
    if (currentMode === 'list') {
      return [{
        key: objectMeta.key,
        component: LIST_RENDER,
        name: objectMeta.name,
        type: FieldType.BUSINESS_OBJECT,
      }];
    }
    if (visibleColumns != null) {
      return visibleColumns.map(col => {
        const fieldMeta = objectMeta.properties[col.key];
        return Object.assign(
          {
            key: col.key,
            fixed: col.fixed,
            align: col.align,
            component: col.component,
            link: fieldMeta.key === objectMeta.titleKey ? viewLink : undefined
          },
          fieldMeta,
        );
      });
    }
    return Object.keys(objectMeta.properties)
      .map(key => Object.assign(
        objectMeta.properties[key],
        { link: key === objectMeta.titleKey ? viewLink : undefined }
      ));
  }, [currentMode, objectMeta.key, objectMeta.name, objectMeta.properties, objectMeta.titleKey, viewLink, visibleColumns]);

  const components: Record<string, (...args: any) => ReactNode> = useMemo(() => {
    if (currentMode === 'list' && renderContent) {
      return {
        [LIST_RENDER]: renderContent,
      } as Record<string, (...args: any) => ReactNode>;
    }
    return columnComponents;
  }, [columnComponents, currentMode, renderContent]);

  const modeMenu = useMemo(() => {
    const currentIcon = currentMode === 'list' ? <ListUnordered /> : <TableLine />;
    const menuItems = (viewMode || []).map((itemMode, idx) => {
      return <Menu.Item
        key={idx}
        onClick={() => setCurrentMode(itemMode)}
        icon={itemMode === 'list' ? <ListUnordered /> : <TableLine />}
      >
        { itemMode === 'list' ? '列表' : '表格' }
      </Menu.Item>;
    });
    const menu = (
      <Menu>
        {menuItems}
      </Menu>
    );
    return <Dropdown overlay={menu}>
      <Button type="text" icon={currentIcon}>
        <ArrowDownSLine />
      </Button>
    </Dropdown>
  }, [currentMode, viewMode]);

  const leftPanel = useMemo(() => {
    return <React.Fragment>
      <Button
        type="text"
        onClick={toggleSelection}
        icon={selectionType == null ? <CheckboxMultipleLine /> : <CheckboxMultipleFill />}
      />
      {
        (viewMode || []).length > 1 ? modeMenu : null
      }
      {
        searchOption
          ? <IndexSearch
            form={form}
            submit={submit}
            findParams={searchOption.findParams}
          />
          : null
      }
    </React.Fragment>
  }, [form, modeMenu, searchOption, selectionType, submit, toggleSelection, viewMode]);

  const rightPanel = useMemo(() => {
    const buttonItems = (panelItems || [])
      .filter(item => (!item.selection) === (selectionType == null) )
      .map(item => ({
        text: item.text,
        icon: item.icon,
        type: item.type,
        disabled: item.disabled,
        danger: item.danger,
        callback: item.selection ? () => item.callback(selectedRowKeys) : item.callback,
      }));
    return buttonItems.length > 0 ? <ButtonGroup buttonItems={buttonItems} /> : null;
  }, [panelItems, selectedRowKeys, selectionType]);

  const tablePanel = useMemo(() => (rightPanel != null || leftPanel != null)
    ? <Panel left={leftPanel} right={rightPanel} />
    : null,
    [rightPanel, leftPanel]
  );

  const IndexContent = useCallback(() => {
    switch (currentMode) {
      case 'table':
        return <MetaTable
          rowKey="id"
          operateItems={operateItems}
          columnMetas={columnMetas}
          rowSelection={rowSelection}
          columnComponents={components}
          {...tableProps}
        />
      case 'list':
        return <MetaTable
          rowKey="id"
          operateItems={operateItems}
          columnMetas={columnMetas}
          rowSelection={rowSelection}
          columnComponents={components}
          {...tableProps}
        />;
      default:
        return null;
    }
  }, [components, columnMetas, currentMode, operateItems, rowSelection, tableProps]);

  return (
    <div className={classNames('tbox-page', className)}>
      <MetaPageHeader title={title} footer={tablePanel} />
      <ContentWrapper>
        <IndexContent />
      </ContentWrapper>
    </div>
  )
}

export default React.forwardRef(IndexPage);

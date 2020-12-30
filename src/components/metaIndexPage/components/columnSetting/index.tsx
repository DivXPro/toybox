import React, { useEffect, useRef } from 'react';
import { Checkbox, Popover, Tooltip } from 'antd';
import { DndProvider } from 'react-dnd';
import { ListSettingsLine } from '@airclass/icons';
import classNames from 'classnames';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DnDItem from './DndItem';
import DragIcon from './DragIcon';
import { ColumnBaseType, ColumnComponentType } from '../../../../types/interface';

import './style.scss';

const CheckboxListItem: React.FC<{
  index: number;
  title?: React.ReactNode;
  columns: ColumnBaseType[];
  setColumns: (columns: ColumnBaseType[]) => void;
}> = ({ index, columns, title, setColumns }) => {
  // const intl = useIntl();
  const column = columns[index] || { show: true };
  return (
    <span className={`column-setting-list-item`} key={index}>
      <DragIcon />
      <Checkbox
        onChange={(e) => {
          if (index >= 0) {
            if (e.target.checked) {
              setColumns(columns.map((meta, idx) => idx === index ? ({ ...meta, show: false }) : meta));
            } else {
              setColumns(columns.map((meta, idx) => idx === index ? ({ ...meta, show: true }) : meta));
            }
          }
        }}
        checked={column.show !== false}
      >
        {title}
      </Checkbox>
    </span>
  );
};

const CheckboxList: React.FC<{
  columns: ColumnBaseType[];
  setColumns: (columns: ColumnBaseType[]) => void;
  title: string;
  showTitle?: boolean;
}> = ({ columns, setColumns, showTitle = true, title: listTitle }) => {
  const show = columns && columns.length > 0;
  if (!show) {
    return null;
  }
  const move = (index: number, targetIndex: number) => {
    if (index < 0 || targetIndex < 0 || index === targetIndex) {
      return;
    }
    // TODO:
    setColumns(columns);
  };

  const listDom = columns.map((column, index) => {
    return (
      <DnDItem index={index} key={column.key} end={move}>
        <CheckboxListItem
          setColumns={setColumns}
          index={index}
          columns={columns}
          title={column.name}
        />
      </DnDItem>
    );
  });
  return (
    <React.Fragment>
      {showTitle && <span className={`column-setting-list-title`}>{listTitle}</span>}
      {listDom}
    </React.Fragment>
  );
};

const GroupCheckboxList: React.FC<{
  columns: ColumnBaseType[];
  setColumns: (columns: ColumnBaseType[]) => void;
}> = ({ columns, setColumns }) => {
  return (
    <div
      className={classNames(`checkbox-list`)}
    >
      <DndProvider backend={HTML5Backend}>
        <CheckboxList
          columns={columns}
          setColumns={setColumns}
          title={'固定在左侧'}
        />
      </DndProvider>
    </div>
  );
};

const ColumnSetting: React.FC<{ columns: ColumnComponentType[], setColumnTypes: (columns: ColumnComponentType[]) => void }> = ({ columns, setColumnTypes }) => {
  const columnsRef = useRef<ColumnComponentType[]>([]);
  useEffect(() => {
    if (columns) {
      columnsRef.current = columns;
    }
  }, [columns]);
  /**
   * 设置全部选中，或全部未选中
   * @param show
   */
  const setAllSelectAction = (show = true) => {
    const newColumnTypes: ColumnComponentType[] = [];
    columns.forEach((column, index) => {
      newColumnTypes[index] = { ...column, show };
    });
    setColumnTypes(newColumnTypes);
  };

  // 选中的 key 列表
  const selectedKeys = columns.filter((value) => !value || value.show === false);

  // 是否已经选中
  const indeterminate = selectedKeys.length > 0 && selectedKeys.length !== columns.length;

  return (
    <Popover
      arrowPointAtCenter
      title={
        <div className={`column-title`}>
          <Checkbox
            indeterminate={indeterminate}
            checked={selectedKeys.length === 0 && selectedKeys.length !== columns.length}
            onChange={(e) => {
              if (e.target.checked) {
                setAllSelectAction();
              } else {
                setAllSelectAction(false);
              }
            }}
          >
            {'列展示'}
          </Checkbox>
          <a
            onClick={() => setColumnTypes(columnsRef.current)}
          >
            {'重置'}
          </a>
        </div>
      }
      overlayClassName={`column-setting-overlay`}
      trigger="click"
      placement="bottomRight"
      content={<GroupCheckboxList columns={columns} setColumns={setColumnTypes} />}
    >
      <Tooltip title={'列设置'}>
        <ListSettingsLine />
      </Tooltip>
    </Popover>
  );
}

export default ColumnSetting;

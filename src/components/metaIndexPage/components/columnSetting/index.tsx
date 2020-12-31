import React, { useEffect, useRef } from 'react';
import { Button, Checkbox, Popover, Tooltip } from 'antd';
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
    <span className={`toybox-column-setting-list-item`} key={index}>
      <DragIcon />
      <Checkbox
        onChange={(e) => {
          if (index >= 0) {
            if (e.target.checked) {
              setColumns(columns.map((column, idx) => idx === index ? ({ ...column, show: false }) : column));
            } else {
              setColumns(columns.map((column, idx) => idx === index ? ({ ...column, show: true }) : column));
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
}> = ({ columns, setColumns }) => {
  const show = columns && columns.length > 0;
  if (!show) {
    return null;
  }
  const move = (index: number, targetIndex: number) => {
    if (index < 0 || targetIndex < 0 || index === targetIndex) {
      return;
    }
    const tempColumn = columns[targetIndex];
    columns[targetIndex] = columns[index];
    columns[index] = tempColumn;
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
        />
      </DndProvider>
    </div>
  );
};

export interface ColumnSettingProps {
  columns: ColumnComponentType[];
  setColumns: (columns: ColumnComponentType[]) => void;
}

const ColumnSetting: React.FC<ColumnSettingProps> = ({ columns, setColumns }) => {
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
    setColumns(newColumnTypes);
  };

  // 选中的 key 列表
  const selectedKeys = columns.filter((value) => !value || value.show === false);

  // 是否已经选中
  const indeterminate = selectedKeys.length > 0 && selectedKeys.length !== columns.length;

  return (
    <Popover
      arrowPointAtCenter
      title={
        <div className={`toybox-column-setting-title`}>
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
            onClick={() => setColumns(columnsRef.current)}
          >
            {'重置'}
          </a>
        </div>
      }
      overlayClassName={`toybox-column-setting-overlay`}
      trigger="click"
      placement="bottomRight"
      content={<GroupCheckboxList columns={columns} setColumns={setColumns} />}
    >
      <Tooltip title={'列选择'}>
        <Button icon={<ListSettingsLine />} type="text" />
      </Tooltip>
    </Popover>
  );
}

export default ColumnSetting;

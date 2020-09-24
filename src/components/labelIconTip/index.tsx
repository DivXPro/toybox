import React, { useContext } from 'react';
import { Tooltip, Space, ConfigProvider } from 'antd';
import { TooltipProps } from 'antd/lib/tooltip';
import './style.less';

/**
 * 在 form 的 label 后面增加一个 tips 来展示一些说明文案
 * @param props
 */
export const LabelIconTip: React.FC<{
  label: React.ReactNode;
  subTitle?: React.ReactNode;
  tooltip?: string | TooltipProps;
}> = (props) => {
  const { label, tooltip, subTitle } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  if (!tooltip && !subTitle) {
    return <React.Fragment>{label}</React.Fragment>;
  }
  const className = getPrefixCls('pro-core-label-tip');
  const tooltipProps = typeof tooltip === 'string' ? { title: tooltip } : (tooltip as TooltipProps);

  return (
    <Space size={4} className={className}>
      {label}
      {subTitle && <div className={`${className}-subtitle`}>{subTitle}</div>}
      {tooltip && (
        <Tooltip {...tooltipProps}>
          <i className={`ri-information-line ${className}-icon`}></i>
        </Tooltip>
      )}
    </Space>
  );
};

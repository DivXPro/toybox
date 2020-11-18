import React, { FC } from 'react';
import classNames from 'classnames';
// import remix from './remixicon.symbol.svg';

const REMIX_PATH = 'https://cdn.xshicheng.com/image/remixicon.symbol.svg';

export interface SvgProps {
  name: string;
  cls?: string;
}

export const Svg: FC<SvgProps> = ({ name, cls }) => {
  return (
    <svg
      className={classNames('remix', cls)}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <use xlinkHref={`${REMIX_PATH}#${name}`}></use>
    </svg>
  )
}
import React, { FC, useMemo } from 'react';
import classNames from 'classnames';

export interface AvatarProps {
  name: string;
  className?: string;
  style?: Record<string, any>;
  colorSets?: string[];
  img?: string;
  onClick?: (...args: any) => void;
}

export interface ImageAvatarProps {
  name: string;
  img?: string;
  className?: string;
  style?: Record<string, any>;
  size?: 'xs' | 'small' | 'medium' | 'large' | 'xl';
  colorSets?: string[];
}

const DEFAULT_COLOR_SETS = ['#BC61CF', '#F26666', '#F29A52', '#F4C329', '#CBD057', '#289ED3', '#29B3F0'];
const DEFAULT_SIZE = 'medium';

function AvatarWithName({ name, className, style, img, colorSets = DEFAULT_COLOR_SETS }: AvatarProps) {
  return <div className={classNames('tbox-avatar-withname', className)} style={style}>
    <Avatar name={name} img={img} size="xs" colorSets={colorSets} />
    <span className="tbox-avatar-name">{name}</span>
  </div>
}


function Avatar({ name, img, className, style, size = DEFAULT_SIZE, colorSets = DEFAULT_COLOR_SETS }: ImageAvatarProps) {
  const background = useMemo(() => {
    let code = 0;
    for (let i = 0; i < name.length; i += 1) {
      code += name.charCodeAt(i);
    }
    return colorSets[code % colorSets.length];
  }, [colorSets, name]);

  return (
    <div className={classNames('tbox-avatar-image', className, `tbox-avatar-image-${size}`)} style={style}>
      {
        img
          ? <img className="tbox-avatar-img" src={img} />
          : <div style={{ background }}
              className="tbox-avatar-name"
            >
              {name}
            </div>
      }
    </div>
  )
}


Avatar.AvatarWithName = AvatarWithName;

export default Avatar;
import { useState } from 'react';

export default () => {
  const [visible, setVisible] = useState(false);

  const toggle = () => {
    setVisible(!visible);
  }

  return [visible, setVisible, toggle] as [boolean, (visible: boolean) => void, () => void];
};

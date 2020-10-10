import { useState } from 'react';

export default () => {
  const [visible, setVisible] = useState(false);

  const toggle = () => {
    setVisible(!visible);
  }

  return [visible, toggle] as [boolean, () => void];
};

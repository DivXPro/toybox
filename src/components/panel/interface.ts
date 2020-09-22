import { ReactNode } from "react";

export type ItemProps = {
  type: string;
  content: ReactNode;
  props?: { [key: string]: any };
  callback?: () => void;
}


export interface PanelProps {
  left?: ReactNode;
  right?: ItemProps[];
}

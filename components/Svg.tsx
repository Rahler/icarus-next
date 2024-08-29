import { ReactNode } from "react";

interface Props {
  readonly children: ReactNode;
}

const Svg = ({ children, ...params }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...params}>
      {children}
    </svg>
  );
};

export default Svg;

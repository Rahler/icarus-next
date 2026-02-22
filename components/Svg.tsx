import { ReactNode, SVGProps } from "react";


interface Props extends SVGProps<SVGSVGElement>{
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

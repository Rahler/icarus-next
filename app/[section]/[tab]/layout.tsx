import { ReactNode } from "react";
import { Container } from "react-bootstrap";

interface Props {
  readonly children: ReactNode;
}

export default function Layout({ children }: Props) {
  return <>{children}</>;
}

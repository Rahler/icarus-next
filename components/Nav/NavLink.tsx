"use client";

import { usePathname } from "next/navigation";
import { ScriptProps } from "next/script";
import { Nav } from "react-bootstrap";

interface Props extends ScriptProps {
  url: string;
  activeClass: string;
}

export const NavLink = ({ url, activeClass }: Props) => {
  const pathname = usePathname();
  let href = `/${encodeURIComponent(url)}`;
  const className = pathname.indexOf(href) == 0 ? activeClass : undefined;

  return (
    <nav {...{ className }}>
      <Nav.Link {...{ href }}>{url}</Nav.Link>
    </nav>
  );
};

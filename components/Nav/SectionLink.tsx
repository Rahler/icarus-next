"use client";

import Link from "next/link";
import { ScriptProps } from "next/script";
import { Nav } from "react-bootstrap";

interface Props extends ScriptProps {
  name: string;
  active: boolean;
}

export const SectionLink = ({ name, active }: Props) => {
  let encodedName = encodeURIComponent(name);
  const className = active ? "active" : undefined;
  return (
    <nav>
      <Nav.Link {...{ className }} as={Link} href={`/${encodedName}`}>
        {name}
      </Nav.Link>
    </nav>
  );
};

"use client";

import Link from "next/link";
import { ScriptProps } from "next/script";
import { Nav } from "react-bootstrap";

interface Props extends ScriptProps {
  section: string;
  name: string;
  active: boolean;
}

export const TabLink = ({ section, name, active }: Props) => {
  let encodedName = encodeURIComponent(name);
  const className = active ? "active" : undefined;

  return (
    <nav>
      <Nav.Link
        {...{ className }}
        as={Link}
        href={`/${section}/${encodedName}`}
      >
        {name}
      </Nav.Link>
    </nav>
  );
};

"use client";

import { ScriptProps } from "next/script";
import { NavLink } from "./NavLink";

interface Props extends ScriptProps {
  url: string;
  activeClass: string;
}

export const Section = (props: Props) => {
  return <NavLink {...props} />;
};

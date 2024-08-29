import { ScriptProps } from "next/script";
import { NavLink } from "./NavLink";
import { Section } from "@/lib/_data";

interface Props extends ScriptProps {
  url: string;
  activeClass: string;
  tabs: Section;
}

export const NavSection = (props: Props) => {
  return <NavLink {...props} />;
};

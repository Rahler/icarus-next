import Link from "next/link";
import { ScriptProps } from "next/script";
import color from "./SectionLink.module.scss"

interface Props extends ScriptProps {
  name: string;
  text: string;
  active: boolean;
}

export const SectionLink = ({ name, text, active }: Props) => {
  return (
    <li className={`nav-item ${color.main}`}>
      <Link
        href={"/" + encodeURIComponent(name)}
        className={`nav-link ${active ? " active" : ""}`}
        aria-current={active ? "page" : undefined}
        role="tab"
      >
        {" "}
        {text}
      </Link>
    </li>
  );
};

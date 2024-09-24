import Link from "next/link";
import { ScriptProps } from "next/script";

interface Props extends ScriptProps {
  section: string;
  name: string;
  active: boolean;
}

export const TabLink = ({ section, name, active }: Props) => {
  let encodedName = encodeURIComponent(name);
  return (
    <li className="nav-item">
      <Link
        className={`nav-link ${active ? " active" : ""}`}
        aria-current={active ? "true" : "false"}
        href={`/${section}/${encodedName}`}
        role="tab"
      >
        {name}
      </Link>
    </li>
  );
};

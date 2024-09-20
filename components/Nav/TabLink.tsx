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
    <li className="nav-item ">
      <Link
        className={`btn ${active ? "btn-primary" : "btn-outline-secondary"}`}
        aria-current={active ? "true" : undefined}
        href={`/${section}/${encodedName}`}
      >
        {name}
      </Link>
    </li>
  );
};

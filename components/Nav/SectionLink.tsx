import Link from "next/link";
import { ScriptProps } from "next/script";

interface Props extends ScriptProps {
  name: string;
  active: boolean;
}

export const SectionLink = ({ name, active }: Props) => {
  return (
    <nav>
      <Link
        href={"/" + encodeURIComponent(name)}
        className={`btn ${active ? "btn-primary" : "btn-outline-secondary"}`}
        aria-current={active ? "page" : undefined}
      >
        {" "}
        {name}
      </Link>
    </nav>
  );
};

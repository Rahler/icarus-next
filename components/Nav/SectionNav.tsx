import { SectionLink } from "./SectionLink";
import { ScriptProps } from "next/script";
import Link from "next/link";
import { Data } from "@/lib/_data";

interface Props extends ScriptProps {
  data: Data;
  activeSection?: string;
}

export const SectionNav = ({ data, children, activeSection }: Props) => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand">
          Icarus Build Tool
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSection"
          aria-controls="navbarSection"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSection">
          {Object.keys(data).map((section) => (
            <SectionLink
              name={section}
              key={section}
              active={activeSection === section}
            />
          ))}
          {children}
        </div>
      </div>
    </nav>
  );
};

import { SectionLink } from "./SectionLink";
import { ScriptProps } from "next/script";
import Link from "next/link";
import { sections, Sections } from "@/lib/dataParsed";

interface Props extends ScriptProps {
  sections: Sections;
  activeSection?: string;
}

export const SectionNav = ({ children, activeSection }: Props) => {
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
        <div
          className="collapse navbar-collapse flex-column row-gap-1"
          id="navbarSection"
        >
          <ul className="navbar-nav gap-1 nav-tabs" role="tablist">
            {Object.keys(sections).map((section) => (
              <SectionLink
                name={section}
                key={section}
                active={activeSection === section}
              />
            ))}
          </ul>
          {children}
        </div>
      </div>
    </nav>
  );
};

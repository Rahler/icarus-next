"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
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
    <Container>
      <Navbar expand="lg">
        <Navbar.Brand href="/" as={Link}>
          Icarus Build Tool
          <Navbar.Toggle aria-controls="section-nav" />
        </Navbar.Brand>
        <Navbar.Collapse id="section-nav" className="flex-column">
          <Nav
            variant="pills"
            className="justify-content-center flex-grow-1 pe-3"
          >
            {Object.keys(data).map((section) => (
              <SectionLink
                name={section}
                key={section}
                active={activeSection === section}
              />
            ))}
          </Nav>
          {children}
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

"use client";
import { data } from "@/lib/dataParsed";
import classes from "./Nav.module.scss";
import { NavSection } from "./NavSection";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export const TopNav = () => {
  return (
    <Navbar expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/">Icarus Build Tool</Navbar.Brand>
        <Navbar.Toggle aria-controls="top-nav" />
        <Navbar.Collapse id="top-nav">
          <Nav
            variant="pills"
            className="justify-content-center flex-grow-1 pe-3"
          >
            {Object.keys(data).map((section) => (
              <NavSection
                url={section}
                tabs={data[section]}
                activeClass={classes.active}
                key={section}
              />
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    // <nav>
    //   {Object.keys(data).map((url) => (
    //     <Section url={url} activeClass={classes.active} />
    //   ))}
    // </nav>
  );
};

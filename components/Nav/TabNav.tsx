"use client";
import classes from "./Nav.module.scss";
import Nav from "react-bootstrap/Nav";
import { TabLink } from "./TabLink";
import { ScriptProps } from "next/script";

interface Props extends ScriptProps {
  tabs: string[];
  section: string;
  activeTab?: string;
}

export const TabNav = ({ tabs, section, activeTab }: Props) => {
  return (
    <Nav variant="pills" className="justify-content-center flex-grow-1 pe-3">
      {tabs.map((tab) => {
        return (
          <TabLink
            section={encodeURIComponent(section)}
            name={tab}
            active={activeTab === tab}
            key={tab}
          />
        );
      })}
    </Nav>
  );
};

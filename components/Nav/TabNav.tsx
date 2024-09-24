import { TabLink } from "./TabLink";
import { ScriptProps } from "next/script";

interface Props extends ScriptProps {
  tabs: string[];
  section: string;
  activeTab?: string;
}

export const TabNav = ({ tabs, section, activeTab }: Props) => {
  return (
    <ul className="navbar-nav gap-1 nav-tabs" role="tablist">
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
    </ul>
  );
};

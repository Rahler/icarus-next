import { SectionNav } from "@/components/Nav/SectionNav";
import { TabNav } from "@/components/Nav/TabNav";
import { data } from "@/lib/dataParsed";
import { notFound } from "next/navigation";
import { ScriptProps } from "next/script";

interface Props extends ScriptProps {
  params: {
    section: string;
    tab?: string;
  };
}

export default function Layout({ params: { section, tab }, children }: Props) {
  section = decodeURIComponent(section);

  if (!data[section]) return notFound();

  /*TODO: 
    - This should be sending all the tabs for the section, and letting bootstrap
      to determine how many to show.
  */
  return (
    <>
      <SectionNav data={data} activeSection={section}>
        <TabNav
          tabs={Object.keys(data[section])}
          section={section}
          activeTab={tab}
        />
      </SectionNav>
      <main>{children}</main>
    </>
  );
}

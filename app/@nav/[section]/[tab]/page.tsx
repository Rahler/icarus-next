import { TabNav } from "@/components/Nav/TabNav";
import { sections } from "@/lib/dataParsed";
import { notFound } from "next/navigation";
import { ScriptProps } from "next/script";

interface Props extends ScriptProps {
  params: Promise<{
    section: string;
    tab: string;
  }>;
}

export default async function Page(props: Props) {
  const params = await props.params;
  const section = decodeURIComponent(params.section);
  const tab = decodeURIComponent(params.tab);

  if (
    !(
      Object.hasOwn(sections, section) &&
      Object.hasOwn(sections[section].tabs, tab)
    )
  )
    return notFound();

  const tabs = Object.keys(sections[section].tabs).map((tab) => {
    return { name: tab, text: sections[section].tabs[tab].caption };
  });

  return <TabNav tabs={tabs} section={section} activeTab={tab} />;
}

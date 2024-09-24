import { TabNav } from "@/components/Nav/TabNav";
import { data } from "@/lib/dataParsed";
import { notFound } from "next/navigation";
import { ScriptProps } from "next/script";

interface Props extends ScriptProps {
  params: {
    section: string;
    tab: string;
  };
}

export default function Page({ params: { section, tab } }: Props) {
  section = decodeURIComponent(section);
  tab = decodeURIComponent(tab);

  if (!(Object.hasOwn(data, section) && Object.hasOwn(data[section], tab)))
    return notFound();

  const tabs = Object.keys(data[section]);

  return <TabNav tabs={tabs} section={section} activeTab={tab} />;
}

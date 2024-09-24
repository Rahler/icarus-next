import { TabNav } from "@/components/Nav/TabNav";
import { data } from "@/lib/dataParsed";
import { notFound } from "next/navigation";
import { ScriptProps } from "next/script";

interface Props extends ScriptProps {
  params: {
    section: string;
  };
}

export default function Page({ params: { section } }: Props) {
  section = decodeURIComponent(section);

  if (!Object.hasOwn(data, section)) return notFound();

  const tabs = Object.keys(data[section]);

  return <TabNav tabs={tabs} section={section} />;
}

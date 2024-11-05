import { TabNav } from "@/components/Nav/TabNav";
import { sections } from "@/lib/dataParsed";
import { notFound } from "next/navigation";
import { ScriptProps } from "next/script";

interface Props extends ScriptProps {
  params: Promise<{
    section: string;
  }>;
}

export default async function Page(props: Props) {
  const params = await props.params;

  const {
    section
  } = params;

  section = decodeURIComponent(section);

  if (!Object.hasOwn(sections, section)) return notFound();

  const tabs = Object.keys(sections[section].tabs);

  return <TabNav tabs={tabs} section={section} />;
}

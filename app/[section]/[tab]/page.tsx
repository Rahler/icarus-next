import { data } from "@/lib/dataParsed";
import { notFound } from "next/navigation";
import { ScriptProps } from "next/script";

interface Props extends ScriptProps {
  params: {
    section: string;
    tab: string;
  };
}

export default function Page({ params }: Props) {
  const section = decodeURIComponent(params.section);
  const tab = decodeURIComponent(params.tab);

  if (!data[section]?.[tab]) return notFound();

  return `sec: ${section}, tab: ${tab}`;
}

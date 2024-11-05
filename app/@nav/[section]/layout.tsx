import { SectionNav } from "@/components/Nav/SectionNav";
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
  const section = decodeURIComponent(params.section);

  const { children } = props;

  if (!Object.hasOwn(sections, section)) return notFound();

  return (
    <>
      <SectionNav activeSection={section}>{children}</SectionNav>
    </>
  );
}

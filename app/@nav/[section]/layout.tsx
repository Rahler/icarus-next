import { SectionNav } from "@/components/Nav/SectionNav";
import { sections } from "@/lib/dataParsed";
import { notFound } from "next/navigation";
import { ScriptProps } from "next/script";

interface Props extends ScriptProps {
  params: {
    section: string;
  };
}

export default function Page({ params: { section }, children }: Props) {
  section = decodeURIComponent(section);

  if (!Object.hasOwn(sections, section)) return notFound();

  return (
    <>
      <SectionNav data={sections} activeSection={section}>
        {children}
      </SectionNav>
    </>
  );
}

import { SectionNav } from "@/components/Nav/SectionNav";
import { sections } from "@/lib/dataParsed";

export default function Page() {
  return <SectionNav sections={sections} />;
}

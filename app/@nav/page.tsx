import { SectionNav } from "@/components/Nav/SectionNav";
import { data } from "@/lib/dataParsed";

export default function Page() {
  console.log("nav page");
  return <SectionNav data={data} />;
}

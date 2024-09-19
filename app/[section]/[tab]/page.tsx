import SingleTalent from "@/components/Talent/SingleTalent";
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

  console.log(`inner: ${section}, ${tab}`);

  if (!(Object.hasOwn(data, section) || Object.hasOwn(data[section], tab)))
    return notFound();

  let maxY = 0;
  let maxX = 0;
  const talents = Object.entries(data[section][tab]).map(
    /**
     * This loop is doing 2 things:
     * * It creates an array of <SingleTalent> entries
     * * It also finds the max values of X and Y for this tab
     */
    ([id, talent]) => {
      maxY = talent.y > maxY ? talent.y : maxY;
      maxX = talent.x > maxX ? talent.x : maxX;
      return (
        <SingleTalent
          key={id}
          data={talent}
          section={section}
          tab={tab}
          id={id}
        />
      );
    }
  );

  return <>{talents}</>;
}

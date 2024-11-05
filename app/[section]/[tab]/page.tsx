import SingleTalent from "@/components/Talent/SingleTalent";
import { sections } from "@/lib/dataParsed";
import { notFound } from "next/navigation";
import { ScriptProps } from "next/script";
import classes from "./page.module.scss";
import { CSSProperties } from "react";

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
      Object.hasOwn(sections, section) ||
      Object.hasOwn(sections[section].tabs, tab)
    )
  )
    return notFound();

  let maxY = 0;
  let maxX = 0;
  const talents = Object.entries(sections[section].tabs[tab].talents).map(
    /**
     * This loop is doing 2 things:
     * * It creates an array of <SingleTalent> entries
     * * It also finds the max values of X and Y for this tab
     */
    ([id, talent]) => {
      maxY = talent.pos.y > maxY ? talent.pos.y : maxY;
      maxX = talent.pos.x > maxX ? talent.pos.x : maxX;
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

  return <div className={classes.main}>{talents}</div>;
}

import SingleTalent from "@/components/Talent/SingleTalent";
import { sections, Talent } from "@/lib/dataParsed";
import { notFound } from "next/navigation";
import { ScriptProps } from "next/script";
import classes from "./page.module.scss";
import { TabContainerAttrs, TabContainerStyle } from "./_types";
import { size } from "@/app/_vars";
import { ReactNode } from "react";

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

  let [minX, minY, maxY, maxX] = [Infinity, Infinity, 0, 0];
  const talentsInDrawOrder: {
    [y: number]: {
      [x: number]: [string, Talent];
    };
  } = {};
  Object.entries(sections[section].tabs[tab].talents).forEach(
    /**
     * This loop finds the min and max values of X and Y for this tab
     * The min is used to calculate the padding.
     */
    ([id, talent]) => {
      minY = talent.pos.y < minY ? talent.pos.y : minY;
      minX = talent.pos.x < minX ? talent.pos.x : minX;
      maxY = talent.pos.y > maxY ? talent.pos.y : maxY;
      maxX = talent.pos.x > maxX ? talent.pos.x : maxX;
      talentsInDrawOrder[talent.pos.y] ??= {};
      talentsInDrawOrder[talent.pos.y][talent.pos.x] = [id, talent];
    }
  );
  const talents: ReactNode[] = [];
  /** Object.values/entries/keys are defined by W3C as iterating in numeric
   *  order for Number keys, so looping in this way gives them in the order they
   *  will display on the screen. Good for both accessability and performance.
   *  */
  Object.values(talentsInDrawOrder).forEach((row) =>
    Object.values(row).forEach(([id, talent]) => {
      talents.push(
        <SingleTalent
          key={id}
          data={talent}
          section={section}
          tab={tab}
          id={id}
        />
      );
    })
  );
  const style: TabContainerStyle = {
    height: `${minY + size + maxY}px`,
    width: `${minX + size + maxX}px`,
    padding: `${minY}px ${minX}px`,
    backgroundImage: `url(${sections[section].tabs[tab].background})`,
  };
  const attrs: TabContainerAttrs = { className: classes.main, style };

  return <div {...attrs}>{talents}</div>;
}

import SingleTalent from "@/components/Talent/SingleTalent";
import { data } from "@/lib/dataParsed";
import { notFound } from "next/navigation";
import { ScriptProps } from "next/script";
import classes from "./page.module.scss";
import { CSSProperties } from "react";
import { TalentImagePath } from "@/lib/_utility";

interface Props extends ScriptProps {
  params: {
    section: string;
    tab: string;
  };
}

interface tabCSSProperties extends CSSProperties {
  "--talent-tab-height": number;
  "--talent-tab-width": number;
  "--background-image": string;
}

export default function Page({ params }: Props) {
  const section = decodeURIComponent(params.section);
  const tab = decodeURIComponent(params.tab);

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

  const background = TalentImagePath({
    tab,
    section,
    filename: "Background.png",
  });

  const style: tabCSSProperties = {
    "--talent-tab-height": maxY + 2, // +1 because they have .5 padding around them,
    //+1 because they are themselves 1 tall/wide
    "--talent-tab-width": maxX + 2,
    "--background-image": `url(${background})`,
  };

  return (
    <div className={classes.main} style={style}>
      {talents}
    </div>
  );
}

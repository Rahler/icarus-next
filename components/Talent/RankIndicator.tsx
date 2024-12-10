/** @format */

import { ranks } from "@/lib/dataParsed";
import Image from "next/image";
import classes from "./RankIndicator.module.scss";
import { TierAttrs } from "./_types";
import { ScriptProps } from "next/script";

interface Props extends ScriptProps {
  rankName: string;
  rankMet: boolean;
}
const RankIndicator = ({ rankName, rankMet }: Props) => {
  let className = classes.main;
  if (!rankMet) className += ` ${classes.inactive}`;
  const tierAttrs: TierAttrs = { className };
  return (
    <div {...tierAttrs}>
      <Image
        alt={ranks[rankName].caption}
        src={ranks[rankName].icon}
        height="21"
        width="21"
      />
    </div>
  );
};
export default RankIndicator;

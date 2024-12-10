/** @format */

import { ranks } from "@/lib/dataParsed";
import Image from "next/image";
import classes from "./TierIndicator.module.scss";
import { TierAttrs } from "./_types";
import { ScriptProps } from "next/script";

interface Props extends ScriptProps {
  rankName: string;
  tierMet: boolean;
}
const TierIndicator = ({ rankName, tierMet }: Props) => {
  let className = classes.main;
  if (!tierMet) className += ` ${classes.inactive}`;
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
export default TierIndicator;

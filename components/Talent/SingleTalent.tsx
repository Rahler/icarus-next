"use client";

import classes from "./SingleTalent.module.scss";
import { ScriptProps } from "next/script";
import Image from "next/image";
import { Talent } from "@/lib/dataParsed";
import { SingleTalentAttrs } from "./_types";
import { useAppDispatch } from "@/lib/hooks";
import TierIndicator from "./TierIndicator";

interface Props extends ScriptProps {
  data: Talent;
  section: string;
  tab: string;
  id: string;
}


const SingleTalent = ({ data, section, tab, id }: Props) => {
  // FIXME: this is debug code
  const [reqsMet, tierMet, invested, rank] = [true, true, 1, 1];

  const dispatch = useAppDispatch();

  const maxRank = data.rewards.length;
  const state =
    reqsMet && tierMet
      ? invested > 0
        ? "active"
        : "ready"
      : invested > 0
      ? "invalid"
      : "inactive";

  const classArray = [classes.main];
  classArray.push(classes[state]);

  const attrs: SingleTalentAttrs = {
    id,
    onClick: (e) => {
      // dispatch(increment({ max: maxRank, section, tab, id }));
      e.preventDefault();
    },
    onContextMenu: (e) => {
      // dispatch(decrement({ section, tab, id }));
      e.preventDefault();
    },
    style: {
      left: `${data.pos.x}px`,
      top: `${data.pos.y}px`,
    },
    className: classArray.join(" "),
  };

  return (
    <div {...attrs}>
      <div className={classes["rank-outer"]}>
        <div className={classes.rank}>{`${rank}/${maxRank}`}</div>
      </div>
      <div className={classes.icon}>
        <Image alt={data.caption} src={data.icon} height="64" width="64" />
      </div>
      <TierIndicator rankName={data.rank} tierMet={tierMet}/>
    </div>
  );
};

export default SingleTalent;

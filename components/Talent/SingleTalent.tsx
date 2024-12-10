"use client";

import classes from "./SingleTalent.module.scss";
import { ScriptProps } from "next/script";
import Image from "next/image";
import { Talent } from "@/lib/dataParsed";
import { SingleTalentAttrs } from "./_types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import RankIndicator from "./RankIndicator";
import { selectRankMet } from "@/lib/store";

interface Props extends ScriptProps {
  data: Talent;
  section: string;
  tab: string;
  id: string;
}


const SingleTalent = ({ data, section, tab, id }: Props) => {
  // FIXME: this is debug code
  const [reqsMet, invested, rank] = [true, 1, 1];

  const dispatch = useAppDispatch();
  const rankMet = useAppSelector((state=>{
    return selectRankMet(state, {tab, section}, data.rank)
  }))

  const maxRank = data.rewards.length;
  const state =
    reqsMet && rankMet
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
      <RankIndicator rankName={data.rank} rankMet={rankMet}/>
    </div>
  );
};

export default SingleTalent;

"use client";

import classes from "./SingleTalent.module.scss";
// import {
//   increment,
//   decrement,
//   selectTalentGenerator,
//   selectReqsMet,
//   selectTierGenerator,
// } from "./talentSlice";
// import { useDispatch, useSelector } from "react-redux";
// import TalentTooltip from "./TalentTooltip/TalentTooltip";
import { ScriptProps } from "next/script";
import Image from "next/image";
import { Talent, ranks } from "@/lib/dataParsed";
import { SingleTalentAttrs, TierAttrs } from "./_types";

/**
 * ```
data = {
  "name": "Bow Agility",
  "desc": "Faster movespeed while holding bows",
  "reqs": [],
  "tier": 0,
  "affect": "bow_move_speed",
  "values": [5, 8, 10]
}```
  */
interface Props extends ScriptProps {
  data: Talent;
  section: string;
  tab: string;
  id: string;
}

const SingleTalent = ({ data, section, tab, id }: Props) => {
  // TODO this is debug code
  const [reqsMet, tierMet, invested, rank] = [true, true, 1, 1];

  // Display the tier indicator, if appropriate.
  // TODO: this should probably get broken out into its own component
  let tierDiv;
  if (ranks[data.rank].order > 0) {
    let className = classes.tier;
    if (!tierMet) className += ` ${classes.inactive}`;
    const tierAttrs: TierAttrs = { className };
    tierDiv = (
      <div {...tierAttrs}>
        <Image
          alt={ranks[data.rank].caption}
          src={ranks[data.rank].icon}
          height="21"
          width="21"
        />
      </div>
    );
  }

  // const dispatch = useDispatch();
  // const rank = useSelector(selectTalentGenerator({ section, tab, id }));
  // const reqsMet = useSelector(
  //   selectReqsMet({
  //     section,
  //     tab,
  //     ids: reqs,
  //   })
  // );
  // const tierMet = useSelector(selectTierGenerator({ section, tab })) >= tier;

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
      {tierDiv}
      <div className={classes.icon}>
        <Image alt={data.caption} src={data.icon} height="64" width="64" />
      </div>
    </div>
  );
};

export default SingleTalent;

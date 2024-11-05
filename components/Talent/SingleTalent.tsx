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
import { CSSProperties, ScriptHTMLAttributes } from "react";
import { ScriptProps } from "next/script";
import Image from "next/image";
import { Talent, ranks } from "@/lib/dataParsed";

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

interface TalentCSSProperties extends CSSProperties {
  "--single-talent-x": number;
  "--single-talent-y": number;
}

const SingleTalent = ({ data, section, tab, id }: Props) => {
  // TODO this is debug code
  const [reqsMet, tierMet, invested, rank] = [true, true, 1, 1];

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

  const attrs: ScriptHTMLAttributes<HTMLDivElement> = { id };
  const classArray = [classes.main];
  classArray.push(classes[state]);
  attrs.onClick = (e) => {
    // dispatch(increment({ max: maxRank, section, tab, id }));
    e.preventDefault();
  };

  attrs.onContextMenu = (e) => {
    // dispatch(decrement({ section, tab, id }));
    e.preventDefault();
  };

  // Display the tier indicator, if appropriate.
  // TODO: this should probably get broken out into its own component
  let tierDiv;
  if (data.rank > 0) {
    const style = { "--bg-image": `url(${ranks[data.rank].icon})` };
    let className = classes.tier;
    if (!tierMet) className += ` ${classes.inactive}`;
    tierDiv = <div className={className} style={style}></div>;
  }

  attrs.style = {
    "--single-talent-x": data.pos.x,
    "--single-talent-y": data.pos.y,
  } as TalentCSSProperties;
  attrs.className = classArray.join(" ");

  return (
    <div {...attrs}>
      <div className={classes["rank-outer"]}>
        <div className={classes.rank}>{`${rank}/${maxRank}`}</div>
      </div>
      {/* {tierDiv} */}
      <div className={classes.icon}>
        <Image alt={data.caption} src={data.icon} height="55" width="55" />
      </div>
    </div>
  );
};

export default SingleTalent;

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
import { Talent } from "@/lib/_data";
import Image from "next/image";

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

const SingleTalent = ({
  data: { reqs, tier, values, x, y, name, affect, img_name },
  section,
  tab,
  id,
}: Props) => {
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
  const [reqsMet, tierMet, rank] = [true, true, 1];
  const maxRank = values.length;
  const state =
    reqsMet && tierMet
      ? rank > 0
        ? "active"
        : "ready"
      : rank > 0
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
  // Lookup the icon for the talent, if it exists.

  // Display the tier indicator, if appropriate.
  // TODO: this should probably get broken out into its own component
  // let tierDiv;
  // if (tier > 0) {
  //   const tierIcon = ImagePath(`tier_${tier}.png`);
  //   let className = classes.tier;
  //   if (!tierMet) className += ` ${classes.inactive}`;
  //   tierDiv = (
  //     <div
  //       className={className}
  //       style={{ "--bg-image": `url(${tierIcon})` }}
  //     ></div>
  //   );
  // }

  attrs.style = {
    "--single-talent-x": x + 0.5,
    "--single-talent-y": y + 0.5,
  } as TalentCSSProperties;
  attrs.className = classArray.join(" ");

  return (
    <div {...attrs}>
      <div className={classes["rank-outer"]}>
        <div className={classes.rank}>{`${rank}/${maxRank}`}</div>
      </div>
      {/* {tierDiv} */}
      <div className={classes.icon}>
        <Image alt={name} src={`/Images/${img_name}`} height="55" width="55" />
      </div>
    </div>
  );
};

export default SingleTalent;

"use client";

import classes from "./SingleTalent.module.scss";
import { ScriptProps } from "next/script";
import Image from "next/image";
import { Talent } from "@/lib/dataParsed";
import { SingleTalentAttrs } from "./_types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import RankIndicator from "./RankIndicator";
import { selectRankMet, selectTalent } from "@/lib/store";
import { set } from "@/lib/slices/talents";
import SingleReq from "../Requirements/SingleReq";
import { ReactElement } from "react";

interface Props extends ScriptProps {
  data: Talent;
  section: string;
  tab: string;
  id: string;
}


const SingleTalent = ({ data, section, tab, id }: Props) => {

  const dispatch = useAppDispatch();
  const rankMet = useAppSelector((state=>{
    return selectRankMet(state, {tab, section}, data.rank)
  }))
  const invested = useAppSelector(state=>selectTalent(state, {section, tab, id}));

  let reqsMet = true;
  if (data.reqs){
    const reqs = data.reqs.map(
      ({sourceId})=> useAppSelector(
        state=> selectTalent(state, {section, tab, id: sourceId})
      )
    )
    reqsMet = reqs.every(val=>val>0);
  }

  

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
      dispatch(set({section, tab, id, newValue:invested+1 }));
      e.preventDefault();
    },
    onContextMenu: (e) => {
      dispatch(set({section, tab, id, newValue:invested-1 }));
      e.preventDefault();
    },
    style:{
      "--pos-x": data.pos.x,
      "--pos-y": data.pos.y,
      },
    className: classArray.join(" "),
  };

  const reqElements: ReactElement<typeof SingleReq>[] = [];
  data.reqs?.forEach(({sourceId, sourceCoord}) => {
    reqElements.push(<SingleReq data={{
      start: {id:sourceId, pos: sourceCoord},
      end: {id, pos: data.pos}}
    }/>)
  });

  return (
    <div key={id} {...attrs}>
      {reqElements}
      <div className={classes["rank-outer"]}>
        <div className={classes.rank}>{`${invested}/${maxRank}`}</div>
      </div>
      <div className={classes.icon}>
        <Image alt={data.caption} src={data.icon} height="64" width="64" />
      </div>
      <RankIndicator rankName={data.rank} rankMet={rankMet}/>
    </div>
  );
};

export default SingleTalent;

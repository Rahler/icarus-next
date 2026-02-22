import { Vector } from "@/lib/dataParsed";
import { ScriptProps } from "next/script";
import classes from "./SingleReq.module.scss";
import Svg from "../Svg";


type svgVector = `${number} ${number}`;
const stringify = (v: Vector):svgVector => {return `${v.x} ${v.y}`};
const add = (a:Vector, b:Vector):Vector => {return {x:a.x+b.x, y:a.y+b.y}};

interface reqPoint {
  id: string;
  pos: Vector;
}

type reqLineData = {
  start: reqPoint;
  end: reqPoint;
}

interface SingleReqProps extends ScriptProps {
  data: reqLineData;
}

const SingleReq = ({data: {start, end}}:SingleReqProps)=>{
  
  // Need to calc the path
  const d = `M${start.pos.x},${start.pos.y+64 /* vertical offset for debug visuals. */}L${end.pos.x},${end.pos.y-64}`

  return <Svg
  // Need to add css to make it not adjust the bounding box of its parent
  ><path className={classes.main} d={d}/></Svg>
};

export default SingleReq;
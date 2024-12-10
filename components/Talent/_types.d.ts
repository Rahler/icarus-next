import { ScriptHTMLAttributes } from "react";
import type { Properties, Property } from "csstype";

export type SingleTalentCSSProperties = Properties & {};

export type SingleTalentAttrs = ScriptHTMLAttributes<HTMLDivElement> & {
  style: SingleTalentCSSProperties;
};

export interface TierAttrs extends ScriptHTMLAttributes<HTMLDivElement> {}

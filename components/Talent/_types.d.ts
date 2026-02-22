import type { ScriptHTMLAttributes } from "react";
import type { Properties, TLength } from "csstype";

export type SingleTalentCSSProperties = Properties & {
  "--pos-x": TLength,
  "--pos-y": TLength,
};

export type SingleTalentAttrs = ScriptHTMLAttributes<HTMLDivElement> & {
  style: SingleTalentCSSProperties;
};

export interface TierAttrs extends ScriptHTMLAttributes<HTMLDivElement> {}

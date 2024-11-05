import { ScriptHTMLAttributes } from "react";
import type { Properties } from "csstype";

export type WithImageCSSProperties = Properties & {
  "--bg-image": string;
};

export type SingleTalentCSSProperties = WithImageCSSProperties & {
  "--single-talent-x": number;
  "--single-talent-y": number;
};

export type SingleTalentAttrs = ScriptHTMLAttributes<HTMLDivElement> & {
  style: SingleTalentCSSProperties;
};

export interface TierAttrs extends ScriptHTMLAttributes<HTMLDivElement> {
  style: WithImageCSSProperties;
}

import { ScriptHTMLAttributes } from "react";
import type { Properties, Property } from "csstype";

export type TabContainerStyle = Properties & {};

export type TabContainerAttrs = ScriptHTMLAttributes<HTMLDivElement> & {
  style?: TabContainerStyle;
};

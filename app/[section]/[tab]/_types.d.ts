import type { ScriptHTMLAttributes } from "react";
import type { Properties, TLength } from "csstype";

export type TabContainerStyle = Properties & {
  "--height": TLength;
  "--width": TLength;
  "--size": TLength;
};

export type TabContainerAttrs = ScriptHTMLAttributes<HTMLDivElement> & {
  style: TabContainerStyle;
};

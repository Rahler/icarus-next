import type * as CSS from "csstype";

declare module "csstype" {
  interface Properties {
    // Add my CSS Custom Properties
    "--bg-image"?: $string;
  }
}

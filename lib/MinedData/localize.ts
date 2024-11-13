import localizationData from "./Icarus/Content/Localization/Game/en/Game.json";

export type table = string;
export type row = string;
export type fallback = string;
export type callString = `NSLOCTEXT("${table}", "${row}", "${fallback}")`;

const callRegex =
  /NSLOCTEXT\("(?<table>[^"]+)", "(?<row>[^"]+)", "(?<fallback>[^"]+)"\)/;

type localizationCall = {
  table: string;
  row: string;
  fallback: string;
};
export default function localizationCall(callString: callString): string {
  let parts = callRegex.exec(callString)?.groups as localizationCall;

  if (!parts)
    throw new TypeError(
      `Invalid input sent to localizationCall: ${callString}`
    );

  return localizationData?.[parts.table]?.[parts.row] ?? parts.fallback;
}

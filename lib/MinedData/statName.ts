export type minedGrantedStatName = `(Value="${string}")`;
export type statName = string;

const minedStatRegex = /\(Value="([^"]+)"\)/;

export function convertGrantedStatName(
  minedString: minedGrantedStatName
): statName {
  const match = minedStatRegex.exec(minedString);
  if (!match)
    throw new TypeError(
      `Invalid value passed to ConvertGrantedStatName: ${minedString}`
    );
  return match[1];
}

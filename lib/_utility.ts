/**
 *  Check for file existence
 *
 * from https://stackoverflow.com/a/48264153
 */
export const tryRequire = (path: string) => {
  try {
    return require(`${path}`);
  } catch (err) {
    return null;
  }
};

const _notFound = require("@/Images/notfound.png");

export const tryImage = (uri: string) => {
  const image = tryRequire(uri) ?? _notFound;
  return image;
};

/** The highest valid value for talent.tier */
export const maxTier = 3;
/** The number of talent ranks that have to be applied to a tab to increase
 * its tier */
export const ranksPerTier = 4;
/** How much padding (in x/y values) to add around the edges of the talents */
export const coordPadding = 0.5;

const _imageFolder = "@/Images";
/**
 * Calculates and returns the tier from a total rank.
 * @param {Number} ranks The total number of ranks for the tab
 * @returns {Number} The achieved tier (0 indexed)
 */
export const calcTier = (ranks: number) =>
  Math.min(maxTier, Math.trunc(ranks / ranksPerTier));
/**
 * Calculates and returns the percentage progress to the next tier
 * If rank is at max, returns 100.
 *
 * @param {Number} ranks The total number of ranks for the tab
 * @returns {Number} The progress towards the next rank
 */
export const calcTierProgress = (ranks: number) => {
  const mod = ranks % ranksPerTier;
  const progress =
    ranks / ranksPerTier >= maxTier ? 1 : mod > 0 ? mod / ranksPerTier : 0;
  return progress * 100;
};

export const TalentImagePath = ({
  section,
  tab,
  filename,
}: {
  section: string;
  tab: string;
  filename: string;
}) => {
  // Lookup the background for the section, if it exists.
  const encodedSection = encodeURIComponent(section);
  const encodedTab = encodeURIComponent(tab);
  return ImagePath(`${encodedSection}/${encodedTab}/${filename}`);
};

export const ImagePath = (filename: string) => {
  return tryImage(`${_imageFolder}/${filename}`);
};

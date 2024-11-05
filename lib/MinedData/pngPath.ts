export type minedPngPath = `/Game/Assets/2DArt/UI/${string}`;
export type localPngPath = `/Images/${string}.png`;

const minedPngRegex = /\/Game\/Assets\/2DArt\/UI\/([^.]+)/;
const localImagesPath = "/Images/";
const fallback = "notfound";

export function convertToLocalImagePath(
  minedString: minedPngPath
): localPngPath {
  const match = minedPngRegex.exec(minedString);
  const location = match?.[0] ?? fallback;
  return `${localImagesPath}${location}.png`;
}

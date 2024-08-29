/**
 *  Check for file existence
 *
 * from https://stackoverflow.com/a/48264153
 */
export const tryRequire = (path: string) => {
  try {
    return require(path);
  } catch (err) {
    return null;
  }
};

const _notFound = require("./Images/notfound.png");
export const tryImage = (uri: string) => {
  const image = tryRequire(uri) ?? _notFound;
  return image;
};

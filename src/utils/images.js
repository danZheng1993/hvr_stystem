export const extractImageFromContent = (content) => {
  const matches = content.match(/src=(.+?[\.jpg|\.gif|\.png]")/);
  if (matches) {
    return matches[1].split(`"`)[1];
  }
  return null;
}
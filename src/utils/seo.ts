export const wrapUrl = (url: string) => {
  if (!url.endsWith('/')) {
    return `${url}/`;
  }
  return url;
};

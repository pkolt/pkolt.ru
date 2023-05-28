export const copyTextToClipboard = async (text: string): Promise<boolean> => {
  let result = false;
  if (navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      result = true;
    } catch (err) {
      // empty
    }
  }
  return result;
};

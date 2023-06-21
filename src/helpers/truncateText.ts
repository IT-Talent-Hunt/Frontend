export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }

  const truncatedText = text.slice(0, maxLength).trim();
  const lastSpaceIndex = truncatedText.lastIndexOf(' ');
  const finalText = `${truncatedText.slice(0, lastSpaceIndex)}...`;

  return finalText;
};
